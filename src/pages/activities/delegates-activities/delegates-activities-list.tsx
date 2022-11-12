import { useState } from 'react'
import {
  createStyles,
  UnstyledButton,
  Table,
  Group,
  Text,
  Center,
  Drawer,
  Tooltip,
  Avatar,
  Checkbox,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from '@tabler/icons'
import { TCandidate } from '@/types/candidate-type'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import EditCandidate from '@/components/form/candidate/editForm'
import CreateCandidate from '@/components/form/candidate/createForm'
import { Link } from 'react-router-dom'
import { ListViewLayout } from '@/components/layout/list-view.layout'
import useDeleteCandidateById from '@/pages/candidate/hooks/useDeleteCandidateById'

// Style for the Page
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

  candidateRowData: {
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
    color: '#04334c',
  },
  filterIcon: {
    color: '#04334c',
  },
  editIcon: {
    color: '#04334c',
    '&:hover': {
      color: '#04334c',
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
function filterData(data: TCandidate[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TCandidate[],
  payload: {
    sortBy: keyof TCandidate | null
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

interface IDelegatesActivitiesProps {
  data: TCandidate[]
}

// Exporting Default ClientTable Component
export function DelegatesActivitiesList({ data }: IDelegatesActivitiesProps) {
  const { classes } = useStyles()
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TCandidate | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { mutate: deleteDelegatesActivities } = useDeleteCandidateById()
  const [candidateEditData, setCandidateEditData] = useState({} as TCandidate)

  const setSorting = (field: keyof TCandidate) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (searchTerm: string) => {
    setSearch(searchTerm)
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: searchTerm,
      })
    )
  }

  // candidate data Delete handler
  const openModalForDelete = (DelegatesActivities: TCandidate) => {
    openConfirmModal({
      title: 'Do You want to delete this My Team Delegated Activities?',
      children: (
        <Text size="sm">
          After deleting an My Team Delegated Activities, You cannot recover
          them back. So, please choose your action carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteDelegatesActivities(DelegatesActivities.uuid)
        console.log('delete')
        showNotification({
          title: 'DelegatesActivities Deleted !!',
          // message: `${Employee.fname} has been deleted successfully.`,
          message: `DelegatesActivities has been deleted successfully.`,
        })
      },
    })
  }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.uuid} className={classes.candidateRowData}>
      <td>
        <Link
          to={`/candidate-details/${row?.uuid}`}
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
              {/* <Avatar
                size={26}
                src={`https://gokv9osl.directus.app/assets/${row?.profile_image}/${row?.fname}.png?access_token=Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE`}
                radius={26}
              /> */}
              <Avatar color="cyan" size={26} radius={26}>
                E
              </Avatar>
              <Text size="sm" weight={500}>
                {row?.first_name} {row?.last_name}
              </Text>
            </Group>
          </Tooltip>
        </Link>
      </td>
      <td>{row?.email}</td>
      <td>{row?.phone}</td>
      <td>{row?.gender}</td>
      <td>{row?.city}</td>
      <td>{row?.state}</td>
      <td>{row?.country}</td>
      <td>
        <Group spacing="sm">
          <IconEdit
            className={classes.editIcon}
            cursor="pointer"
            onClick={() => {
              setIsOpened(true)
              setCandidateEditData(row)
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
      <ListViewLayout
        title="My Team Delegated Activities"
        createDrawerSize={1200}
        createDrawerTitle="Add New Delegates Activities "
        isError={false}
        isLoading={false}
        createDrawerChildren={<CreateCandidate />}
        onSearchChange={handleSearchChange}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          className={classes.childTable}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'first_name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('first_name')}
              >
                Type
              </Th>
              <Th
                sorted={sortBy === 'email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email')}
              >
                Sub Type
              </Th>
              <Th
                sorted={sortBy === 'phone'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('phone')}
              >
                Assigned By
              </Th>
              <Th
                sorted={sortBy === 'gender'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('gender')}
              >
                Assigned To
              </Th>
              <Th
                sorted={sortBy === 'city'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('city')}
              >
                Status
              </Th>
              <Th
                sorted={sortBy === 'state'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('state')}
              >
                Sub Status
              </Th>
              <Th
                sorted={sortBy === 'country'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('country')}
              >
                Assigned Date
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
      </ListViewLayout>

      {/* Edit Employee - Employee Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit My Team Delegated Activities"
        padding="xl"
        size="1200px"
        position="right"
      >
        <EditCandidate {...candidateEditData} />
      </Drawer>
    </>
  )
}
