import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteTaskById = async (id: number): Promise<void> => {
  await axiosPrivate.post(`/default/task/delete/${id}`)
}

const useDeleteTaskById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => deleteTaskById(id), {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.taskList)
    },
  })
}

export default useDeleteTaskById
