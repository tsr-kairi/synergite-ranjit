import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TClient, TClientFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editClient = async (data: TClient): Promise<TClientFindById> => {
  return await apiClient.patch(`/clients/${data.id}`, data)
}

const useEditClient = () => {
  const queryClient = useQueryClient()

  return useMutation(editClient, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.allClients)
      console.log('Client Edited')
    },
  })
}

export default useEditClient
