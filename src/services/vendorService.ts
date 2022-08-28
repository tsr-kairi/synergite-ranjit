import { TVendorFindAll } from '@/types'
import apiClient from './base'

// for vendor
const findAllVendor = async () => {
  const response = await apiClient.get<TVendorFindAll>('/vendors')
  return response.data
}

const VendorService = {
  findAllVendor,
}
export default VendorService
