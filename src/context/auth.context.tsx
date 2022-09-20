import axiosPrivate from '@/services/axiosPrivate'
import axiosPublic from '@/services/axiosPublic'
import { createContext, useEffect, useState } from 'react'

interface AuthContextProps {
  isAuth: boolean
  user: IUser
  login: (loginReqData: ILoginRequest) => Promise<any>
}

export interface IUser {
  first_name: string
  last_name: string
  email_id: string
}

const iUser: IUser = {
  first_name: '',
  last_name: '',
  email_id: '',
}

const initialValue = {
  isAuth: false,
  user: iUser,
  login: async () => Promise.resolve(iUser),
}

export const AuthContext = createContext<AuthContextProps>(initialValue)

interface AuthContextProviderProps {
  children?: React.ReactNode
}

type IToken = {
  access_token: string
  refresh_token: string
}

type ILoginResponse = {
  ok: boolean
  message: string
  data: IToken
}

type ILoginRequest = {
  email: string
  password: string
}

type GetUsersResponse = {
  data: IUser[]
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>(iUser)

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')

    if (access_token) {
      getUserData()
        .then((userData) => {
          setIsAuth(true)
          setUser({
            first_name: userData?.first_name || '',
            last_name: userData?.last_name || '',
            email_id: userData?.email_id || '',
          })
        })
        .catch((error) => {
          console.log(error)
          setIsAuth(false)
          setUser(iUser)
        })
    }

    // console.log('Setting time out')
    // setTimeout(() => {
    //   const expire_at = localStorage.getItem('expire_at') || ''
    //   const expireAtDate = new Date(expire_at)
    //   const currentDate = new Date()

    //   if (expireAtDate >= currentDate) {
    //     console.log('Call refresh token')
    //   } else {
    //     console.log('expire_at =', expire_at)
    //   }
    // }, 1000)
  }, [])

  useEffect(() => {
    console.log(isAuth)
    if (isAuth) {
      console.log('Setting time out')
      setTimeout(() => {
        const expire_at = localStorage.getItem('expire_at') || ''
        const expireAtDate = new Date(expire_at)
        const currentDate = new Date()

        if (expireAtDate >= currentDate) {
          console.log('Call refresh token')
        } else {
          console.log('expire_at =', expire_at)
        }
      }, 50000)
    }
  }, [isAuth])

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

  const login = async (loginReqData: ILoginRequest) => {
    console.log('Logging is called')
    try {
      const response = await axiosPublic.post<ILoginResponse>(
        '/user/login',
        loginReqData
      )

      const date = new Date()
      date.setMinutes(date.getMinutes() + 1)

      localStorage.setItem('expire_at', date.toString())
      localStorage.setItem('access_token', response.data?.data?.access_token)
      localStorage.setItem('refresh_token', response.data?.data?.refresh_token)
      setIsAuth(true)

      const userData = await getUserData()
      setUser({
        first_name: userData?.first_name || '',
        last_name: userData?.last_name || '',
        email_id: userData?.email_id || '',
      })

      console.log('Auth is set')

      return response.data?.data
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setIsAuth(false)
      throw error
    }
  } // End of login function

  console.log('user =', user)

  return (
    <AuthContext.Provider value={{ isAuth, user, login }}>
      {children}
    </AuthContext.Provider>
  )
} // End of AuthContextProvider
