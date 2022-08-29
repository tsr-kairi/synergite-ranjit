import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TClientCreate, TClientFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createClient = async (
  client: TClientCreate
): Promise<TClientFindById> => {
  return await apiClient.post('/clients', client)
}

const useCreateClient = () => {
  const queryClient = useQueryClient()

  return useMutation(createClient, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.allClients)
      console.log('Create Client Called')
    },
  })
}

export default useCreateClient
