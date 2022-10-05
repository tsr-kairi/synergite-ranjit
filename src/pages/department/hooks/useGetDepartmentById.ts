import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentFindById } from '@/types/department-type'
import { useQuery } from 'react-query'

const findDefaultActivityById = async (departmentId: number) => {
  const response = await axiosPrivate.get<TDepartmentFindById>(
    `/default/activity/activity_id/${departmentId}`
  )
  return response.data
}

const useGetDefaultActivityById = (departmentId: number) => {
  return useQuery<TDepartmentFindById, Error>(
    [departmentQueryKeys.departmentDetails, departmentId],
    async () => await findDefaultActivityById(departmentId),
    {
      onSuccess: () => console.log('GetAllActivityById On Success Called'),
    }
  )
}

export default useGetDefaultActivityById
