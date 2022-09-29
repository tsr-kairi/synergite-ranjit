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
  Avatar,
  Button,
  Drawer,
  Pagination,
  Tooltip,
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
  IconFilter,
} from '@tabler/icons'
import { TActivity } from '@/types/activity-type'
import { openConfirmModal } from '@mantine/modals'
import CreateForm from '@/components/form/defaultActivity/createForm'
import EditForm from '@/components/form/defaultActivity/editForm'
import { showNotification } from '@mantine/notifications'
import useDeleteVendorById from './hooks/useDeleteVendorById'
import { Link } from 'react-router-dom'

// Style for the activity Page
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
  filterIcon: {
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
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.20)',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '98.8%',
    margin: '10px',
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))

// Table Heading Props
interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

// Table Heading Component
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

// Utility Function - filterData
function filterData(data: TActivity[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TActivity[],
  payload: {
    sortBy: keyof TActivity | null
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

interface IActivityTableProps {
  data: TActivity[]
}

// Exporting Default ClientTable Component
export default function ActivityTable({ data }: IActivityTableProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [activityEditData, setActivityEditData] = useState({} as TActivity)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TActivity | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const { mutate: deleteActivity } = useDeleteVendorById()

  const setSorting = (field: keyof TActivity) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  // vendor data Delete handler
  const openModalForDelete = (vendor: TActivity) => {
    openConfirmModal({
      title: 'Do You want to delete this vendor?',
      children: (
        <Text size="sm">
          After deleting a vendors, You cannot recover them back. So, Please
          take your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteActivity(vendor.uuid)
        showNotification({
          title: 'Activity Deleted !!',
          message: `Activity has been deleted successfully.`,
        })
      },
    })
  }

  // if (!sortedData.length) {
  //   return <h1>Loading</h1>
  // }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.id} className={classes.companyDetails}>
      <td>{row?.role_uuid}</td>
      <td>
        <Link
          to={`/activity-details/${row?.uuid}?id=${row?.id}`}
          className={classes.userLink}
        >
          <Tooltip
            label="Click to view"
            color="blue"
            withArrow
            transition="pop-top-right"
            transitionDuration={300}
          >
            <Group spacing="sm">
              <Avatar color="cyan" radius={26} size={26}>
                A
              </Avatar>
              <Text size="sm" weight={500}>
                {row?.immigration_status}
              </Text>
            </Group>
          </Tooltip>
        </Link>
      </td>
      <td>{row?.employee_type}</td>
      <td>{row?.new_client}</td>
      <td>{row?.new_subvendor}</td>
      <td>{row?.default_activity}</td>
      <td>{row?.department_uuid}</td>
      <td>
        <Group spacing="sm">
          <IconEdit
            className={classes.editIcon}
            cursor="pointer"
            onClick={() => {
              setIsOpened(true)
              setActivityEditData(row)
            }}
          />
          <IconTrash
            className={classes.deleteIcon}
            cursor="pointer"
            onClick={() => openModalForDelete(row)}
          />
        </Group>
      </td>
    </tr>
  ))

  // Returning the Scroll Area of Table
  return (
    <>
      <ScrollArea>
        <div className={classes.tableHead}>
          <Group spacing="sm">
            <Text size={'xl'} weight="600" className={classes.text}>
              Activity List
            </Text>
            <IconFilter className={classes.filterIcon} />
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
                sorted={sortBy === 'role_uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('role_uuid')}
              >
                Id
              </Th>
              <Th
                sorted={sortBy === 'immigration_status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('immigration_status')}
              >
                Immigration Status
              </Th>

              <Th
                sorted={sortBy === 'employee_type'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('employee_type')}
              >
                Type of Employee
              </Th>
              <Th
                sorted={sortBy === 'new_client'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('new_client')}
              >
                New Client
              </Th>
              <Th
                sorted={sortBy === 'new_subvendor'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('new_subvendor')}
              >
                New Sub Vendor
              </Th>
              <Th
                sorted={sortBy === 'default_activity'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('default_activity')}
              >
                Default Activity
              </Th>
              <Th
                sorted={sortBy === 'department_uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('department_uuid')}
              >
                Department
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

        <div className={classes.tableBottom}>
          <Text color={'grey'}>Showing 1 to 20 of 110 entries</Text>
          <Pagination total={5} size="sm" />
        </div>
      </ScrollArea>

      {/* Add New - Vendor Form Drawer*/}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Activity"
        padding="xl"
        size="xl"
        position="right"
      >
        <CreateForm />
      </Drawer>

      {/* Edit Vendor - Vendor Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Activity"
        padding="xl"
        size="xl"
        position="right"
      >
        <EditForm {...activityEditData} />
      </Drawer>
    </>
  )
}
