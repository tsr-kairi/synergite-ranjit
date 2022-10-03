import { ListViewLayout } from '@/components/layout/list-view.layout'
import { Th } from '@/pages/employee/employee-list'
import { getOnboardingList } from '@/services/onboarding.services'
import { Button, Drawer, Group, Table, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import NoteList from './notes/note-list'
import OnboardingActivitySidebar from './onboarding-activity'
import OnboardingTasks from './onboarding-tasks'
import SideModal from './side-modal'

const OnboardingList = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [selectedOnboardingId, setSelectedOnboardingId] = useState('')
  const [selectedActivityId, setSelectedActivityId] = useState('')

  const { data: onboardingList = [] } = useQuery(
    'onboarding-list',
    getOnboardingList
  )

  useEffect(() => {
    // getOnboardingList()
  }, [])

  return (
    <>
      <ListViewLayout title="Onboarding List" hideActionButton={true}>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          // className={classes.childTable}
          // sx={{ width: '100%', maxWidth: '90%', marginLeft: 0, marginRight: 0 }}
        >
          <thead>
            <tr>
              <Th onSort={() => null}>Onboarding Id</Th>
              <Th onSort={() => null}>Name</Th>
              <Th onSort={() => null}>Percent</Th>
              <Th onSort={() => null}>Status</Th>
              <th>Add Note</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {onboardingList?.map((onboarding) => {
              return (
                <tr key={onboarding.id}>
                  <td>{onboarding.id}</td>
                  <td>Onboarding {onboarding.id}</td>
                  <td>65%</td>
                  <td>{onboarding.onboard_status}</td>
                  <td onClick={() => setIsNoteOpen(true)}>Add Note</td>
                  <td
                    onClick={() => {
                      setIsActivityOpen(true)
                      setSelectedOnboardingId(onboarding.id)
                    }}
                  >
                    Action
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ListViewLayout>

      {/* Add New Note - Drawer */}
      <Drawer
        opened={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        title="Add Note"
        padding="xl"
        size="xl"
        position="right"
      >
        <div className="space-y-32">
          <NoteList />
          <Group mt={40} style={{ display: 'flex', alignItems: 'center' }}>
            <TextInput label="Note" placeholder="Write note" />
            <Button mt={24}>Submit</Button>
          </Group>
        </div>
      </Drawer>

      {/* Activity - Drawer */}
      <Drawer
        opened={isActivityOpen}
        onClose={() => {
          setIsActivityOpen(false)
          setSelectedOnboardingId('')
          setSelectedActivityId('')
        }}
        title="Activity"
        padding="xl"
        size="xl"
        position="right"
      >
        <OnboardingActivitySidebar
          onboardingId={selectedOnboardingId}
          onPressed={(activityId) => setSelectedActivityId(activityId)}
        />

        {selectedActivityId && (
          <OnboardingTasks activityId={selectedActivityId} />
        )}
      </Drawer>
    </>
  )
} // End of OnboardingList

export default OnboardingList

interface OnboardingTileProps {
  onAddNotePressed?: () => any
  onActionPressed?: () => any
}

const OnboardingTile: React.FC<OnboardingTileProps> = (props) => {
  const { onAddNotePressed, onActionPressed } = props

  return (
    <div className="border-2 flex justify-between items-center p-2">
      <div className="flex justify-between w-1/2">
        <span>Onboarding one</span>
        <span>68%</span>
        <span>Status</span>
      </div>
      <div className="space-x-2">
        <button onClick={onAddNotePressed} className="border p-2 min-w-[96px]">
          Add Note
        </button>
        <button onClick={onActionPressed} className="border p-2 min-w-[96px]">
          Action
        </button>
      </div>
    </div>
  )
} // End of OnboardingTile
