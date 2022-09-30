import { useEffect, useState } from 'react'

import {
  getActivitiesByOnboardingId,
  getTasksByActivityId,
  updateTaskStatusByTaskId,
} from '@/services/onboarding.services'
import { Button, Group, Switch } from '@mantine/core'
import { useQuery } from 'react-query'
import { ITaskResponse } from '../../../services/onboarding.services'
import { IconChevronsRight } from '@tabler/icons'

interface OnboardingTasks {
  activityId: string
}

const OnboardingTasks: React.FC<OnboardingTasks> = ({ activityId }) => {
  console.log('[OnboardingTasks] activityId =', activityId)
  // const { data } = useQuery(activityId, () => getTasksByActivityId(activityId))
  // console.log('data =', data)

  const [taskList, setTaskList] = useState<ITaskResponse[]>([])

  useEffect(() => {
    getTasksByActivityId(activityId)
      .then((data) => setTaskList(data || []))
      .catch((error) => console.log(error))
  }, [activityId])

  return (
    <div>
      {taskList?.map((task) => {
        const { id } = task
        return (
          <OnboardingTaskTile
            key={id}
            id={id}
            title={task.task_name}
            checked={task.is_complete === 'Y' ? true : false}
            onStatusChange={(status) => {
              updateTaskStatusByTaskId(id, status ? 'Y' : 'N').catch((error) =>
                console.log(error)
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

  return (
    <Group key={id} style={{ borderBottom: '1px gray solid' }} position="apart">
      <Group>
        <IconChevronsRight />
        <p>{title}</p>
      </Group>
      <Switch
        checked={isActive}
        onChange={() => {
          const updatedStatus = !isActive
          setIsActive(updatedStatus)
          onStatusChange(updatedStatus)
        }}
      />
    </Group>
  )
} // End of OnboardingTaskTile
