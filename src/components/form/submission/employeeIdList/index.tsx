import useGetAllEmployees from '@/pages/employee/hooks/useGetAllEmployees'
import { TAEmployee } from '@/types/employee-type'
import { Loader, Paper } from '@mantine/core'
import { EmployeeId } from './employeeIdList'

// const data = [
//   {
//     employee_name: 'Rahul Singh',
//     employee_uuid: '1',
//   },
//   {
//     employee_name: 'Biswas Singh',
//     employee_uuid: '2',
//   },
//   {
//     employee_name: 'Shekhar Sudra',
//     employee_uuid: '3',
//   },
//   {
//     employee_name: 'Sibangi Nama',
//     employee_uuid: '4',
//   },
//   {
//     employee_name: 'Sunil Sarkar',
//     employee_uuid: '5',
//   },
//   {
//     employee_name: 'Petter Parker',
//     employee_uuid: '6',
//   },
// ]

interface EmployeeIdListProps {
  setEmployee: (value: TAEmployee) => void
}

// { setEmployee }: EmployeeIdListProps
// setEmployee={setEmployee}

export const EmployeeIdList = ({ setEmployee }: EmployeeIdListProps) => {
  const { data, isError, error, isLoading } = useGetAllEmployees()
  console.log('empDataNewOne', data)

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  // if (data?.data) {
  //   return (
  //     <Paper
  //       style={{
  //         boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
  //         padding: '20px',
  //       }}
  //     >
  //       <EmployeeId data={data.data} />
  //     </Paper>
  //   )
  // } else {
  //   return <Loader variant="dots" />
  // }

  if (!isLoading) {
    return (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        <EmployeeId
          data={data?.data ? data?.data : []}
          setEmployee={setEmployee}
        />
      </Paper>
    )
  } else if (isLoading) {
    return <Loader variant="dots" />
  } else {
    return <></>
  }
}

export default EmployeeIdList
