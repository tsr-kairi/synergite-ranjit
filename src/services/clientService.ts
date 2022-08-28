import { TClientFindAll, TClientFindById, TContacts, TJobs } from '@/types'
import apiClient from './base'

// for client
const findAll = async () => {
  const response = await apiClient.get<TClientFindAll>('/clients')
  return response.data
}

const findById = async (id: number) => {
  const response = await apiClient.get<TClientFindById>(`/clients/${id}`)
  return response.data
}

const findContactsByClientId = async (id: number): Promise<TContacts[]> => {
  const response = await apiClient.get<TContacts[]>(
    `/contacts?filter[clients][_eq]=${id}`
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data.data
}

const findJobsByClientId = async (id: number): Promise<TJobs[]> => {
  const response = await apiClient.get<TJobs[]>(
    `/jobs?filter[clients][_eq]=${id}`
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data.data
}

// const findByTitle = async (title: string) => {
//   const response = await apiClient.get<TClientList[]>(`/clients?title=${title}`)
//   return response.data
// }

// const create = async (data: TClientList) => {
//   const response = await apiClient.post<unknown>('/clients', data)
//   return response.data
// }

// const update = async (
//   id: any,
//   { title, description, published }: IRowClientData
// ) => {
//   const response = await apiClient.put<any>(`/tutorials/${id}`, {
//     title,
//     description,
//     published,
//   })
//   return response.data
// }

// const deleteById = async (id: number) => {
//   const response = await apiClient.delete<any>(`/clients/${id}`)
//   return response.data
// }

// const deleteAll = async () => {
//   const response = await apiClient.delete<any>('/clients')
//   return response.data
// }

const ClientService = {
  findAll,
  findById,
  findContactsByClientId,
  findJobsByClientId,
  // deleteById,
  // deleteAll,
  // getAllClients,
}

export default ClientService
