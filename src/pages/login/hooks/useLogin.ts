import axiosPublic from '@/services/axiosPublic'
import { useNavigate } from 'react-router-dom'

type IToken = {
  token: string
  refresh_token: string
}
type ILoginResponse = {
  ok: boolean
  message: string
  data: IToken
}

type ILoginRequest = {
  userId: string
  password: string
}

const useLogin = (): {
  login: (loginReqData: ILoginRequest) => Promise<void>
} => {
  const navigate = useNavigate()
  const login = async (loginReqData: ILoginRequest) => {
    try {
      const response = await axiosPublic.post<ILoginResponse>(
        '/user/login',
        loginReqData
      )
      console.log(response.data.data.token)

      localStorage.setItem('access_token', response.data?.data?.token)
      localStorage.setItem('refresh_token', response.data?.data?.refresh_token)
      navigate('/')
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/login')
    }
  }
  return { login }
}

export { ILoginRequest }
export default useLogin
