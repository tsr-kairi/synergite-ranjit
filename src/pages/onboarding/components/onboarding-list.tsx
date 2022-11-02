import { ListViewLayout } from '@/components/layout/list-view.layout'
import { onboardingStatusList } from '@/data/onboarding-status.data'
import useGetAllDepartment from '@/pages/department/hooks/useGetAllDepartment'
import { Th } from '@/pages/employee/employee-list'
import { getOnboardingList } from '@/services/onboarding.services'
import theme from '@/theme/theme'
import { TOnboarding, TOnboardingStatus } from '@/types/onboarding-flow-type'
import { getQueryStringFromObject } from '@/utils/query-string.utils'
import {
  Badge,
  Button,
  Drawer,
  Group,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { IconChevronRight, IconPlus } from '@tabler/icons'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import NoteList from './notes/note-list'
import OnboardingActivitySidebar from './onboarding-activity'
import OnboardingTasks from './onboarding-tasks'

const OnboardingList = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [selectedOnboardingId, setSelectedOnboardingId] = useState('')
  const [selectedActivityUUID, setSelectedActivityUUID] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: onboardingList } = useQuery(
    ['onboarding-list', searchTerm],
    () => getOnboardingList(searchTerm)
  )

  return (
    <>
      <ListViewLayout
        title="Onboarding List"
        hideActionButton={true}
        hideColumnButton={true}
        onSearchChange={setSearchTerm}
        isError={false}
        isLoading={false}
      >
        <Table horizontalSpacing="md" verticalSpacing="xs">
          <thead>
            <tr>
              <Th onSort={() => null}>Name</Th>
              <Th onSort={() => null}>Percent</Th>
              <Th onSort={() => null}>Status</Th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {onboardingList?.map((onboarding) => {
              const onboardingStatus =
                onboardingStatusList[
                  onboarding.onboard_status as TOnboardingStatus
                ]

              const isPreOnboardingStatus =
                onboarding.onboard_status === 'PRE_INITIATED' ||
                onboarding.onboard_status === 'PRE_INPROGRESS'

              const candidateName = `${onboarding.employee?.first_name || ''}
                ${onboarding.employee?.last_name || ''}`

              return (
                <tr key={onboarding.uuid}>
                  <td>
                    {isPreOnboardingStatus ? (
                      <Link
                        to={`/onboarding?${getQueryStringFromObject({
                          onboarding_uuid: onboarding.uuid,
                          completion_percentage:
                            onboarding.completion_percentage,

                          client_uuid: onboarding.client_uuid,
                          vendor_uuid: onboarding.vendor_uuid,
                          employee_uuid: onboarding.employee_uuid,
                          submission_uuid: onboarding.submission_uuid,
                        })}`}
                        style={{
                          textDecoration: 'none',
                          color: theme?.colors?.grey?.[9],
                        }}
                      >
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                        >
                          <Text size="sm" weight={500}>
                            {candidateName}
                          </Text>
                        </Tooltip>
                      </Link>
                    ) : (
                      candidateName
                    )}
                  </td>
                  <td>
                    {onboarding.completion_percentage
                      ? `${onboarding.completion_percentage}%`
                      : '0%'}
                  </td>
                  <td>
                    <Badge color={onboardingStatus.color.background}>
                      {onboardingStatus.label}
                    </Badge>
                  </td>
                  <td>
                    <IconPlus
                      style={{
                        cursor: 'pointer',
                        marginRight: '8px',
                      }}
                      onClick={() => setIsNoteOpen(true)}
                    />
                    <IconChevronRight
                      style={{
                        cursor: isPreOnboardingStatus
                          ? 'not-allowed'
                          : 'pointer',
                        opacity: isPreOnboardingStatus ? 0.2 : 1,
                      }}
                      onClick={() => {
                        setIsActivityOpen(true)
                        setSelectedOnboardingId(onboarding.uuid || '')
                      }}
                    />
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
          setSelectedActivityUUID('')
        }}
        title="Activity"
        padding="xl"
        size="600px"
        position="right"
      >
        <div
          style={{
            height: '90vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          <OnboardingActivitySidebar
            onboardingId={selectedOnboardingId}
            onDepartmentChange={() => setSelectedActivityUUID('')}
            onPressed={(activityId) => {
              setSelectedActivityUUID(activityId)
            }}
          />

          {selectedActivityUUID && (
            <OnboardingTasks activityId={selectedActivityUUID} />
          )}
        </div>
      </Drawer>
    </>
  )
} // End of OnboardingList

export default OnboardingList

interface OnboardingTileProps {
  onAddNotePressed?: () => any
  onActionPressed?: () => any
}

const OnboardingTileProps: React.FC<OnboardingTileProps> = (props) => {
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
