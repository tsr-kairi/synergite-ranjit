import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteDepartmentById = async (
  onboardingActivityId: number
): Promise<void> => {
  await axiosPrivate.post(`/default/activity/delete/${onboardingActivityId}`)
}

const useDeleteDepartmentById = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (onboardingActivityId: number) =>
      deleteDepartmentById(onboardingActivityId),
    {
      onSuccess: () => {
        void queryClient.resetQueries(departmentQueryKeys.allDepartment)
      },
    }
  )
}

export default useDeleteDepartmentById
