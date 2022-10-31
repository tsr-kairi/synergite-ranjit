import { useState } from 'react'
import {
  createStyles,
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  Drawer,
  Badge,
  Modal,
  // Tooltip,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from '@tabler/icons'
import { TSubmission } from '@/types/submission-type'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import CreateForm from '@/components/form/submission/createForm'
import EditForm from '@/components/form/submission/editForm'
import useDeleteSubmissionById from '../hooks/useDeleteSubmissionById'
import Questionnaire from '@/pages/onboarding/questionnaire'
import { useNavigate, useParams } from 'react-router-dom'
import { ListViewLayout } from '@/components/layout/list-view.layout'
import axiosPrivate from '@/services/axiosPrivate'
import { TPreonboard } from '@/types/prebonboard-type'

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

  submissionRowData: {
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
function filterData(data: TSubmission[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TSubmission[],
  payload: {
    sortBy: keyof TSubmission | null
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

interface ISubmissionProps {
  data: TSubmission[]
}

// Exporting Default ClientTable Component
export function SubmissionList({ data }: ISubmissionProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [popUpIsOpen, setPopUpIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TSubmission | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const { mutate: deleteSubmission } = useDeleteSubmissionById()
  const [submissionEditData, setSubmissionEditData] = useState(
    {} as TSubmission
  )
  const navigate = useNavigate()

  const setSorting = (field: keyof TSubmission) => {
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

  // preOnboardingData response type
  type preRes = {
    ok: boolean
    message: string
    data: {
      uuid: string
      // employee_uuid: string
      // vendor_uuid: string
      // client_uuid: string
      // submission_uuid: string
      // start_date: null
      // end_date: null
      // onboard_status: string
      // completion_percentage: null
    }
  }

  // handlePreOnboarding handler function

  const handlePreOnboarding = async (submissionData: TSubmission) => {
    const preOnboardingData: TPreonboard = {
      job_uuid: submissionData?.job_uuid,
      client_uuid: submissionData?.client_uuid,
      employee_id: submissionData?.employee_id,
      employee_uuid: submissionData?.employee_uuid,
      vendor_uuid: submissionData?.vendor_uuid,
      submission_uuid: String(submissionData?.uuid),
    }
    try {
      // delete submissionData.uuid
      const pData = await axiosPrivate.post<preRes>(
        `/onboarding/preonboard`,
        preOnboardingData
      )
      // console.log('PreData', pData.data.data.uuid)
      navigate(
        `/onboarding?client_uuid=${submissionData.client_uuid}&vendor_uuid=${
          submissionData.vendor_uuid
        }&employee_uuid=${
          submissionData.employee_uuid
        }&submission_uuid=${String(submissionData?.uuid)}&onboarding_uuid=${
          pData.data.data.uuid
        }`
      )
    } catch (error) {
      console.log(error)
    }
  }

  // submission data Delete handler
  const openModalForDelete = (Submission: TSubmission) => {
    openConfirmModal({
      title: 'Do You want to delete this Submission?',
      children: (
        <Text size="sm">
          After deleting a Active Submissions, You cannot recover them back. So,
          Please take your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteSubmission(Submission?.uuid || '')
        console.log('delete')
        showNotification({
          title: 'Submission Deleted !!',
          message: `Submission has been deleted successfully.`,
        })
      },
    })
  }
  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.uuid} className={classes.submissionRowData}>
      <td>{`${row?.vendor_first_name || ''} ${
        row?.vendor_last_name || ''
      }`}</td>
      <td>{`${row?.emp_first_name || ''} ${row?.emp_last_name || ''}`}</td>
      {/* <td>{row?.status}</td> */}
      <td>
        {row.status === 'PRE_INITIATED' ? (
          <Badge
            color="grey"
            style={{
              border: `0.5px solid grey`,
            }}
          >
            PRE INITIATED
          </Badge>
        ) : row.status === 'PRE_INPROGRESS' ? (
          <Badge
            color="blue"
            style={{
              border: `0.5px solid blue`,
            }}
          >
            PRE INPROGRESS
          </Badge>
        ) : row.status === 'ONBOARDING_INITIATED' ? (
          <Badge
            color="grey"
            style={{
              border: `0.5px solid grey`,
            }}
          >
            ONBOARDING INITIATED
          </Badge>
        ) : row.status === 'ONBOARDING_IN_PROGRESS' ? (
          <Badge
            color="yellow"
            style={{
              border: `0.5px solid yellow`,
            }}
          >
            ONBOARDING IN PROGRESS
          </Badge>
        ) : row.status === 'ONBOARDING_COMPLETED' ? (
          <Badge
            color="green"
            style={{
              border: `0.5px solid green`,
            }}
          >
            ONBOARDING COMPLETED
          </Badge>
        ) : row.status === 'HOLD' ? (
          <Badge
            color="orange"
            style={{
              border: `0.5px solid orange`,
            }}
          >
            HOLD
          </Badge>
        ) : row.status === 'REINITIATED' ? (
          <Badge
            color="grey"
            style={{
              border: `0.5px solid grey`,
            }}
          >
            REINITIATED
          </Badge>
        ) : row.status === 'CANCELLED' ? (
          <Badge
            color="red"
            style={{
              border: `0.5px solid red`,
            }}
          >
            CANCELLED
          </Badge>
        ) : null}
      </td>

      <td>
        {row.status === 'Rejected' ? (
          <Badge color="red">Rejected</Badge>
        ) : row.status === 'On Hold' ? (
          <Badge color="yellow">On Hold</Badge>
        ) : row.status === 'Selected' || row.status === null ? (
          <Badge
            color="blue"
            onClick={() => void handlePreOnboarding(row)}
            style={{ cursor: 'pointer' }}
          >
            Onboard Now
          </Badge>
        ) : (
          <Group spacing="sm">
            <IconEdit
              className={classes.editIcon}
              cursor="pointer"
              onClick={() => {
                setIsOpened(true)
                setSubmissionEditData(row)
              }}
            />
            <IconTrash
              className={classes.deleteIcon}
              cursor="pointer"
              onClick={() => openModalForDelete(row)}
            />
          </Group>
        )}
      </td>
    </tr>
  ))

  // Returning the Scroll Area of Table
  return (
    <>
      <ListViewLayout
        title="Submission"
        createDrawerSize={'xl'}
        createDrawerTitle="Add New Submission"
        isError={false}
        isLoading={false}
        createDrawerChildren={<CreateForm onClose={() => setOpened(false)} />}
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
                sorted={sortBy === 'vendor_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('vendor_id')}
              >
                Vendor
              </Th>
              <Th
                sorted={sortBy === 'employee_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('employee_id')}
              >
                Candidate
              </Th>
              <Th
                sorted={sortBy === 'status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('status')}
              >
                Submission Status
              </Th>
              <th className={classes.action}>Action</th>
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

      {/* Edit Submission - Submission Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Submission"
        padding="xl"
        size="xl"
        position="right"
      >
        <EditForm {...submissionEditData} />
      </Drawer>

      {/* On Board PopUp */}
      <Modal
        title={
          <Text
            weight="500"
            style={{
              textAlign: 'center',
              fontFamily: '-moz-initial',
              fontSize: '24px',
            }}
          >
            Questionnaire
          </Text>
        }
        size="lg"
        onClose={() => setPopUpIsOpen(false)}
        opened={popUpIsOpen}
      >
        <Questionnaire />
      </Modal>
    </>
  )
}
