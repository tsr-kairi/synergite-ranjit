import { useState } from 'react'
import { ClientTable } from './client-table'
import { IRowClientData } from '@/types'
import { Loader } from '@mantine/core'
import ClientService from '@/services/clientService'
import { useQuery } from 'react-query'

export const Client = () => {
  const [clientData, setClientData] = useState<IRowClientData[]>(
    [] as IRowClientData[]
  )
  const { isError, error, isLoading } = useQuery(
    'clientAll',
    ClientService.findAll,
    {
      onSuccess: (data) => {
        setClientData(data?.data)
      },
    }
  )

  if (isError) {
    console.log(error)
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return <ClientTable data={clientData} />
}

export default Client
