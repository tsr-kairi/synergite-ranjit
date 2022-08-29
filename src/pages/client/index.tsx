import { Loader } from '@mantine/core'
import { ClientTable } from './client-table'
import useGetAllClients from './hooks/useGetAllClients'

export const Client = () => {
  const { data, isError, error } = useGetAllClients()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Loader variant="dots" />
  //     </div>
  //   )
  // }

  if (data?.data.length) {
    return <ClientTable data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Client
