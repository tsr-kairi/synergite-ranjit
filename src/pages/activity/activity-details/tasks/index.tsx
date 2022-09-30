import { Loader } from '@mantine/core'
import TasksTable from './tasksTable'
import { useParams } from 'react-router-dom'
import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TTaskFindById, TTasks } from '@/types/activity-type'
import { useQuery } from 'react-query'
import { useSetState } from '@mantine/hooks'

const Tasks = () => {
  const { activityId } = useParams()
  console.log('activityId', activityId)
  const [taskData, setTaskData] = useSetState<TTasks[]>([] as TTasks[])

  const findGetAllTaskByActivityId = async (idActivity: number) => {
    const response = await axiosPrivate.get<TTaskFindById>(
      `/default/task/${idActivity}`
    )
    return response.data
  }

  const { isError, error, isLoading } = useQuery<TTaskFindById, Error>(
    [defaultActivityQueryKeys.taskList, activityId],
    async () => await findGetAllTaskByActivityId(Number(activityId)),
    {
      onSuccess: (data) => {
        setTaskData(data.data)
      },
    }
  )
  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return <TasksTable data={taskData} />
}

export default Tasks
