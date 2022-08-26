import { useState } from 'react'
import { ClientTable } from './client-table'
import { TClientList } from '@/types'
import { Loader } from '@mantine/core'
import ClientService from '@/services/clientService'
import { useQuery } from 'react-query'

export const Client = () => {
  const [clientData, setClientData] = useState<TClientList[]>(
    [] as TClientList[]
  )
  const { isError, error, isLoading } = useQuery(
    'clientAll',
    ClientService.findAll,
    {
      onSuccess: (data) => {
        // console.log(data)
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
