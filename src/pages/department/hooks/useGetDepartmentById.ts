import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentFindById } from '@/types/department-type'
import { useQuery } from 'react-query'

const findDefaultActivityById = async (activityId: number) => {
  const response = await axiosPrivate.get<TDepartmentFindById>(
    `/default/activity/activity_id/${activityId}`
  )
  return response.data
}

const useGetDefaultActivityById = (activityId: number) => {
  return useQuery<TDepartmentFindById, Error>(
    [defaultActivityQueryKeys.defaultActivityDetails, activityId],
    async () => await findDefaultActivityById(activityId),
    {
      onSuccess: () => console.log('GetAllActivityById On Success Called'),
    }
  )
}

export default useGetDefaultActivityById
