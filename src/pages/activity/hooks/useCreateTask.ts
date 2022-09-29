import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TTaskCreate, TTaskFindById } from '@/types/activity-type'
import { useMutation, useQueryClient } from 'react-query'

const createTask = (data: TTaskCreate): Promise<TTaskFindById> => {
  return axiosPrivate.post('/default/task', data)
}

const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation(createTask, {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.taskList)
    },
  })
}

export default useCreateTask
