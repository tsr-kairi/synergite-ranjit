import axios from 'axios'

const axiosLocation = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1',
  headers: {
    accept: 'application/json',
    'X-CSCAPI-KEY': 'OWZTRzExeURxZFk0MEhRd3FLdmw2OFM1T0ZSOG5ZcjNTQUZqcnNIYg==',
  },
})

export default axiosLocation
