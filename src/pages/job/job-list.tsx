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
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { ListViewLayout } from '@/components/layout/list-view.layout'
import useDeleteJobById from '../client/hooks/useDeleteJobById'
import { TJobs } from '@/types'
import EditForm from '@/components/form/client/job/editForm'
import CreateForm from '@/components/form/client/job/createForm'

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

  jobsRowData: {
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
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme?.colors?.gray?.[3]} !important`,
    },
  },

  trList: {
    border: 'none',
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
    },
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
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '3px',
    minWidth: '190vw',
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
function filterData(data: TJobs[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TJobs[],
  payload: {
    sortBy: keyof TJobs | null
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

interface IJobsProps {
  data: TJobs[]
}

// Exporting Default ClientTable Component
export function AllJobList({ data }: IJobsProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TJobs | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes, cx } = useStyles()
  const { mutate: deleteJobs } = useDeleteJobById()
  const [jobsEditData, setJobsEditData] = useState({} as TJobs)

  const setSorting = (field: keyof TJobs) => {
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

  // jobs data Delete handler
  const openModalForDelete = (Jobs: TJobs) => {
    openConfirmModal({
      title: 'Do You want to delete this Employee?',
      children: (
        <Text size="sm">
          After deleting an active jobs, You cannot recover them back. So,
          please choose your action carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteJobs(Jobs.uuid)
        console.log('delete')
        showNotification({
          title: 'Jobs Deleted !!',
          // message: `${Employee.fname} has been deleted successfully.`,
          message: `Jobs has been deleted successfully.`,
        })
      },
    })
  }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row.uuid} className={classes.trList}>
      <td
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '100px',
        }}
      >
        {row?.uuid}
      </td>
      <td>
        {/* <Link
          to={`/submissions/${row?.uuid}?client_id=${String(
            clientId
          )}&job_id=${String(row.uuid)}`}
          className={classes.userLink}
          onClick={() => setJob(row)}
        > */}
        <Tooltip
          label="Click to view"
          color="blue"
          withArrow
          transition="pop-top-right"
          transitionDuration={300}
        >
          <div>{row?.job_title}</div>
        </Tooltip>
        {/* </Link> */}
      </td>
      <td>{row?.city}</td>
      <td>{row?.client_request_id}</td>
      <td>{row?.primary_skills}</td>
      <td>{row?.customer_type}</td>
      <td>{row?.employment_type}</td>
      <td>{row?.bill_rate}</td>
      <td>{row?.priority}</td>
      <td>{row?.priority_reason}</td>
      <td>{row?.status}</td>
      <td>{row?.remote_status}</td>
      <td
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '100px',
        }}
      >
        {row?.created_by}
      </td>
      <td>{row?.client_contact_name}</td>
      <td>{row?.recruitment_manager_uuid}</td>
      <td>{row?.account_manager_uuid}</td>
      <td>{row?.recruiter_uuid}</td>

      <td>
        <Group spacing="sm">
          <IconEdit
            className={classes.editIcon}
            cursor="pointer"
            onClick={() => {
              setIsOpened(true)
              setJobsEditData(row)
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

  return (
    <>
      <ListViewLayout
        title="Jobs"
        createDrawerSize={1200}
        createDrawerTitle="Add New Job"
        isError={false}
        isLoading={false}
        createDrawerChildren={<CreateForm />}
        onSearchChange={handleSearchChange}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          className={classes.childTable}
        >
          <thead className={cx(classes.header)}>
            <tr>
              <Th
                sorted={sortBy === 'uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('uuid')}
              >
                <b>Job Id</b>
              </Th>
              <Th
                sorted={sortBy === 'job_title'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('job_title')}
              >
                <b>Job Title</b>
              </Th>
              <Th
                sorted={sortBy === 'city'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('city')}
              >
                <b>City</b>
              </Th>
              <Th
                sorted={sortBy === 'client_request_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('client_request_id')}
              >
                <b>Client Request Id</b>
              </Th>
              <Th
                sorted={sortBy === 'primary_skills'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('primary_skills')}
              >
                <b>Primary Skill</b>
              </Th>
              <Th
                sorted={sortBy === 'customer_type'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('customer_type')}
              >
                <b>Customer Type</b>
              </Th>
              <Th
                sorted={sortBy === 'employment_type'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('employment_type')}
              >
                <b>Employment Type</b>
              </Th>
              <Th
                sorted={sortBy === 'bill_rate'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('bill_rate')}
              >
                <b>Bill Rate</b>
              </Th>
              <Th
                sorted={sortBy === 'priority'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('priority')}
              >
                <b>Priority</b>
              </Th>
              <Th
                sorted={sortBy === 'priority_reason'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('priority_reason')}
              >
                <b>Priority Reason</b>
              </Th>
              <Th
                sorted={sortBy === 'status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('status')}
              >
                <b>Status</b>
              </Th>
              <Th
                sorted={sortBy === 'remote_status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('remote_status')}
              >
                <b>Remote Status</b>
              </Th>
              <Th
                sorted={sortBy === 'created_by'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('created_by')}
              >
                <b>Created By</b>
              </Th>

              <Th
                sorted={sortBy === 'client_contact_name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('client_contact_name')}
              >
                <b>Client Contact Name</b>
              </Th>
              <Th
                sorted={sortBy === 'recruitment_manager_uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('recruitment_manager_uuid')}
              >
                <b>Recruitment Manager</b>
              </Th>
              <Th
                sorted={sortBy === 'account_manager_uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('account_manager_uuid')}
              >
                <b>Account Manager</b>
              </Th>
              <Th
                sorted={sortBy === 'recruiter_uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('recruiter_uuid')}
              >
                <b>Recruiter</b>
              </Th>
              <th className={classes.action}>
                <b>Action</b>
              </th>
            </tr>
          </thead>

          {/* t-body */}
          <tbody>
            {rows.length ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data || {}).length}>
                  <Text weight={500} align="center">
                    No records found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ListViewLayout>
      {/* Edit - Contact Form Drawer*/}

      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Contact"
        padding="xl"
        size="1200px"
        position="right"
      >
        <EditForm {...jobsEditData} />
      </Drawer>
    </>
  )
}
