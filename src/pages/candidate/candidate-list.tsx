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
import useDeleteCandidateById from './hooks/useDeleteCandidateById'
import { ListViewLayout } from '@/components/layout/list-view.layout'

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

interface ICandidateProps {
  data: TCandidate[]
}

// Exporting Default ClientTable Component
export function CandidateList({ data }: ICandidateProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TCandidate | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const { mutate: deleteCandidate } = useDeleteCandidateById()
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
  const openModalForDelete = (Candidate: TCandidate) => {
    openConfirmModal({
      title: 'Do You want to delete this Employee?',
      children: (
        <Text size="sm">
          After deleting an active candidate, You cannot recover them back. So,
          please choose your action carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteCandidate(Candidate.uuid)
        console.log('delete')
        showNotification({
          title: 'Candidate Deleted !!',
          // message: `${Employee.fname} has been deleted successfully.`,
          message: `Candidate has been deleted successfully.`,
        })
      },
    })
  }

  // candidate data filter handler
  const openModalForFilter = () => {
    openConfirmModal({
      title: 'Select Filter?',
      children: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Text size="sm" color="blue">
              Payment Type
            </Text>
            <Checkbox size="xs" label="Billable" />
            <Checkbox size="xs" label="Non Billable" />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Text size="sm" color="blue">
              Employee Type
            </Text>
            <Checkbox size="xs" label="W2" />
            <Checkbox size="xs" label="C2C" />
            <Checkbox size="xs" label="1099" />
            <Checkbox size="xs" label="Internal" />
          </div>
        </div>
      ),
      labels: { confirm: 'Submit', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        console.log('Filtered')
        showNotification({
          title: 'EmployeeType Filtered !!',
          message: 'EmployeeType has been filtered successfully.',
        })
      },
    })
  }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.uuid} className={classes.candidateRowData}>
      <td>{row?.candidate_id}</td>
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
      <td>{row?.job_title}</td>
      <td>{row?.work_experience}</td>
      <td>{row?.created_date}</td>
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
        title="Candidates"
        createDrawerSize={1200}
        createDrawerTitle="Add New Candidate"
        isError={false}
        isLoading={false}
        createDrawerChildren={<CreateCandidate />}
        onFilterClick={openModalForFilter}
        onSearchChange={handleSearchChange}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          // className={classes.childTable}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'candidate_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('candidate_id')}
              >
                <b>Candidate ID</b>
              </Th>
              <Th
                sorted={sortBy === 'first_name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('first_name')}
              >
                <b>Name</b>
              </Th>
              <Th
                sorted={sortBy === 'email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email')}
              >
                <b>Email</b>
              </Th>
              <Th
                sorted={sortBy === 'phone'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('phone')}
              >
                <b>Phone</b>
              </Th>
              <Th
                sorted={sortBy === 'job_title'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('job_title')}
              >
                <b>Job Title</b>
              </Th>
              <Th
                sorted={sortBy === 'work_experience'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('work_experience')}
              >
                <b>Work Experience</b>
              </Th>
              <Th
                sorted={sortBy === 'created_date'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('created_date')}
              >
                <b>Created Date</b>
              </Th>
              <th className={classes.action}>
                <b>Action</b>
              </th>
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
        title="Edit Candidate"
        padding="xl"
        size="1200px"
        position="right"
      >
        <EditCandidate {...candidateEditData} />
      </Drawer>
    </>
  )
}
