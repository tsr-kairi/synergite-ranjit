import { ClientTable } from './client-table'
import { TClientFindAll } from '@/types'
import { Loader } from '@mantine/core'
import ClientService from '@/services/clientService'
import { useQuery } from 'react-query'

export const Client = () => {
  const { data, isError, error, isLoading } = useQuery<TClientFindAll, Error>(
    'clientAll',
    async () => await ClientService.findAll()
  )

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  if (data?.data.length) {
    return <ClientTable data={data.data} />
  } else {
    return <h1>Loading...</h1>
  }
}

export default Client
