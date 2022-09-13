// import axiosPublic from '@/services/axiosPublic'
import axios from 'axios'

// type IUser = {
//   first_name: string
//   last_name: string
//   email_id: string
// }
// type ILoginResponse = {
//   ok: boolean
//   message: string
//   data: IUser
// }

const useCurrentUser = () => {
  // if (!access_token) {
  //   return false
  // }

  // try {
  //   const response = await axiosPublic.get<ILoginResponse>(
  //     '/user/getcurrentuser'
  //   )
  //   console.log(response)
  //   return response.data.data
  // } catch (error) {
  //   console.log(error)
  //   return null
  // }
  const access_token = localStorage.getItem('access_token')
  // console.log({ access_token })

  // const config = {
  //   method: 'get',
  //   url: 'http://ec2-18-222-212-17.us-east-2.compute.amazonaws.com:8080/synergy-rest-service/user/getcurrentuser',
  //   headers: {
  //     Authorization: `Bearer ${access_token ? access_token : ''}`,
  //     'Content-Type': 'application/json',
  //   },
  // }
  axios({
    method: 'get',
    url: 'http://ec2-18-222-212-17.us-east-2.compute.amazonaws.com:8080/synergy-rest-service/user/getcurrentuser',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token ? access_token : ''}`,
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      console.log('userGet', JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}

export default useCurrentUser
