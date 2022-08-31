import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteJobById = async (id: number): Promise<void> => {
  await apiClient.delete(`/jobs/${id}`)
}

const useDeleteJobById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => deleteJobById(id), {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.jobList)
      console.log('Delete Job Called')
    },
  })
}

export default useDeleteJobById
