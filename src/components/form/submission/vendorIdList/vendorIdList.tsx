// import { useState } from 'react'
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

export type vendor = {
  vendor_name: string
  vendor_uuid: string
}
interface VendorIdProps {
  data: vendor[]
  setVendor: (value: vendor) => void
}

export function VendorId({ data, setVendor }: VendorIdProps) {
  // const { classes, cx } = useStyles()

  const rows = data.map((item) => {
    return (
      <tr key={item.vendor_name}>
        <td>
          <Radio
            value={item.vendor_name.toString()}
            onClick={() => setVendor(item)}
          />
        </td>

        <td>
          <Text size="sm" weight={500}>
            {item.vendor_name}
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
              <th>Vendor Name</th>
              {/* <th>Name</th> */}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Radio.Group>
    </ScrollArea>
  )
}
