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
  Drawer,
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
} from '@tabler/icons'
import { TContacts } from '@/types'
import { openConfirmModal } from '@mantine/modals'
import CreateContact from '@/components/form/client/contact/createForm'
import EditContact from '@/components/form/client/contact/editForm'
import { showNotification } from '@mantine/notifications'
import useDeleteContactById from '../../hooks/useDeleteContactById'
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
    paddingTop: '0px',
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
  contactIcon: {
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
    width: '100%',
    maxWidth: '98.3%',
  },
  iconPlus: {
    color: theme.colors.blue[6],
    backgroundColor: theme.colors.blue[1],
    borderRadius: '5px',
    cursor: 'pointer',
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

// Utility Function - filter Data
function filterData(data: TContacts[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - short Data
function sortData(
  data: TContacts[],
  payload: {
    sortBy: keyof TContacts | null
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
        return String(b[sortBy]).localeCompare(String(a[sortBy]))
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]))
    }),
    payload.search
  )
}

interface ContactProps {
  data: TContacts[]
}

// Exporting Default ClientTable Component

export default function ContactsTable({ data }: ContactProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [contactEditData, setContactEditData] = useState({} as TContacts)
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TContacts | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const setSorting = (field: keyof TContacts) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }
  const { mutate: deleteContact } = useDeleteContactById()

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
  //   contact data Delete handler model
  const openModalForDelete = (contact: TContacts) => {
    openConfirmModal({
      title: 'Do You want to delete this contact?',
      children: (
        <Text size="sm">
          After deleting a contacts, You cannot recover them back. So, Please
          take your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteContact(contact?.uuid)
        showNotification({
          title: 'Contact Deleted !!',
          message: `Contact has been deleted successfully.`,
        })
      },
    })
  }

  const rows = sortedData?.map((row) => (
    <tr key={row?.id} className={classes.companyDetails}>
      <td>
        <Group spacing="sm">
          <Text size="sm" weight={500}>
            {row?.fname} {row?.lname}
          </Text>
        </Group>
      </td>
      <td>{row?.email1}</td>
      <td>{row?.phone1}</td>
      <td>
        <Group spacing="sm">
          <IconEdit
            className={classes.editIcon}
            cursor="pointer"
            onClick={() => {
              setIsOpened(true)
              setContactEditData(row)
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
        title="Contacts"
        createDrawerSize={'xl'}
        createDrawerTitle="Add New Contact"
        isError={false}
        isLoading={false}
        createDrawerChildren={<CreateContact />}
        onSearchChange={handleSearchChange}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          // className={classes.childTable}
          style={{ width: '32%' }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'fname'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('lname')}
              >
                <b>Name</b>
              </Th>
              <Th
                sorted={sortBy === 'email1'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email1')}
              >
                <b>Email</b>
              </Th>
              <Th
                sorted={sortBy === 'phone1'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('phone1')}
              >
                <b>Phone</b>
              </Th>
              <th className={classes.action}>
                <b>Action</b>
              </th>
            </tr>
          </thead>
          {/* T-Body */}
          <tbody>
            {rows ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data).length}>
                  <Text weight={500} align="center">
                    No records found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ListViewLayout>

      {/* Edit Contact - Contact Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Contact"
        padding="xl"
        size="xl"
        position="right"
      >
        <EditContact {...contactEditData} />
      </Drawer>
    </>
  )
}
