import { vendorQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { TContactCreate, TContactsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createContact = (data: TContactCreate): Promise<TContactsFindById> => {
  // return apiClient.post('/contacts', data)
  // return apiClient.post('/contacts').then((response) => response.data.data)
  return axiosPrivate.post('/contact/save', data)
}

const useCreateContact = () => {
  const queryClient = useQueryClient()

  return useMutation(createContact, {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.contactList)
    },
  })
}

export default useCreateContact
