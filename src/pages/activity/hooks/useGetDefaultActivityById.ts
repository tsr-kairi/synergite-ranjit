import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TActivityFindById } from '@/types/activity-type'
import { useQuery } from 'react-query'

const findDefaultActivityById = async (onboardingActivityId: number) => {
  const response = await axiosPrivate.get<TActivityFindById>(
    `/default/activity/${onboardingActivityId}`
  )
  return response.data
}

const useGetDefaultActivityById = (onboardingActivityId: number) => {
  return useQuery<TActivityFindById, Error>(
    [defaultActivityQueryKeys.defaultActivityDetails, onboardingActivityId],
    async () => await findDefaultActivityById(onboardingActivityId),
    {
      onSuccess: () => console.log('GetAllActivityById On Success Called'),
    }
  )
}

export default useGetDefaultActivityById
