import { useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  Button,
  Drawer,
  Pagination,
  Checkbox,
  Popover,
  Loader,
  ActionIcon,
} from '@mantine/core'
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconColumns,
  IconGripVertical,
} from '@tabler/icons'
import AdjustableColumn from '../adjustable-column/adjustable-column-list'
import theme from '@/theme/theme'

interface IListViewLayoutProps {
  title: string
  children?: React.ReactNode
  createDrawerTitle?: string
  createDrawerChildren?: React.ReactNode
  createDrawerSize?: string | number
  editDrawerChildren?: React.ReactNode
  hideActionButton?: boolean
  hideColumnButton?: boolean
  isError: boolean
  isLoading: boolean
  onFilterClick?: () => void
  onSearchChange?: (searchTerm: string) => void
  onColumnClick?: () => void
  onAddNewClick?: () => void
  onPageChange?: (pageNumber: number) => void
}

export const ListViewLayout: React.FC<IListViewLayoutProps> = (props) => {
  const {
    title,
    children,
    createDrawerTitle,
    createDrawerChildren,
    createDrawerSize,
    editDrawerChildren,
    hideActionButton,
    hideColumnButton,
    isError,
    isLoading,
    onFilterClick,
    onSearchChange,
    onColumnClick,
    onAddNewClick,
    onPageChange,
  } = props

  const [isColumnSelectionDrawerOpen, setIsColumnSelectionDrawerOpen] =
    useState(false)
  const [isAddNewDrawerOpen, setIsAddNewDrawerOpen] = useState(false)
  const [isEditDrawerOpen, setIsEditNewDrawerOpen] = useState(false)
  const { classes } = listViewLayoutStyle()

  if (isError) {
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return <Loader variant="dots" />
  }

  // Returning the Scroll Area of Table
  return (
    <>
      <div className={classes.tableHead}>
        <Group spacing="sm">
          <Text size={'xl'} weight="600" className={classes.text}>
            {title}
          </Text>
          <IconFilter
            className={classes.filterIcon}
            onClick={onFilterClick}
            style={{ cursor: onFilterClick ? 'pointer' : 'default' }}
          />
        </Group>

        <TextInput
          placeholder="Search by any field"
          icon={<IconSearch size={14} stroke={1.5} />}
          onChange={({ target }) => {
            if (onSearchChange) {
              onSearchChange(target.value)
            }
          }}
          radius="xl"
          className={classes.searchField}
        />

        {!hideColumnButton && (
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon variant="light" radius="xl" color={'blue'}>
                <IconColumns size={26} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <AdjustableColumn />
            </Popover.Dropdown>
          </Popover>
        )}

        {/* Add New - Button*/}
        {!hideActionButton && (
          <ActionIcon
            variant="light"
            radius="xl"
            color={'blue'}
            // className={classes.actionButton}
            onClick={() => {
              if (onAddNewClick) {
                onAddNewClick()
              } else {
                setIsAddNewDrawerOpen(true)
              }
            }}
          >
            <IconPlus size={30} />
          </ActionIcon>
        )}
      </div>

      <ScrollArea
        // scroll area style
        style={{ height: 600, width: 1805 }}
        type="always"
        offsetScrollbars
        scrollbarSize={5}
        styles={(theme) => ({
          scrollbar: {
            '&, &:hover': {
              background:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },

            '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
              backgroundColor: theme.colors.blue[5],
            },

            '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
              backgroundColor: theme.colors.blue[6],
            },
          },

          corner: {
            opacity: 1,
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          className={classes.table}
        >
          {children}
        </Table>
      </ScrollArea>

      {/* Pagination */}
      <div className={classes.paginationContainer}>
        <Text color={'grey'}>Showing 1 to 20 of 110 entries</Text>
        <Pagination total={5} size="sm" onChange={onPageChange} />
      </div>

      {/* List of columns */}
      <Drawer
        opened={isColumnSelectionDrawerOpen}
        onClose={() => setIsColumnSelectionDrawerOpen(false)}
        title={createDrawerTitle}
        padding="xl"
        size="xl"
        position="right"
      >
        <AdjustableColumn />
      </Drawer>

      {/* Add New - Drawer */}
      <Drawer
        opened={isAddNewDrawerOpen}
        onClose={() => setIsAddNewDrawerOpen(false)}
        title={createDrawerTitle}
        padding="xl"
        size={createDrawerSize || 'xl'}
        position="right"
      >
        {createDrawerChildren}
      </Drawer>

      {/* Edit Drawer*/}
      <Drawer
        opened={isEditDrawerOpen}
        onClose={() => setIsEditNewDrawerOpen(false)}
        title="Edit Client"
        padding="xl"
        size="xl"
        position="right"
      >
        {editDrawerChildren}
      </Drawer>
    </>
  )
} // End of ListViewLayout

// Style for the Page
export const listViewLayoutStyle = createStyles((theme) => ({
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
  actionButton: {
    borderRadius: '100%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#04334c',
    '&:hover': {
      backgroundColor: theme.fn.darken('#04334c', 0.05),
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

  paginationContainer: {
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
  table: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '3px',
    // width: '100%',
    // minWidth: '150%',
    // overflowX: 'auto',
    // scrollbarWidth: 'none',
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))
