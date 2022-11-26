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
  Radio,
  Drawer,
  ActionIcon,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
  IconEdit,
} from '@tabler/icons'
import { TVendor } from '@/types'
import CreateForm from '../../vendor/createForm'
import EditForm from '../../vendor/editForm'

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

  employeeRowData: {
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
  reversed?: boolean
  sorted?: boolean
  onSort(): void
}
// Table Heading Component
export function Th({ children, reversed, sorted, onSort }: ThProps) {
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
function filterData(data: TVendor[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TVendor[],
  payload: {
    sortBy: keyof TVendor | null
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

interface IVendorProps {
  selectedVendor?: TVendor
  data: TVendor[]
  setVendor: (value: TVendor) => void
}

// Exporting Default VendorTable Component
export function VendorId({ selectedVendor, data, setVendor }: IVendorProps) {
  const { classes } = useStyles()
  const [isAddNewDrawerOpen, setIsAddNewDrawerOpen] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [vendorEditData, setVendorEditData] = useState({} as TVendor)
  const [search, setSearch] = useState('')
  const [vendorData, setVendorDataMain] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TVendor | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof TVendor) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setVendorDataMain(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setVendorDataMain(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  // Create Rows
  const rows = vendorData?.map((item) => (
    <tr key={item.uuid}>
      <td>
        <Radio
          value={item.uuid}
          onClick={() => setVendor(item)}
          checked={selectedVendor?.uuid === item.uuid}
          label={`${item?.first_name || ''} ${item?.last_name || ''}`}
        />
      </td>
      {/* <td>
        {item ? (
          <Text size="sm" weight={500}>
            {item.first_name} {item.last_name}
          </Text>
        ) : (
          <Text size="sm" weight={500}>
            NA
          </Text>
        )}
      </td> */}
      <td>
        <IconEdit
          className={classes.editIcon}
          cursor="pointer"
          onClick={() => {
            setIsOpened(true)
            setVendorEditData(item)
          }}
        />
      </td>
    </tr>
  ))

  // Returning the Scroll Area of Table
  return (
    <>
      <ScrollArea>
        <div className={classes.tableHead}>
          <TextInput
            placeholder="Search by any field"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            radius="xl"
            className={classes.searchField}
          />
          <ActionIcon
            variant="light"
            radius="xl"
            color={'blue'}
            onClick={() => {
              setIsAddNewDrawerOpen(true)
            }}
          >
            <IconPlus size={30} />
          </ActionIcon>
        </div>
        <div>
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            className={classes.childTable}
          >
            <thead>
              <tr>
                {/* <th>
                  <IconCircleCheck
                    style={{
                      marginTop: '10px',
                    }}
                  />
                </th> */}
                <Th
                  sorted={sortBy === 'uuid'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('uuid')}
                >
                  Vendor Name
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
                      No Vendor found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        {/* Add New - Drawer */}
        <Drawer
          opened={isAddNewDrawerOpen}
          onClose={() => setIsAddNewDrawerOpen(false)}
          title="Add New Vendor"
          padding="xl"
          size={'1200px'}
          position="right"
        >
          <CreateForm />
        </Drawer>

        {/* Edit Vendor - Vendor Edit Form Drawer*/}
        <Drawer
          opened={isOpened}
          onClose={() => setIsOpened(false)}
          title="Edit Vendor"
          padding="xl"
          size="1200px"
          position="right"
        >
          <EditForm {...vendorEditData} />
        </Drawer>
      </ScrollArea>
    </>
  )
}
