import { vendorQueryKeys } from '@/react-query/queryKeys'
import VendorService from '@/services/vendorService'
import { TTasks, IFindTasksByActivityId } from '@/types/activity-type'
import { Loader } from '@mantine/core'
import { useState } from 'react'
import { useQuery } from 'react-query'
import TasksTable from './tasksTable'

const Tasks = () => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const id = params.get('id')

  const [TaskData, setTaskData] = useState<TTasks[]>([] as TTasks[])

  const { isError, error, isLoading } = useQuery<IFindTasksByActivityId, Error>(
    [vendorQueryKeys.contactList, id],
    async () => await VendorService.findTaskByActivityId(Number(id)),
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

  return <TasksTable data={TaskData} />
}

export default Tasks
