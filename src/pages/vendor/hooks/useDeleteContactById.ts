import { vendorQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteContactById = async (id: number): Promise<void> => {
  await apiClient.delete(`/contacts/${id}`)
}

const useDeleteContactById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => deleteContactById(id), {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.contactList)
      console.log('Delete Client Called')
    },
  })
}

export default useDeleteContactById
