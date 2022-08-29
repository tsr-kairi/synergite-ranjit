import {
  IFindContactsByClientId,
  IFindJobsByClientId,
  TClientCreate,
  TClientCreateResponse,
  TClientFindAll,
} from '@/types'
import apiClient from './base'

// for client

const findById = async (id: number) => {
  const response = await apiClient.get<TClientFindAll>(`/clients/${id}`)
  return response.data
}

const findContactsByClientId = async (
  id: number
): Promise<IFindContactsByClientId> => {
  const { data } = await apiClient.get<IFindContactsByClientId>(
    `/contacts?filter[clients][_eq]=${id}`
  )
  return data
}

const findJobsByClientId = async (id: number): Promise<IFindJobsByClientId> => {
  const { data } = await apiClient.get<IFindJobsByClientId>(
    `/jobs?filter[clients][_eq]=${id}`
  )
  return data
}

// add new form services
const createClient = async (
  client: TClientCreate
): Promise<TClientCreateResponse> => {
  const { data } = await apiClient.post<TClientCreateResponse>(
    '/clients',
    client
  )
  return data
}

const ClientService = {
  findById,
  findContactsByClientId,
  findJobsByClientId,
  createClient,
}

export default ClientService
