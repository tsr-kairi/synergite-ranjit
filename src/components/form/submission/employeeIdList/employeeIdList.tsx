import { useState } from 'react'
import { Table, ScrollArea, Text, Radio } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons'
import { TAEmployee } from '@/types/employee-type'

// const useStyles = createStyles((theme) => ({
//   rowSelected: {
//     backgroundColor:
//       theme.colorScheme === 'dark'
//         ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
//         : theme.colors[theme.primaryColor][0],
//   },
// }))

// export type employee = {
//   employee_name: string
//   employee_uuid: string
// }
interface EmployeeIdProps {
  data: TAEmployee[]
  setEmployee: (value: TAEmployee) => void
}

export function EmployeeId({ data, setEmployee }: EmployeeIdProps) {
  // const { classes, cx } = useStyles()
  const [empData, setEmpDataMain] = useState(data)

  const rows = empData?.map((item) => {
    return (
      <tr key={item.uuid}>
        <td>
          <Radio
            value={item.fname.toString()}
            onClick={() => setEmployee(item)}
          />
        </td>

        <td>
          <Text size="sm" weight={500}>
            {item.fname}
            {/* {item.lname} */}
          </Text>
        </td>
      </tr>
    )
  })

  return (
    <ScrollArea>
      <Radio.Group>
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>
                <IconCircleCheck
                  style={{
                    marginTop: '10px',
                  }}
                />
              </th>
              <th>Candidate Name</th>
              {/* <th>Name</th> */}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0] || {}).length}>
                  <Text weight={500} align="center">
                    No Candidate found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Radio.Group>
    </ScrollArea>
  )
}
