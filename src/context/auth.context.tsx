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
        })
    }
  }, [])

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
    try {
      const response = await axiosPublic.post<ILoginResponse>(
        '/user/login',
        loginReqData
      )

      localStorage.setItem('access_token', response.data?.data?.access_token)
      localStorage.setItem('refresh_token', response.data?.data?.refresh_token)
      setIsAuth(true)

      const userData = await getUserData()
      setUser({
        first_name: userData?.first_name || '',
        last_name: userData?.last_name || '',
        email_id: userData?.email_id || '',
      })

      return response.data?.data
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
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
