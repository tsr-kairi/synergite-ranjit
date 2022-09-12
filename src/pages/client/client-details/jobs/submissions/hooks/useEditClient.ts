import { submissionQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TSubmission, TSubmissionFindById } from '@/types/submission-type'
import { useMutation, useQueryClient } from 'react-query'

const editSubmission = async (
  data: TSubmission
): Promise<TSubmissionFindById> => {
  return await apiClient.patch(`/submissions/${data.id}`, data)
}

const useEditSubmission = () => {
  const queryClient = useQueryClient()

  return useMutation(editSubmission, {
    onSuccess: () => {
      void queryClient.resetQueries(submissionQueryKeys.allSubmission)
      console.log('Client Edited')
    },
  })
}

export default useEditSubmission
