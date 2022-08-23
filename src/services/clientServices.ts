import { IRowClientData } from '@/types'
import mainApi from './base'

const findAll = async () => {
  const response = await mainApi.get<IRowClientData[]>('/clients')
  return response.data
}

const findById = async (id: any) => {
  const response = await mainApi.get<IRowClientData>(`/clients/${id}`)
  return response.data
}

const findByTitle = async (title: string) => {
  const response = await mainApi.get<IRowClientData[]>(
    `/clients?title=${title}`
  )
  return response.data
}

const create = async (data: IRowClientData) => {
  const response = await mainApi.post<any>('/clients', data)
  return response.data
}

const update = async (
  id: any,
  { data }: IRowClientData
) => {
  const response = await mainApi.put<any>(`/tutorials/${id}`, {
    data
  })
  return response.data
}

const deleteById = async (id: any) => {
  const response = await mainApi.delete<any>(`/tutorials/${id}`)
  return response.data
}

const deleteAll = async () => {
  const response = await mainApi.delete<any>('/tutorials')
  return response.data
}

const ClientsService = {
  findAll,
  findById,
  findByTitle,
  create,
  update,
  deleteById,
  deleteAll,
}

export default ClientsService
