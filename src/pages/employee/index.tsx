import { Loader } from '@mantine/core'
import { EmployeeList } from './employee-list'
import useGetAllEmployees from './hooks/useGetAllEmployees'
// import useGetAllClients from './hooks/useGetAllClients'

export const Employee = () => {
  const { data, isError, error, isLoading } = useGetAllEmployees()

  if (isError) {
    return <h1>An Error Occurred</h1>
  }
  
  if (!isLoading) {
    return <EmployeeList data={data?.data || []} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Employee
