import { ListViewLayout } from '@/components/layout/list-view.layout'
import { ClientTable } from './client-table'
import CreateClient from '@/components/form/client/createForm'
import useGetAllClients from './hooks/useGetAllClients'

export const Client = () => {
  const { data, isError, isLoading } = useGetAllClients()

  return (
    <ListViewLayout
      title="Clients"
      isError={isError}
      isLoading={isLoading}
      createDrawerTitle="Add New Client"
      createDrawerChildren={<CreateClient />}
      createDrawerSize={'1200px'}
      pageName="client"
    >
      <ClientTable data={data?.data || []} />
    </ListViewLayout>
  )
}

export default Client
