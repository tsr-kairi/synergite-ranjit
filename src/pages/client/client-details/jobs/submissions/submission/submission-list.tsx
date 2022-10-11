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
  Button,
  Drawer,
  Pagination,
  Badge,
  Modal,
  // Tooltip,
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
import { TSubmission } from '@/types//submission-type'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import CreateForm from '@/components/form/submission/createForm'
import EditForm from '@/components/form/submission/editForm'
import useDeleteSubmissionById from '../hooks/useDeleteSubmissionById'
import Questionnaire from '@/pages/onboarding/questionnaire'
import { useOnboarding } from '@/store/onboarding.store'
import { useNavigate } from 'react-router-dom'

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

  const setSubmission = useOnboarding((state) => state.setSubmission)

  const setSorting = (field: keyof TSubmission) => {
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
        deleteSubmission(Submission.uuid)
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
      <td>
        <Group spacing="sm">
          {/* <Avatar
            size={26}
            src={`https://gokv9osl.directus.app/assets/${row?.profile_image}/${row?.first_name}.png?access_token=Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE`}
            radius={26}
          /> */}
          <Text size="sm" weight={500}>
            {row?.client_id}
          </Text>
        </Group>
      </td>
      <td>{row?.vendor_id}</td>
      <td>{row?.employee_id}</td>
      <td>{row?.submission_status}</td>
      <td>{row?.remarks}</td>
      <td>
        {row.submission_status === 'Rejected' ? (
          <Badge color="red">Rejected</Badge>
        ) : row.submission_status === 'On Hold' ? (
          <Badge color="yellow">On Hold</Badge>
        ) : row.submission_status === 'Selected' ? (
          <Badge
            color="blue"
            onClick={() => {
              // setPopUpIsOpen(true)
              setSubmission(row)
              // navigate to onboarding screen
              console.log('submission =', row)
              navigate(
                `/onboarding?client_id=${row.client_id}&vendor_id=${row.vendor_id}&employee_id=${row.employee_id}`
              )
            }}
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
      <ScrollArea>
        <div className={classes.tableHead}>
          <Group spacing="sm">
            <Text size={'xl'} weight="600" className={classes.text}>
              Submissions
            </Text>
            <IconFilter className={classes.filterIcon} cursor="pointer" />
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
          <Button>
            <Group spacing="sm" align="center" onClick={() => setOpened(true)}>
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
                sorted={sortBy === 'client_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('client_id')}
              >
                Client Id
              </Th>
              <Th
                sorted={sortBy === 'vendor_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('vendor_id')}
              >
                Vendor Id
              </Th>
              <Th
                sorted={sortBy === 'employee_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('employee_id')}
              >
                Employee Id
              </Th>
              <Th
                sorted={sortBy === 'submission_status'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('submission_status')}
              >
                Submission Status
              </Th>
              <Th
                sorted={sortBy === 'remarks'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('remarks')}
              >
                Remarks
              </Th>
              <th className={classes.action}>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0] || {}).length}>
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

      {/* Add New - employee Form Drawer*/}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Submission"
        padding="xl"
        size="xl"
        position="right"
      >
        <CreateForm />
      </Drawer>

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
