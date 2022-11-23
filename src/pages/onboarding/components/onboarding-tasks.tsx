import { useState } from 'react'

import {
  getTasksByActivityId,
  updateTaskStatusByTaskId,
} from '@/services/onboarding.services'
import { Group, Loader, Paper, Switch, Text } from '@mantine/core'
import { useQuery } from 'react-query'
import { IconChevronsRight } from '@tabler/icons'
import { openConfirmModal } from '@mantine/modals'

interface OnboardingTasks {
  activityId: string
}

const OnboardingTasks: React.FC<OnboardingTasks> = ({ activityId }) => {
  console.log('activityId =', activityId)
  const { data, isLoading, isError } = useQuery(activityId, () =>
    getTasksByActivityId(activityId)
  )

  let element: React.ReactNode = <></>
  if (isError) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        Error Occurred
      </Paper>
    )
  } else if (!isLoading && !data) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        Task Not Found
      </Paper>
    )
  } else if (isLoading) {
    element = <Loader variant="dots" />
  }

  return (
    <div>
      {element}

      {data?.map((task) => {
        const { uuid } = task
        return (
          <OnboardingTaskTile
            key={uuid}
            id={uuid}
            title={task.task_name}
            checked={task.is_complete === 'Y' ? true : false}
            onStatusChange={(status) => {
              updateTaskStatusByTaskId(uuid, status ? 'Y' : 'N').catch(
                (error) => console.log(error)
              )
              return null
            }}
          />
        )
      })}
    </div>
  )
} // End of OnboardingTasks

export default OnboardingTasks

interface OnboardingTaskTileProps {
  id: string
  title: string
  checked: boolean
  onStatusChange: (status: boolean) => void
}

const OnboardingTaskTile: React.FC<OnboardingTaskTileProps> = (props) => {
  const { id, title, checked, onStatusChange } = props

  const [isActive, setIsActive] = useState<boolean>(checked)

  const onConfirmToggle = () => {
    if (checked === isActive) {
      openConfirmModal({
        // centered: false,
        title: 'Are you sure you want to update this?',
        labels: { confirm: 'Yes', cancel: 'No' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
          const updatedStatus = !isActive
          setIsActive(updatedStatus)
          onStatusChange(updatedStatus)
        },
      })
    }
  }

  return (
    <Group key={id} style={{ borderBottom: '1px gray solid' }} position="apart">
      <Group>
        <IconChevronsRight />
        <p>{title}</p>
      </Group>
      <Switch
        checked={isActive}
        // onChange={() => {
        //   const updatedStatus = !isActive
        //   setIsActive(updatedStatus)
        //   onStatusChange(updatedStatus)
        // }}
        onChange={() => {
          onConfirmToggle()
        }}
        style={{ cursor: 'pointer' }}
      />
    </Group>
  )
} // End of OnboardingTaskTile
