import useGetAllClients from '@/pages/client/hooks/useGetAllClients'
import { TClient } from '@/types'

import { Loader, Paper } from '@mantine/core'
import { ClientId } from './clientIdList'

interface ClientIdListProps {
  setClient: (value: TClient) => void
}

export const ClientIdList = ({ setClient }: ClientIdListProps) => {
  const { data, isError, error, isLoading } = useGetAllClients()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (!isLoading) {
    return (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        <ClientId data={data?.data ? data?.data : []} setClient={setClient} />
      </Paper>
    )
  } else if (isLoading) {
    return <Loader variant="dots" />
  } else {
    return <></>
  }
}

export default ClientIdList
