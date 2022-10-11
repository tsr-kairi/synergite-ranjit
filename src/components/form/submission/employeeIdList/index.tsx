import useGetAllEmployees from '@/pages/employee/hooks/useGetAllEmployees'
import { Paper } from '@mantine/core'
import { employee, EmployeeId } from './employeeIdList'

const data = [
  {
    employee_name: 'Rahul Singh',
    employee_uuid: '1',
  },
  {
    employee_name: 'Biswas Singh',
    employee_uuid: '2',
  },
  {
    employee_name: 'Shekhar Sudra',
    employee_uuid: '3',
  },
  {
    employee_name: 'Sibangi Nama',
    employee_uuid: '4',
  },
  {
    employee_name: 'Sunil Sarkar',
    employee_uuid: '5',
  },
  {
    employee_name: 'Petter Parker',
    employee_uuid: '6',
  },
]

interface EmployeeIdListProps {
  setEmployee: (value: employee) => void
}

const EmployeeIdList = ({ setEmployee }: EmployeeIdListProps) => {
  // const { data, isError, error } = useGetAllEmployees()

  return (
    <Paper
      style={{
        boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
        padding: '20px',
      }}
    >
      <EmployeeId data={data} setEmployee={setEmployee} />
    </Paper>
  )
}

export default EmployeeIdList
