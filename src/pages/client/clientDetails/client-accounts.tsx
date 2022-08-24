import { useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Drawer,
  Pagination,
  Button,
  // Pagination,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconTrash,
  IconPlus,
  IconAddressBook,
} from '@tabler/icons'
import { TClientList } from '@/types'
import { openConfirmModal } from '@mantine/modals'
import AddNew from '@/components/form/addNew'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },

  companyDetails: {
    border: 'none',
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
  tableHead: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0 !important',
    gap: '30px',
  },

  tableBottom: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchField: {
    flex: 1,
  },
  text: {
    color: theme.colors.blue[9],
  },
  contactIcon: {
    color: theme.colors.blue[8],
  },
  editIcon: {
    color: theme.colors.blue[5],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
  deleteIcon: {
    color: '#FF7676',
    '&:hover': {
      color: '#FF1414',
    },
  },
  action: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
  childTable: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '98.3%',
    margin: '10px',
    borderCollapse: 'collapse',
    border: 'none',
  },
}))

interface ClientAccountsProps {
  data: TClientList[]
}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: TClientList[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

function sortData(
  data: TClientList[],
  payload: {
    sortBy: keyof TClientList | null
    reversed: boolean
    search: string
  }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return String(b[sortBy]).localeCompare(String(a[sortBy]))
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]))
    }),
    payload.search
  )
}

export function ClientAccounts({ data }: ClientAccountsProps) {
  /* Add New - Client state*/
  const [opened, setOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TClientList | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const setSorting = (field: keyof TClientList) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    // setSortedData()
    sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
  }
  //   client data Delete handler
  const openModalForDelete = () => {
    console.log('openModalForDelete')

    openConfirmModal({
      title: 'Do You want to delete this client?',
      children: (
        <Text size="sm">
          After deleting a clients, You cannot recover them back. So, Please
          take your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        // void axios
        //   .delete(`http://localhost:4000/clientTableData/${ClientAccounts.id}`)
        //   .then(() => {
        //     showNotification({
        //       title: 'ClientAccounts deleted!',
        //       message: `${ClientAccounts.name.toUpperCase()} deleted Successfully!`,
        //     })
        //   })
        console.log('delete')
      },
    })
  }
  const rows = sortedData.map((row) => (
    <tr key={row.name} className={classes.companyDetails}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={26} src={row.avatar} radius={26} /> */}
          <Text size="sm" weight={500}>
            {row.name}
          </Text>
        </Group>
      </td>
      <td>{row.email}</td>
      <td>{row.city}</td>
      <td>{row.state}</td>
      <td>
        <Group spacing="sm">
          <IconEdit className={classes.editIcon} cursor="pointer" />
          <IconTrash
            className={classes.deleteIcon}
            cursor="pointer"
            onClick={() => openModalForDelete()}
          />
        </Group>
      </td>
    </tr>
  ))
  return (
    <ScrollArea>
      <div className={classes.tableHead}>
        <Group spacing="sm">
          <Text size={'xl'} weight="600" className={classes.text}>
            Contacts
          </Text>
          <IconAddressBook className={classes.contactIcon} />
        </Group>
        <TextInput
          placeholder="Search by any field"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          radius="xl"
          className={classes.searchField}
        />
        {/* Add New - Client Button*/}
        <Button onClick={() => setOpened(true)}>
          <Group spacing="sm" align="center">
            <IconPlus color="white" />
            <Text weight={400}>Add New</Text>
          </Group>
        </Button>
      </div>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        className={classes.childTable}
        // sx={{ width: '100%', maxWidth: '90%', marginLeft: 0, marginRight: 0 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === 'city'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('city')}
            >
              Phone
            </Th>
            <Th
              sorted={sortBy === 'state'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('state')}
            >
              Country
            </Th>
            <th className={classes.action}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Add New - Client Form Drawer*/}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Client"
        padding="xl"
        size="xl"
        position="right"
      >
        <AddNew />
      </Drawer>
      <div className={classes.tableBottom}>
        <Text color={'grey'}>Showing 1 to 20 of 110 entries</Text>
        <Pagination total={5} size="sm" />
      </div>
    </ScrollArea>
  )
}
