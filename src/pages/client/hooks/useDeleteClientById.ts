import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TClientFindById } from '@/types'
import { useQuery } from 'react-query'

const deleteClientById = async (id: number) => {
  const response = await apiClient.delete<TClientFindById>(`/clients/${id}`)
  return response.data
}

const useDeleteClientById = (id: number) => {
  return useQuery<TClientFindById, Error>(
    [clientQueryKeys.clientDetails, id],
    deleteClientById(id),
    {
      onSuccess: () => console.log('GetAllClientById On Success Called'),
    }
  )
}

export default useDeleteClientById
