import { vendorQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteContactById = async (uuid: string): Promise<void> => {
  await axiosPrivate.post(`/contact/delete/${uuid}`)
}

const useDeleteContactById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteContactById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.contactList)
      console.log('Delete Client Called')
    },
  })
}

export default useDeleteContactById
