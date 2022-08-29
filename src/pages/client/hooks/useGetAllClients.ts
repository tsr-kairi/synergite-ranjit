import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TClientFindAll } from '@/types'
import { useQuery } from 'react-query'

const findAllClients = async () => {
  const response = await apiClient.get<TClientFindAll>('/clients')
  return response.data
}

const useGetAllClients = () => {
  return useQuery<TClientFindAll, Error>(
    clientQueryKeys.allClients,
    findAllClients,
    {
      onSuccess: () => console.log('GetAllClients On Success Called'),
    }
  )
}

export default useGetAllClients
