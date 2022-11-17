import { jobQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TJobsFindAll } from '@/types'
import { useQuery } from 'react-query'

// const getJobs = async () => {
//   const response = await axiosPrivate.get<{ data: TJobs[] }>(
//     `${jobQueryKeys.jobs}`
//   )
//   return response.data.data
// } // End of getJobs

// const useFetchJob = () => {
//   return useQuery<TJobs[], Error>('jobQueryKeys.jobs', getJobs, {
//     onSuccess: () => console.log('GetAllJob On Success Called'),
//   })
// } // End of useFetchJob

// export default useFetchJob

const findAlJobs = async () => {
  const response = await axiosPrivate.get<TJobsFindAll>(`/jobs`)
  return response.data
}

const useGetAllJobs = () => {
  return useQuery<TJobsFindAll, Error>(jobQueryKeys.jobs, findAlJobs)
}

export default useGetAllJobs
