import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TClientFindById } from '@/types'
import { useQuery } from 'react-query'

const findClientById = async (id: number) => {
  const response = await apiClient.get<TClientFindById>(`/clients/${id}`)
  return response.data
}

const useGetClientById = (id: number) => {
  return useQuery<TClientFindById, Error>(
    [clientQueryKeys.clientDetails, id],
    async () => await findClientById(id),
    {
      onSuccess: () => console.log('GetAllClientById On Success Called'),
    }
  )
}

export default useGetClientById
