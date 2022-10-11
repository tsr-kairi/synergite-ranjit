import { useState } from 'react'
import {
  // createStyles,
  Table,
  ScrollArea,
  // Group,
  Text,
  Radio,
} from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons'

// const useStyles = createStyles((theme) => ({
//   rowSelected: {
//     backgroundColor:
//       theme.colorScheme === 'dark'
//         ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
//         : theme.colors[theme.primaryColor][0],
//   },
// }))

export type employee = {
  employee_name: string
  employee_uuid: string
}
interface EmployeeIdProps {
  data: employee[]
  setEmployee: (value: employee) => void
}

export function EmployeeId({ data, setEmployee }: EmployeeIdProps) {
  // const { classes, cx } = useStyles()

  const rows = data.map((item) => {
    return (
      <tr key={item.employee_name}>
        <td>
          <Radio
            value={item.employee_name.toString()}
            onClick={() => setEmployee(item)}
          />
        </td>

        <td>
          <Text size="sm" weight={500}>
            {item.employee_name}
          </Text>
        </td>

        {/* <td>
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
        </td> */}
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
              <th>Employee Name</th>
              {/* <th>Name</th> */}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Radio.Group>
    </ScrollArea>
  )
}
