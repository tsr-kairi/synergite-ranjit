import { useState } from 'react'
import {
  createStyles,
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  Avatar,
  Drawer,
  Tooltip,
  Menu,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconTrash,
  IconDotsVertical,
  IconEdit,
} from '@tabler/icons'
import { TRoles } from '@/types/roles-type'
import { openConfirmModal } from '@mantine/modals'
import EditForm from '@/components/form/roles/editForm'
import { showNotification } from '@mantine/notifications'
import useDeleteRolesById from './hooks/useDeleteRolesById'
import { Link } from 'react-router-dom'
import { useAuth } from '@/store/auth.store'
import { getPermission, IPermissionOptions } from '@/utils/permission.utils'
import { ListViewLayout } from '@/components/layout/list-view.layout'
import CreateForm from '@/components/form/roles/createForm'

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

  rolesDetails: {
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
  user: {},
  userActive: {},
  menuItem: {
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
function filterData(data: TRoles[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TRoles[],
  payload: {
    sortBy: keyof TRoles | null
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

interface IRolesTableProps {
  data: TRoles[]
}

// Exporting Default RolesTable Component
export default function RolesTable({ data }: IRolesTableProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [rolesEditData, setRolesEditData] = useState({} as TRoles)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TRoles | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const { classes, cx } = useStyles()
  const { mutate: deleteRoles } = useDeleteRolesById()

  //  client permission
  const permissions = useAuth((state) => state.permissions)
  const permissionOptions = getPermission({
    pageName: 'roles',
    permissions,
  }).permissionOptions as IPermissionOptions

  const setSorting = (field: keyof TRoles) => {
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

  // activity data Delete handler
  const openModalForDelete = (roles: TRoles) => {
    openConfirmModal({
      title: 'Do You want to delete this roles?',
      children: (
        <Text size="sm">
          After deleting a roles, You cannot recover them back. So, Please take
          your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteRoles(roles.uuid)
        showNotification({
          title: 'Roles Deleted !!',
          message: `Roles has been deleted successfully.`,
        })
      },
    })
  }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.uuid} className={classes.rolesDetails}>
      {/* <td>{row?.role_uuid}</td> */}
      <td>
        <Menu
          width={200}
          // trigger="click"
          // closeOnClickOutside={true}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          exitTransitionDuration={200}
          offset={14}
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Tooltip
                label="Action"
                color="blue"
                withArrow
                transition="pop-top-right"
                transitionDuration={300}
              >
                <IconDotsVertical size={16} cursor="pointer" />
              </Tooltip>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Take your action carefully</Menu.Label>
            {permissionOptions.update && (
              <Menu.Item
                icon={
                  <IconEdit
                    size={14}
                    // stroke={1.5}
                    className={classes.editIcon}
                  />
                }
                className={classes.menuItem}
                onClick={() => {
                  setIsOpened(true)
                  setRolesEditData(row)
                }}
              >
                Edit Role
              </Menu.Item>
            )}
            {permissionOptions.delete && (
              <Menu.Item
                icon={
                  <IconTrash
                    size={14}
                    // stroke={1.5}
                    className={classes.deleteIcon}
                  />
                }
                className={classes.menuItem}
                onClick={() => openModalForDelete(row)}
              >
                Delete Role
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </td>
      <td>
        <Link to={`/roles-details/${row?.uuid}`} className={classes.userLink}>
          <Tooltip
            label="Click to view"
            color="blue"
            withArrow
            transition="pop-top-right"
            transitionDuration={300}
          >
            <Group spacing="sm">
              <Avatar color="cyan" radius={26} size={26}>
                R
              </Avatar>
              <Text size="sm" weight={500} color="blue">
                {row?.name}
              </Text>
            </Group>
          </Tooltip>
        </Link>
      </td>
      <td>{row?.department?.name}</td>
      {/* <td>
        <Group spacing="sm">
          <IconTrash
            className={classes.deleteIcon}
            cursor="pointer"
            onClick={() => openModalForDelete(row)}
          />
        </Group>
      </td> */}
    </tr>
  ))

  // Returning the Scroll Area of Table
  return (
    <>
      <ListViewLayout
        title="Roles"
        isError={false}
        isLoading={false}
        createDrawerTitle="Add Role"
        createDrawerChildren={<CreateForm />}
        onSearchChange={handleSearchChange}
        pageName="roles"
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          // className={classes.childTable}
        >
          <thead className={cx(classes.header)}>
            <tr>
              {(permissionOptions.update || permissionOptions.delete) && (
                <th className={classes.action}>
                  <b>Action</b>
                </th>
              )}
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                <b>Role Name</b>
              </Th>

              <Th
                sorted={sortBy === 'department_uuid'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('department_uuid')}
              >
                <b>Department</b>
              </Th>
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
      {/* Edit Vendor - Vendor Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Activity"
        padding="xl"
        size="xl"
        position="right"
      >
        <EditForm {...rolesEditData} />
      </Drawer>
    </>
  )
}
