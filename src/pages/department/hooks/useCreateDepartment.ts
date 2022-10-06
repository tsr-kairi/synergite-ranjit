import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentCreate, TDepartmentFindById } from '@/types/department-type'
import { useMutation, useQueryClient } from 'react-query'

const createDepartment = async (
  activity: TDepartmentCreate
): Promise<TDepartmentFindById> => {
  return await axiosPrivate.post('/default/activity', activity)
}

const useCreateDepartment = () => {
  const queryClient = useQueryClient()

  return useMutation(createDepartment, {
    onSuccess: () => {
      void queryClient.resetQueries(departmentQueryKeys.allDepartment)
    },
  })
}

export default useCreateDepartment
