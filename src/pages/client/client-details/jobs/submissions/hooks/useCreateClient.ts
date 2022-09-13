import { submissionQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TSubmissionCreate, TSubmissionFindById } from '@/types/submission-type'
import { useMutation, useQueryClient } from 'react-query'

const createSubmission = async (
  submission: TSubmissionCreate
): Promise<TSubmissionFindById> => {
  return await apiClient.post('/submissions', submission)
}

const useCreateSubmission = () => {
  const queryClient = useQueryClient()

  return useMutation(createSubmission, {
    onSuccess: () => {
      void queryClient.resetQueries(submissionQueryKeys.allSubmission)
      console.log('Create Client Called')
    },
  })
}

export default useCreateSubmission
