import { vendorQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TVendor, TVendorFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editVendor = async (data: TVendor): Promise<TVendorFindById> => {
  return await apiClient.patch(`/vendors/${data.id}`, data)
}

const useEditVendor = () => {
  const queryClient = useQueryClient()

  return useMutation(editVendor, {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.allVendors)
      console.log('Vendor Edited')
    },
  })
}

export default useEditVendor
