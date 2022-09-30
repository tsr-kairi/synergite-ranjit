import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TActivityFindById } from '@/types/activity-type'
import { useQuery } from 'react-query'

const findDefaultActivityById = async (activityId: number) => {
  const response = await axiosPrivate.get<TActivityFindById>(
    `/default/activity/activity_id/${activityId}`
  )
  return response.data
}

const useGetDefaultActivityById = (activityId: number) => {
  return useQuery<TActivityFindById, Error>(
    [defaultActivityQueryKeys.defaultActivityDetails, activityId],
    async () => await findDefaultActivityById(activityId),
    {
      onSuccess: () => console.log('GetAllActivityById On Success Called'),
    }
  )
}

export default useGetDefaultActivityById
