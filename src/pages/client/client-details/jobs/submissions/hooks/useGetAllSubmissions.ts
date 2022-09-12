import { submissionQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TSubmission } from '@/types/submission-type'
import { useQuery } from 'react-query'

interface TSubmissionApi {
  data: TSubmission[]
}

const findAllSubmissions = async () => {
  const response = await apiClient.get<TSubmissionApi>('/submissions')
  return response.data
}

const useGetAllSubmissions = () => {
  return useQuery<TSubmissionApi, Error>(
    submissionQueryKeys.allSubmission,
    findAllSubmissions,
    {
      onSuccess: () => console.log('GetAllSubmissions On Success Called'),
    }
  )
}

export default useGetAllSubmissions
