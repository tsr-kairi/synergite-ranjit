import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { TVContacts, TContactsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editContact = async (data: TVContacts): Promise<TContactsFindById> => {
  return await axiosPrivate.post(`/contact/save`, data)
}

const useEditContact = () => {
  const queryClient = useQueryClient()

  return useMutation(editContact, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.contactList)
      console.log('Contact Edited')
    },
  })
}

export default useEditContact
