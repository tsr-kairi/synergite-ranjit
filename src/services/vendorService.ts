import { IVendorFindAll } from '@/types'
import apiClient from './base'

// for vendor
const findAllVendor = async () => {
  const response = await apiClient.get<IVendorFindAll>('/vendors')
  return response.data
}

const VendorService = {
  findAllVendor,
}
export default VendorService
