import { useEffect, useState } from 'react'
import useGetAllCandidate from '@/pages/candidate/hooks/useGetAllCandidate'
import useGetAllRoles from '@/pages/roles/hooks/useGetAllRoles'
import { TRoles } from '@/types/roles-type'
import {
  createStyles,
  Loader,
  Paper,
  Radio,
  ScrollArea,
  Table,
  TextInput,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import { IconSearch } from '@tabler/icons'

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

function filterData(data: TRoles[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
} // End of filterData

interface RoleListProps {
  onRoleChange: (role: TRoles) => void
}

const RoleList: React.FC<RoleListProps> = ({ onRoleChange }) => {
  const { data: roleList, isError, isLoading } = useGetAllRoles()

  const [search, setSearch] = useState('')
  const [roles, setRoles] = useState(roleList?.data || [])

  useEffect(() => {
    if (roles.length <= 0) {
      setRoles(roleList?.data || [])
    }
  }, [roleList?.data])

  const { classes } = useStyles()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    if (!value) {
      setRoles(roleList?.data || [])
    } else {
      setRoles(filterData(roles, value))
    }
  } // End of handleSearchChange

  if (isError) {
    return <h1>An Error Occurred</h1>
  }

  if (!isLoading) {
    return (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        {/* <ScrollArea> */}
        <TextInput
          placeholder="Search by any field"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          radius="xl"
          className={classes.searchField}
          mb={8}
        />
        <div
          style={{ height: '80vh', overflowY: 'auto', paddingBottom: '40px' }}
        >
          {(roles || [])?.map((role) => {
            return (
              <Radio
                key={role.uuid}
                value={role.uuid}
                label={role.name}
                onChange={() => onRoleChange(role)}
                style={{ paddingTop: '8px', paddingBottom: '8px' }}
              />
            )
          })}
        </div>

        {/* </ScrollArea> */}
      </Paper>
    )
  } else if (isLoading) {
    return <Loader variant="dots" />
  } else {
    return <></>
  }
}

export default RoleList
