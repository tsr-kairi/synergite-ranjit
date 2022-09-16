import { Paper } from '@mantine/core'
import { EmployeeId } from './employeeIdList'

const data = [
  {
    id: 1,
    name: 'Robert Wolfkisser',
  },
  {
    id: 2,
    name: 'Robert Wolfkisser',
  },
  {
    id: 3,
    name: 'Robert Wolfkisser',
  },
  {
    id: 4,
    name: 'Robert Wolfkisser',
  },
  {
    id: 5,
    name: 'Robert Wolfkisser',
  },
  {
    id: 6,
    name: 'Robert Wolfkisser',
  },
  {
    id: 7,
    name: 'Robert Wolfkisser',
  },
  {
    id: 8,
    name: 'Robert Wolfkisser',
  },
  {
    id: 9,
    name: 'Robert Wolfkisser',
  },
  {
    id: 10,
    name: 'Robert Wolfkisser',
  },
]

interface EmployeeIdListProps {
  setEmpId: (value: number) => void
}

const EmployeeIdList = ({ setEmpId }: EmployeeIdListProps) => {
  console.log(setEmpId)

  return (
    <Paper
      style={{
        boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
        padding: '20px',
      }}
    >
      <EmployeeId data={data} setEmpId={setEmpId} />
    </Paper>
  )
}

export default EmployeeIdList
