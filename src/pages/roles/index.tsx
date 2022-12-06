import CreateForm from '@/components/form/roles/createForm'
import RolesTable from './roles-table'
import useGetAllRoles from './hooks/useGetAllRoles'
import { ListViewLayout } from '@/components/layout/list-view.layout'

export const Roles = () => {
  const { data, isError, isLoading } = useGetAllRoles()

  return (
    <ListViewLayout
      title="Roles"
      isError={isError}
      isLoading={isLoading}
      createDrawerTitle="Add Role"
      createDrawerChildren={<CreateForm />}
      pageName="roles"
    >
      <RolesTable data={data?.data || []} />
    </ListViewLayout>
  )

  // if (isError) {
  //   console.log(error)
  //   return <h1>An Error Occurred</h1>
  // }

  // if (data?.data.length) {
  //   return <RolesTable data={data.data} />
  // } else {
  //   return <Loader variant="dots" />
  // }
}

export default Roles
