import { IRowClientData } from '@/types'
import apiClient from './base'

const findAll = async () => {
  return await apiClient.get<IRowClientData[]>('/clients')
}

const findById = async (id: number) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const response = await apiClient.get<IRowClientData>(`/clients/${id}`)
  return response.data
}

const findByTitle = async (title: string) => {
  const response = await apiClient.get<IRowClientData[]>(
    `/clients?title=${title}`
  )
  return response.data
}

const create = async (data: IRowClientData) => {
  const response = await apiClient.post<unknown>('/clients', data)
  return response.data
}

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
  findByTitle,
  create,
  // deleteById,
  // deleteAll,
  // getAllClients,
}

export default ClientService
