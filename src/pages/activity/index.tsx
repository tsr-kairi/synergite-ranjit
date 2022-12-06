import { ListViewLayout } from '@/components/layout/list-view.layout'
import CreateForm from '@/components/form/defaultActivity/createForm'
import ActivityTable from './activity-table'
import useGetAllDefaultActivity from './hooks/useGetAllDefaultActivity'

export const Activity = () => {
  const { data, isError, error, isLoading } = useGetAllDefaultActivity()

  return (
    <ListViewLayout
      title="Activity"
      isError={isError}
      isLoading={isLoading}
      createDrawerTitle="Add New Activity"
      createDrawerChildren={<CreateForm />}
      pageName="activity"
    >
      <ActivityTable data={data?.data || []} />
    </ListViewLayout>
  )

  // if (isError) {
  //   console.log(error)
  //   return <h1>An Error Occurred</h1>
  // }

  // if (data?.data.length) {
  //   return <ActivityTable data={data.data} />
  // } else {
  //   return <Loader variant="dots" />
  // }
}

export default Activity
