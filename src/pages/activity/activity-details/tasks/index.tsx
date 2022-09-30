import { Loader } from '@mantine/core'
import TasksTable from './tasksTable'
import { useParams } from 'react-router-dom'
import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TTaskFindById } from '@/types/activity-type'
import { useQuery } from 'react-query'

const Tasks = () => {
  const { activityId } = useParams()

  const findGetAllTaskByActivityId = async (idActivity: number) => {
    const response = await axiosPrivate.get<TTaskFindById>(
      `/default/task/${idActivity}`
    )

    return response.data
  }

  const { data, isError, error, isLoading } = useQuery<TTaskFindById, Error>(
    [defaultActivityQueryKeys.taskList, activityId],
    async () =>
      await findGetAllTaskByActivityId(
        parseInt(activityId ? activityId : '', 10)
      )
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

  if (data) {
    return <TasksTable data={data?.data} />
  } else {
    return <div>Error getting tasklist</div>
  }
}

export default Tasks
