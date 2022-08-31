import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TJobs, TJobsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editJob = async (data: TJobs): Promise<TJobsFindById> => {
  return await apiClient.patch(`/jobs/${data.id}`, data)
}

const useEditJob = () => {
  const queryClient = useQueryClient()

  return useMutation(editJob, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.jobList)
      console.log('Job Edited')
    },
  })
}

export default useEditJob
