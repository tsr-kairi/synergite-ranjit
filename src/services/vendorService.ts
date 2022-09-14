import {
  IFindContactsByVendorId,
  TContactCreate,
  TContactCreateResponse,
} from '@/types'
import axiosPrivate from './axiosPrivate'
import apiClient from './base'

const findContactsByVendorId = async (
  id: number
): Promise<IFindContactsByVendorId> => {
  const { data } = await axiosPrivate.get<IFindContactsByVendorId>(
    `/contact/vendor/${id}`
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
