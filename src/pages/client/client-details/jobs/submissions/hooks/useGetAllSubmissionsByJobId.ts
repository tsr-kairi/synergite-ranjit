import { submissionQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TSubmission } from '@/types/submission-type'
import { useQuery } from 'react-query'

interface TSubmissionApi {
  data: TSubmission[]
}

const findAllSubmissions = async () => {
  const response = await axiosPrivate.get<TSubmissionApi>(`/submission/get`)
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

//
// import { submissionQueryKeys } from '@/react-query/queryKeys'
// import axiosPrivate from '@/services/axiosPrivate'
// import { TSubmission } from '@/types/submission-type'
// import { useQuery } from 'react-query'

// interface TSubmissionApi {
//   data: TSubmission[]
// }

// const findAllSubmissions = async (client_id: string, job_id: string) => {
//   const response = await axiosPrivate.get<TSubmissionApi>(
//     `submission/get/client/jobs?client_id=${client_id}&job_id=${job_id}`
//   )
//   return response.data
// }

// const useGetAllSubmissionsByJobId = (client_id: string, job_id: string) => {
//   return useQuery<TSubmissionApi, Error>(
//     [submissionQueryKeys.getAllSubmissionByJobId, client_id, job_id],
//     async () => await findAllSubmissions(client_id, job_id),
//     {
//       onSuccess: () => console.log('GetAllSubmissions On Success Called'),
//     }
//   )
// }

// export default useGetAllSubmissionsByJobId
