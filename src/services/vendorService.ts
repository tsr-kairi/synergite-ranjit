import {
  IFindContactsByVendorId,
  TContactCreate,
  TContactCreateResponse,
} from '@/types'
import apiClient from './base'

const findContactsByVendorId = async (
  id: number
): Promise<IFindContactsByVendorId> => {
  const { data } = await apiClient.get<IFindContactsByVendorId>(
    `/contacts?filter[vendors][_eq]=${id}`
  )
  return data
}

const createContact = async (
  vendor: TContactCreate
): Promise<TContactCreateResponse> => {
  const { data } = await apiClient.post<TContactCreateResponse>(
    '/contacts',
    vendor
  )
  return data
}

const VendorService = {
  findContactsByVendorId,
  createContact,
}

export default VendorService
