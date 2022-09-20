// import axiosPublic from '@/services/axiosPublic'
import axiosPrivate from '@/services/axiosPrivate'
import { useEffect, useState } from 'react'

type IUser = {
  first_name: string
  last_name: string
  email_id: string
}
type ILoginResponse = {
  ok: boolean
  message: string
  data: IUser
}

const useCurrentUser = () => {
  const access_token = localStorage.getItem('access_token')

  const [isAuth, setIsAuth] = useState(access_token ? true : false)

  useEffect(() => {
    if (isAuth) {
      axiosPrivate
        .get<ILoginResponse>('/user/getcurrentuser')
        .then((response) => {
          setIsAuth(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  console.log('return isAuth =', isAuth)

  return isAuth
}

export default useCurrentUser
