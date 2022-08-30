import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteClientById = async (id: number): Promise<void> => {
  await apiClient.delete(`/clients/${id}`)
}

const useDeleteClientById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => deleteClientById(id), {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.allClients)
      console.log('Delete Client Called')
    },
  })
}

export default useDeleteClientById
