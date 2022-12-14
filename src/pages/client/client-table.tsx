import { useState } from 'react'
import {
  createStyles,
  Table,
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
  ActionIcon,
  Highlight,
  Menu,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
  IconAddressBook,
  IconDotsVertical,
} from '@tabler/icons'
import { TClient } from '@/types'
import { openConfirmModal } from '@mantine/modals'
import { Link } from 'react-router-dom'
import useDeleteClientById from './hooks/useDeleteClientById'

import { showNotification } from '@mantine/notifications'
import EditClient from '@/components/form/client/editForm'
import Contacts from './client-details/contacts'
import { useOnboarding } from '@/store/onboarding.store'
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
function filterData(data: TClient[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TClient[],
  payload: {
    sortBy: keyof TClient | null
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

interface IClientTableProps {
  data: TClient[]
}

// Exporting Default ClientTable Component
export function ClientTable({ data }: IClientTableProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TClient | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes, cx } = useStyles()
  const { mutate: deleteClient } = useDeleteClientById()
  const [clientEditData, setClientEditData] = useState({} as TClient)

  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const setClient = useOnboarding((state) => state.setClient)

  //  client permission
  const permissions = useAuth((state) => state.permissions)
  const permissionOptions = getPermission({
    pageName: 'client',
    permissions,
  }).permissionOptions as IPermissionOptions

  const setSorting = (field: keyof TClient) => {
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

  // client data Delete handler
  const openModalForDelete = (client: TClient) => {
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
        deleteClient(client.uuid)
        showNotification({
          title: 'Client Deleted !!',
          message: `${client.first_name} has been deleted successfully.`,
        })
      },
    })
  }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.id} className={classes.companyDetails}>
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
                  setClientEditData(row)
                }}
              >
                Edit Client
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
                Delete Client
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </td>
      <td>
        <Link
          to={`/client-details/${row?.uuid}`}
          // state={{ user: row }}
          className={classes.userLink}
          onClick={() => setClient(row)}
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
                C
              </Avatar>
              <Text
                size="sm"
                weight={500}
                // style={{ backgroundColor: 'yellow' }}
                color="blue"
              >
                {row?.first_name ? row?.first_name : 'N/A'}{' '}
                {row?.last_name ? row?.last_name : 'N/A'}
              </Text>
            </Group>
          </Tooltip>
        </Link>
      </td>
      <td>{row?.primary_email ? row?.primary_email : 'N/A'}</td>
      <td>{row?.primary_phone ? row?.primary_phone : 'N/A'}</td>
      <td>{row?.city ? row?.city : 'N/A'}</td>
      <td>{row?.state ? row?.state : 'N/A'}</td>
      <td>{row?.country ? row?.country : 'N/A'}</td>
      <td>
        <IconAddressBook
          onClick={() => setOpened(true)}
          cursor="pointer"
          className={classes.editIcon}
        />
      </td>
      {/* <td>
        <Group spacing="sm">
          {permissionOptions.update && (
            <IconEdit
              className={classes.editIcon}
              cursor="pointer"
              onClick={() => {
                setIsOpened(true)
                setClientEditData(row)
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
      </td> */}
      {/* contact -contact open drawer*/}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        size="600px"
        position="right"
      >
        <Contacts client_id={row.uuid} />
      </Drawer>
    </tr>
  ))

  // Returning the Scroll Area of Table
  return (
    <>
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
              sorted={sortBy === 'first_name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('first_name')}
            >
              <b>Name</b>
            </Th>
            <Th
              sorted={sortBy === 'primary_email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('primary_email')}
            >
              <b>Email</b>
            </Th>
            <Th
              sorted={sortBy === 'primary_phone'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('primary_phone')}
            >
              <b>Phone</b>
            </Th>
            <Th
              sorted={sortBy === 'city'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('city')}
            >
              <b>City</b>
            </Th>
            <Th
              sorted={sortBy === 'state'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('state')}
            >
              <b>State</b>
            </Th>
            <Th
              sorted={sortBy === 'country'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('country')}
            >
              <b>Country</b>
            </Th>
            <th className={classes.action}>
              <b>Contact</b>
            </th>
            {/* {(permissionOptions.update || permissionOptions.delete) && (
              <th className={classes.action}>
                <b>Action</b>
              </th>
            )} */}
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

      {/* Edit Client - Client Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Client"
        padding="xl"
        size="1200px"
        position="right"
      >
        <EditClient {...clientEditData} />
      </Drawer>
    </>
  )
}
