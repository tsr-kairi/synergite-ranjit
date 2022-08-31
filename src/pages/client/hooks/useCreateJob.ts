import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TJobCreate, TJobsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createJob = (data: TJobCreate): Promise<TJobsFindById> => {
  return apiClient.post('/jobs', data)
  // return apiClient.post('/contacts').then((response) => response.data.data)
}

const useCreateJob = () => {
  const queryClient = useQueryClient()

  return useMutation(createJob, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.jobList)
      console.log('Create Job Called')
    },
  })
}

export default useCreateJob
