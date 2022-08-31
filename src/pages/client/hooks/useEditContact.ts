import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TContacts, TContactsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editContact = async (data: TContacts): Promise<TContactsFindById> => {
  return await apiClient.patch(`/contacts/${data.id}`, data)
}

const useEditContact = () => {
  const queryClient = useQueryClient()

  return useMutation(editContact, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.contactList)
      console.log('Client Edited')
    },
  })
}

export default useEditContact
