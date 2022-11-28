import { useState } from 'react'
import {
  TransferList,
  TransferListData,
  createStyles,
  Group,
  Text,
  ActionIcon,
} from '@mantine/core'
import { IconLockSquare } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '5px',
  },
  align: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '5px',
  },
  transferList: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '5px',
  },
}))

const initialValues: TransferListData = [
  [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'next', label: 'Next.js' },
    { value: 'blitz', label: 'Blitz.js' },
    { value: 'gatsby', label: 'Gatsby.js' },
    { value: 'vue', label: 'Vue' },
    { value: 'jq', label: 'jQuery' },
  ],
  [
    { value: 'sv', label: 'Svelte' },
    { value: 'rw', label: 'Redwood' },
    { value: 'np', label: 'NumPy' },
    { value: 'dj', label: 'Django' },
    { value: 'fl', label: 'Flask' },
  ],
]

export default function RolesPermission() {
  const { classes } = useStyles()
  const [data, setData] = useState<TransferListData>(initialValues)
  return (
    <div className={classes.main}>
      <Group position="apart" mb="xs" className={classes.align}>
        <Text size="md" color={'blue'}>
          <b>Permission Manager</b>
        </Text>
        <ActionIcon variant="light" radius="xl" color={'blue'}>
          <IconLockSquare />
        </ActionIcon>
      </Group>
      <div className={classes.transferList}>
        <TransferList
          value={data}
          onChange={setData}
          searchPlaceholder="Search by any field..."
          nothingFound="No records found"
          titles={['Available roles permission', 'Chosen roles permission']}
          breakpoint="sm"
          listHeight={250}
        />
      </div>
    </div>
  )
}
