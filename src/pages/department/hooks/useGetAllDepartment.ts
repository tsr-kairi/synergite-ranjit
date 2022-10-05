import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentFindAll } from '@/types/department-type'
import { useQuery } from 'react-query'

const findAllDefaultActivity = async () => {
  const response = await axiosPrivate.get<TDepartmentFindAll>(
    '/default/activity'
  )
  return response.data
}

const useGetAllDefaultActivity = () => {
  return useQuery<TDepartmentFindAll, Error>(
    departmentQueryKeys.allDepartment,
    findAllDefaultActivity
  )
}

export default useGetAllDefaultActivity
