import axios from 'axios'

const access_token = localStorage.getItem('access_token')
const axiosPrivate = axios.create({
  baseURL:
    'http://ec2-18-222-212-17.us-east-2.compute.amazonaws.com:8080/synergy-rest-service',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token ? access_token : ''}`,
    userId: 1,
  },
})

export default axiosPrivate
