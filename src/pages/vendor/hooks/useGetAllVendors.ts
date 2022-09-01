import { vendorQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TVendorFindAll } from '@/types'
import { useQuery } from 'react-query'

const findAllVendors = async () => {
  const response = await apiClient.get<TVendorFindAll>('/vendors')
  return response.data
}

const useGetAllVendors = () => {
  return useQuery<TVendorFindAll, Error>(
    vendorQueryKeys.allVendors,
    findAllVendors,
    {
      onSuccess: () => console.log('GetAllVendors On Success Called'),
    }
  )
}

export default useGetAllVendors
