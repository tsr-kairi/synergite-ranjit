import { ListViewLayout } from '@/components/layout/list-view.layout'
import { onboardingStatusList } from '@/data/onboarding-status.data'
import { Th } from '@/pages/employee/employee-list'
import { getOnboardingList } from '@/services/onboarding.services'
import theme from '@/theme/theme'
import { TOnboardingStatus } from '@/types/onboarding-flow-type'
import { getQueryStringFromObject } from '@/utils/query-string.utils'
import {
  Badge,
  Button,
  createStyles,
  Drawer,
  Group,
  Paper,
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

const useStyles = createStyles((theme) => ({
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
}))

const OnboardingList = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [selectedOnboardingId, setSelectedOnboardingId] = useState('')
  const [selectedActivityUUID, setSelectedActivityUUID] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { classes, cx } = useStyles()

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
          <thead className={cx(classes.header)}>
            <tr>
              <Th onSort={() => null}>
                <b>Name</b>
              </Th>
              <Th onSort={() => null}>
                <b>Percent</b>
              </Th>
              <Th onSort={() => null}>
                <b>Status</b>
              </Th>
              <th>
                <b>Action</b>
              </th>
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
          console.log('closing')
        }}
        title="Activity"
        padding="xl"
        size="620px"
        position="right"
      >
        <Paper
          style={{
            boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
            padding: '10px',
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
            <OnboardingTasks
              key={selectedOnboardingId}
              activityId={selectedActivityUUID}
            />
          )}
        </Paper>
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
