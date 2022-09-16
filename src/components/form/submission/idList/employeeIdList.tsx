import { useState } from 'react'
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  // Group,
  Text,
  Radio,
} from '@mantine/core'
import { IconCheck, IconCircleCheck } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}))

interface EmployeeIdProps {
  data: {
    name: string
    id: number
  }[]
  setEmpId: (value: number) => void
}

export function EmployeeId({ data, setEmpId }: EmployeeIdProps) {
  // const { classes, cx } = useStyles()

  const rows = data.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <Radio value={item.id.toString()} onClick={() => setEmpId(item.id)} />
        </td>

        <td>
          <Text size="sm" weight={500}>
            {item.id}
          </Text>
        </td>

        <td>
          <Text size="sm" weight={500}>
            {item.name}
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
              <th>Employee Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Radio.Group>
    </ScrollArea>
  )
}
