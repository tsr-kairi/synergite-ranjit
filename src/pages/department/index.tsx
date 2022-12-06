import { ListViewLayout } from '@/components/layout/list-view.layout'
import DepartmentTable from './department-table'
import CreateForm from '@/components/form/department/createForm'

import useGetAllDepartment from './hooks/useGetAllDepartment'

export const Department = () => {
  const { data, isError, error, isLoading } = useGetAllDepartment()

  return (
    <ListViewLayout
      title="Department"
      isError={isError}
      isLoading={isLoading}
      createDrawerTitle="Add Department"
      createDrawerChildren={<CreateForm />}
      pageName="department"
    >
      <DepartmentTable data={data?.data || []} />
    </ListViewLayout>
  )

  // if (isError) {
  //   console.log(error)
  //   return <h1>An Error Occurred</h1>
  // }

  // if (data?.data.length) {
  //   return <DepartmentTable data={data.data} />
  // } else {
  //   return <Loader variant="dots" />
  // }
}

export default Department
