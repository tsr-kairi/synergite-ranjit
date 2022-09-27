import { useState } from 'react'
import {
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  Button,
  Drawer,
  Pagination,
} from '@mantine/core'
import {
  IconSearch,
  IconFilter,
  IconPlus,
} from '@tabler/icons'

import { showNotification } from '@mantine/notifications'

interface IListViewLayoutProps {
  title: string
  children?: React.ReactNode
  createDrawerChildren?: React.ReactNode
  editDrawerChildren?: React.ReactNode
}

export const ListViewLayout: React.FC<IListViewLayoutProps> = (props) => {
  const { title, children, createDrawerChildren, editDrawerChildren } = props

  const [isAddNewDrawerOpen, setIsAddNewDrawerOpen] = useState(false)
  const [isEditDrawerOpen, setIsEditNewDrawerOpen] = useState(false)

  // Returning the Scroll Area of Table
  return (
    <>
      <ScrollArea>
        <div className="flex p-3 items-center justify-between gap-8">
          <Group spacing="sm">
            <Text size={'xl'} weight="600">
              {title}
            </Text>
            <IconFilter />
          </Group>
          <TextInput
            placeholder="Search by any field"
            icon={<IconSearch size={14} stroke={1.5} />}
            // value={search}
            // onChange={handleSearchChange}
            radius="xl"
            className="flex-1"
          />
          {/* Add New - Button*/}
          <Button
            className="bg-blue-800"
            onClick={() => setIsAddNewDrawerOpen(true)}
          >
            <Group spacing="sm" align="center">
              <IconPlus color="white" />
              <Text weight={400}>Add New</Text>
            </Group>
          </Button>
        </div>

        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          className="shadow-lg bg-white rounded-lg m-3 max-w-[98.8%]"
        >
          {children}
        </Table>

        <div className="w-full p-3 flex items-center justify-between">
          <Text color={'grey'}>Showing 1 to 20 of 110 entries</Text>
          <Pagination total={5} size="sm" />
        </div>
      </ScrollArea>

      {/* Add New - Drawer */}
      <Drawer
        opened={isAddNewDrawerOpen}
        onClose={() => setIsAddNewDrawerOpen(false)}
        title="Add New Client"
        padding="xl"
        size="xl"
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
}
