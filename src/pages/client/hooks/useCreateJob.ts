import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TJobCreate, TJobsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createJob = (data: TJobCreate): Promise<TJobsFindById> => {
  // return apiClient.post('/jobs', data)
  // return apiClient.post('/contacts').then((response) => response.data.data)
  return axiosPrivate.post('/jobs', data)
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
