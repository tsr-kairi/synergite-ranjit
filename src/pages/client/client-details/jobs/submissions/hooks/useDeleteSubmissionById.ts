import { submissionQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteSubmissionById = async (id: number): Promise<void> => {
  await apiClient.delete(`/submissions/${id}`)
}

const useDeleteSubmissionById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => deleteSubmissionById(id), {
    onSuccess: () => {
      void queryClient.resetQueries(submissionQueryKeys.allSubmission)
      console.log('Delete Submission Called')
    },
  })
}

export default useDeleteSubmissionById
