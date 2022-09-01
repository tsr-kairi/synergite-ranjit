import { vendorQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteVendorById = async (id: number): Promise<void> => {
  await apiClient.delete(`/vendors/${id}`)
}

const useDeleteVendorById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => deleteVendorById(id), {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.allVendors)
      console.log('Delete Vendor Called')
    },
  })
}

export default useDeleteVendorById
