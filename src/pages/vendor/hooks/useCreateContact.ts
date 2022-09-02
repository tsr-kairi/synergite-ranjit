import { vendorQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TContactCreate, TContactsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createContact = (data: TContactCreate): Promise<TContactsFindById> => {
  return apiClient.post('/contacts', data)
  // return apiClient.post('/contacts').then((response) => response.data.data)
}

const useCreateContact = () => {
  const queryClient = useQueryClient()

  return useMutation(createContact, {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.contactList)
      console.log('Create Contact Called')
    },
  })
}

export default useCreateContact
