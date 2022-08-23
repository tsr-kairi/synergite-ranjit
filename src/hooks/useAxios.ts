import { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/clientTableData'
//If you are using different URLs, consider removing this line and adding a baseURL in the Axios Config parameter.

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>()
  const [error, setError] = useState<AxiosError>()
  const [loading, setLoading] = useState(
    axiosParams.method === 'GET' || axiosParams.method === 'get'    
  )

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params)
      setResponse(result)
    } catch (err) {
      setError('err')
    } finally {
      setLoading(false)
    }
  }

  const sendData = async () => {
    await fetchData(axiosParams)
  }

  //   useEffect(() => {
  //     if (axiosParams.method === 'GET' || axiosParams.method === 'get') {
  //       await fetchData(axiosParams)
  //     }
  //   }, [])

  useEffect(() => {
    async function fetchData() {
      if (axiosParams.method === 'GET' || axiosParams.method === 'get') {
        await fetchData()
      }
    }
    void fetchData()
  }, [axiosParams])

  return { response, error, loading, sendData }
}

export default useAxios
