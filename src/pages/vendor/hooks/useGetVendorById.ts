import { vendorQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TVendorFindById } from '@/types'
import { useQuery } from 'react-query'

const findVendorById = async (id: number) => {
  const response = await apiClient.get<TVendorFindById>(`/vendors/${id}`)
  return response.data
}

const useGetVendorById = (id: number) => {
  return useQuery<TVendorFindById, Error>(
    [vendorQueryKeys.vendorDetails, id],
    async () => await findVendorById(id),
    {
      onSuccess: () => console.log('GetAllVendorById On Success Called'),
    }
  )
}

export default useGetVendorById
