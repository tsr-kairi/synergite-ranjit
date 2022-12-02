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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ListViewLayout } from '@/components/layout/list-view.layout'
import axiosPrivate from '@/services/axiosPrivate'
import { TPreonboard } from '@/types/prebonboard-type'
import useGetClientById from '@/pages/client/hooks/useGetClientById'
import useGetCandidateById from '@/pages/candidate/hooks/useGetCandidateById'
import { TCandidate } from '@/types/candidate-type'
import useGetJobById from '@/pages/client/hooks/useGetJobById'
import { useAuth } from '@/store/auth.store'
import { getPermission, IPermissionOptions } from '@/utils/permission.utils'

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
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '3px',
    minWidth: '197vw',
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
  const { jobId } = useParams()
  // const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TSubmission | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes, cx } = useStyles()
  const { mutate: deleteSubmission } = useDeleteSubmissionById()
  const [submissionEditData, setSubmissionEditData] = useState(
    {} as TSubmission
  )
  const navigate = useNavigate()

  // candidate uuid
  const search_param = window.location.search
  const params = new URLSearchParams(search_param)
  const clientUuid = params.get('client_id')
  const { data: clientData } = useGetClientById(String(clientUuid))
  const { data: jobData } = useGetJobById(String(jobId))

  // const [employeeDetails, setEmployeeDetails] = useState({} as TCandidate)
  // console.log('canId', employeeData)

  // name addition
  const clientName = `${clientData?.data?.first_name || ''} ${
    clientData?.data?.last_name || ''
  }`

  //  submissions permission
  const permissions = useAuth((state) => state.permissions)
  const permissionOptions = getPermission({
    pageName: 'submissions',
    permissions,
  }).permissionOptions as IPermissionOptions

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
      client_uuid: submissionData?.client_uuid,
      employee_uuid: submissionData?.employee_uuid,
      vendor_uuid: submissionData?.vendor_uuid,
      submission_uuid: submissionData?.uuid,
    }
    try {
      // delete submissionData.uuid
      const pData = await axiosPrivate.post<preRes>(
        `/onboarding/preonboard`,
        preOnboardingData
      )
      // console.log('PreData', pData.data.data.uuid)
      navigate(
        `/onboarding?client_uuid=${submissionData.client_uuid}&vendor_uuid=${submissionData.vendor_uuid}&employee_uuid=${submissionData.employee_uuid}&submission_uuid=${submissionData?.uuid}&onboarding_uuid=${pData.data.data.uuid}`
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
      <td>{row.submission_id ? row?.submission_id : 'N/A'}</td>
      <td>{`${row?.emp_first_name ? row?.emp_first_name : 'N/A'} ${
        row?.emp_last_name ? row?.emp_last_name : 'N/A'
      }`}</td>
      <td>{jobData?.data?.job_title ? jobData?.data?.job_title : 'N/A'}</td>
      <td>{row.candidate_location ? row?.candidate_location : 'N/A'}</td>
      <td>{`${row?.vendor_first_name ? row?.vendor_first_name : 'N/A'} ${
        row?.vendor_last_name ? row?.vendor_last_name : 'N/A'
      }`}</td>
      <td>{`${row?.emp_first_name ? row?.emp_first_name : 'N/A'} ${
        row?.emp_last_name ? row?.emp_last_name : 'N/A'
      }`}</td>
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
      <td>{clientName ? clientName : 'N/A'}</td>
      <td>{row?.job_id ? row?.job_id : 'N/A'}</td>
      <td>{row?.employment_type ? row?.employment_type : 'N/A'}</td>
      <td>{row.pay_rate ? row?.pay_rate : 'N/A'}</td>
      <td>{row.pay_type ? row?.pay_type : 'N/A'}</td>
      <td>{row.rejection_reason ? row?.rejection_reason : 'N/A'}</td>
      <td>{row.state ? row?.state : 'N/A'}</td>
      <td>{row.submitted_by ? row?.submitted_by : 'N/A'}</td>
      <td>{row.submitted_date ? row?.submitted_date : 'N/A'}</td>
      <td>{row.recruiters ? row?.recruiters : 'N/A'}</td>
      <td>{row.recruitment_mgr_id ? row?.recruitment_mgr_id : 'N/A'}</td>
      <td>{row.acct_mgr_id ? row?.acct_mgr_id : 'N/A'}</td>
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
            {permissionOptions.update && (
              <IconEdit
                className={classes.editIcon}
                cursor="pointer"
                onClick={() => {
                  setIsOpened(true)
                  setSubmissionEditData(row)
                }}
              />
            )}
            {permissionOptions.delete && (
              <IconTrash
                className={classes.deleteIcon}
                cursor="pointer"
                onClick={() => openModalForDelete(row)}
              />
            )}
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
        createDrawerSize={'1200px'}
        createDrawerTitle="Add New Submission"
        isError={false}
        isLoading={false}
        createDrawerChildren={<CreateForm onClose={() => setIsOpened(false)} />}
        onSearchChange={handleSearchChange}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          className={classes.childTable}
        >
          <thead className={cx(classes.header)}>
            <tr>
              {/* new field */}
              <Th
                sorted={sortBy === 'submission_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('submission_id')}
              >
                <b>Submission Id</b>
              </Th>
              <Th
                sorted={sortBy === 'first_name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('first_name')}
              >
                <b>Name</b>
              </Th>
              <Th
                sorted={sortBy === 'job_title'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('job_title')}
              >
                <b>Job Title</b>
              </Th>
              <Th
                sorted={sortBy === 'candidate_location'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('candidate_location')}
              >
                <b>Candidate Location</b>
              </Th>
              {/* old field */}
              <Th
                sorted={sortBy === 'vendor_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('vendor_id')}
              >
                <b>Vendor</b>
              </Th>
              <Th
                sorted={sortBy === 'employee_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('employee_id')}
              >
                <b>Candidate</b>
              </Th>
              <Th
                sorted={sortBy === 'status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('status')}
              >
                <b>Submission Status</b>
              </Th>
              {/* new field */}
              <Th
                sorted={sortBy === 'status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('status')}
              >
                <b>Client</b>
              </Th>
              <Th
                sorted={sortBy === 'job_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('job_id')}
              >
                <b>Job Id</b>
              </Th>
              <Th
                sorted={sortBy === 'employment_type'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('employment_type')}
              >
                <b>Employment Type</b>
              </Th>
              <Th
                sorted={sortBy === 'pay_rate'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('pay_rate')}
              >
                <b>Pay Rate</b>
              </Th>
              <Th
                sorted={sortBy === 'pay_type'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('pay_type')}
              >
                <b>Pay Type</b>
              </Th>
              <Th
                sorted={sortBy === 'rejection_reason'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('rejection_reason')}
              >
                <b>Rejection Reason</b>
              </Th>
              <Th
                sorted={sortBy === 'state'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('state')}
              >
                <b>State</b>
              </Th>
              <Th
                sorted={sortBy === 'submitted_by'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('submitted_by')}
              >
                <b>Submitted By</b>
              </Th>
              <Th
                sorted={sortBy === 'submitted_date'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('submitted_date')}
              >
                <b>Submitted Date</b>
              </Th>
              <Th
                sorted={sortBy === 'recruiters'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('recruiters')}
              >
                <b>Recruiters</b>
              </Th>
              <Th
                sorted={sortBy === 'recruitment_mgr_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('recruitment_mgr_id')}
              >
                <b>Recruitment Manager</b>
              </Th>
              <Th
                sorted={sortBy === 'acct_mgr_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('acct_mgr_id')}
              >
                <b>Account Manager</b>
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

      {/* Edit Submission - Submission Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Submission"
        padding="xl"
        size="1200px"
        position="right"
      >
        <EditForm {...submissionEditData} />
      </Drawer>
      {/* <Modal
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
      </Modal> */}
    </>
  )
}
