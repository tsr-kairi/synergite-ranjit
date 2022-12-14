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
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from '@tabler/icons'
import { TProjectAllocation } from '@/types/project-allocation-type'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { ListViewLayout } from '@/components/layout/list-view.layout'
import { useAuth } from '@/store/auth.store'
import { getPermission, IPermissionOptions } from '@/utils/permission.utils'
import CreateForm from '@/components/form/project/projectAllocation/createForm'
import EditForm from '@/components/form/project/projectAllocation/editForm'
import useDeleteProjectAllocationById from './hooks/useDeleteProjectById'

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

  projectRowData: {
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

  detailHead: {
    // border: `1px solid ${theme.colors.blue[1]}`,
    // padding: '10px',
    // paddingLeft: '20px',
    // paddingRight: '20px',
    borderRadius: '5px',
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
function filterData(data: TProjectAllocation[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TProjectAllocation[],
  payload: {
    sortBy: keyof TProjectAllocation | null
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

interface IProjectAllocationProps {
  data: TProjectAllocation[]
}

// Exporting Default ClientTable Component
export function ProjectAllocationTable({ data }: IProjectAllocationProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TProjectAllocation | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes, cx } = useStyles()
  const { mutate: deleteProjectAllocation } = useDeleteProjectAllocationById()
  const [projectAllocationEditData, setProjectAllocationEditData] = useState(
    {} as TProjectAllocation
  )

  //  project permission
  const permissions = useAuth((state) => state.permissions)
  const permissionOptions = getPermission({
    pageName: 'project',
    permissions,
  }).permissionOptions as IPermissionOptions

  const setSorting = (field: keyof TProjectAllocation) => {
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

  // project data Delete handler
  const openModalForDelete = (ProjectAllocation: TProjectAllocation) => {
    openConfirmModal({
      title: 'Do You want to delete this ProjectAllocation?',
      children: (
        <Text size="sm">
          After deleting an active project, You cannot recover them back. So,
          please choose your action carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteProjectAllocation(ProjectAllocation.uuid)
        console.log('delete')
        showNotification({
          title: 'ProjectAllocation Deleted !!',
          // message: `${Employee.fname} has been deleted successfully.`,
          message: `ProjectAllocation has been deleted successfully.`,
        })
      },
    })
  }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.uuid} className={classes.projectRowData}>
      <td>{row?.uuid ? row?.uuid : 'N/A'}</td>
      <td>
        <Link to={`/project-details/${row?.uuid}`} className={classes.userLink}>
          <Tooltip
            label="Click to view"
            color="blue"
            withArrow
            transition="pop-top-right"
            transitionDuration={300}
          >
            <Group spacing="sm">
              <Avatar color="cyan" size={26} radius={26}>
                P
              </Avatar>

              <Text size="sm" weight={500}>
                {row?.user_id ? row?.user_id : 'N/A'}{' '}
              </Text>
            </Group>
          </Tooltip>
        </Link>
      </td>
      <td>{row?.project_id ? row?.project_id : 'N/A'}</td>
      <td>{row?.is_active_status ? row?.is_active_status : 'N/A'}</td>
      <td>{row?.start_date ? row?.start_date : 'N/A'}</td>
      <td>{row?.end_date ? row?.end_date : 'N/A'}</td>
      <td>{row?.project_mgr ? row?.project_mgr : 'N/A'}</td>
      <td>
        <Group spacing="sm">
          {/* {permissionOptions.update && ( */}
          <IconEdit
            className={classes.editIcon}
            cursor="pointer"
            onClick={() => {
              setIsOpened(true)
              setProjectAllocationEditData(row)
            }}
          />
          {/* )} */}
          {/* {permissionOptions.delete && ( */}
          <IconTrash
            className={classes.deleteIcon}
            cursor="pointer"
            onClick={() => openModalForDelete(row)}
          />
          {/* )} */}
        </Group>
      </td>
    </tr>
  ))

  // Returning the Scroll Area of Table
  return (
    <>
      <ListViewLayout
        title="Project Allocation"
        createDrawerSize={'xl'}
        createDrawerTitle="Add New Project Allocation"
        isError={false}
        isLoading={false}
        createDrawerChildren={<CreateForm />}
        onSearchChange={handleSearchChange}
        pageName="timesheet"
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          // className={classes.childTable}
        >
          <thead className={cx(classes.header)}>
            <tr>
              <Th
                sorted={sortBy === 'uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('uuid')}
              >
                <b>Uuid</b>
              </Th>
              <Th
                sorted={sortBy === 'user_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('user_id')}
              >
                <b>User Id</b>
              </Th>
              <Th
                sorted={sortBy === 'project_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('project_id')}
              >
                <b>Project Id</b>
              </Th>
              <Th
                sorted={sortBy === 'start_date'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('start_date')}
              >
                <b>Start Date</b>
              </Th>
              <Th
                sorted={sortBy === 'end_date'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('end_date')}
              >
                <b>End Date</b>
              </Th>
              <Th
                sorted={sortBy === 'project_mgr'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('project_mgr')}
              >
                <b>Project Mgr</b>
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
                <td colSpan={Object.keys(data || []).length}>
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
        title="Edit ProjectAllocation"
        padding="xl"
        size="1200px"
        position="right"
      >
        <EditForm {...projectAllocationEditData} />
      </Drawer>
    </>
  )
}
