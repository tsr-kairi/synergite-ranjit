import axiosPrivate from '@/services/axiosPrivate'
import axiosPublic from '@/services/axiosPublic'
import { setAuthDataInLocalStorage } from '@/utils/auth.utils'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boolean } from 'zod'

// Third party packages
import create from 'zustand'

type ILoginResponse = {
  ok: boolean
  message: string
  data: {
    access_token: string
    refresh_token: string
    permissions: string[]
  }
}

type ILoginRequest = {
  email: string
  password: string
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email?: string
  access: {
    token: string
    expireIn: string
  }
  refresh: {
    token: string
    expireIn: string
  }
}

interface IPermissionOptions {
  read: boolean
  write: boolean
  update: boolean
  delete: boolean
}

interface IAuth {
  isAuth: boolean
  user: IUser
  permissions: string[]
  login: (loginReqData: ILoginRequest) => Promise<void>
  logout: () => void
  autoLogin: () => Promise<void>
  // getPermission: (pageName: string, permissions: string[]) => IPermissionOptions
}

const initialUserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  access: {
    token: '',
    expireIn: '',
  },
  refresh: {
    token: '',
    expireIn: '',
  },
}

export const useAuth = create<IAuth>((set) => ({
  isAuth: false,
  user: initialUserState,
  permissions: ['timesheets:read'],
  login: async (loginReqData: ILoginRequest) => {
    try {
      const response = await axiosPublic.post<ILoginResponse>(
        '/user/login',
        loginReqData
      )

      const responseData = response.data?.data

      const accessToken = responseData?.access_token || ''
      const refreshToken = responseData?.refresh_token || ''
      setAuthDataInLocalStorage(accessToken, refreshToken)
      const permissions = responseData?.permissions || []

      // TODO: We have to use indexDB
      localStorage.setItem('permissions', JSON.stringify(permissions))

      const rawUserData = await getUserData()
      const userData = {
        isAuth: true,
        user: {
          id: rawUserData?.id || '',
          firstName: rawUserData?.first_name || '',
          lastName: rawUserData?.last_name || '',
          email: rawUserData?.email || '',
          access: {
            token: accessToken,
            expireIn: '',
          },
          refresh: {
            token: refreshToken,
            expireIn: '',
          },
        },
        permissions,
      }

      set(userData)
      //   return userData
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      throw error
    }
  }, // End of loginHandler function,
  autoLogin: async () => {
    try {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')
      const permissions = (JSON.parse(
        localStorage.getItem('permissions') || '[]'
      ) || []) as string[]

      const rawUserData = await getUserData()
      const userData = {
        isAuth: true,
        user: {
          id: rawUserData?.id || '',
          firstName: rawUserData?.first_name || '',
          lastName: rawUserData?.last_name || '',
          email: rawUserData?.email || '',
          access: {
            token: accessToken || '',
            expireIn: '',
          },
          refresh: {
            token: refreshToken || '',
            expireIn: '',
          },
        },
        permissions,
      }
      set(userData)
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      throw error
    }
  },
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expire_at')

    set({
      isAuth: false,
      user: initialUserState,
    })

    return null
  }, // End of logout function

  // getPermission: (pageName: string, permissions: string[]) => {
  //   const permissionOptions: IPermissionOptions = {
  //     read: false,
  //     write: false,
  //     update: false,
  //     delete: false,
  //   }

  //   for (const permission of permissions) {
  //     const [page, pagePermissionOption] = permission
  //       .toLocaleLowerCase()
  //       .split(':')

  //     if (page === pageName.toLocaleLowerCase()) {
  //       switch (pagePermissionOption) {
  //         case 'read':
  //           permissionOptions.read = true
  //           break
  //         case 'write':
  //           permissionOptions.write = true
  //           break
  //         case 'update':
  //           permissionOptions.update = true
  //           break
  //         case 'delete':
  //           permissionOptions.delete = true
  //           break
  //       }
  //     }
  //   } // End of for loop

  //   return permissionOptions
  // }, // End of getPermission
}))

type GetUsersResponse = {
  data: {
    id: string
    first_name?: string
    last_name?: string
    email?: string
  }[]
}
const getUserData = async () => {
  try {
    const response = await axiosPrivate.get<GetUsersResponse>(
      '/user/getcurrentuser'
    )
    return response.data.data[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
