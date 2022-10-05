import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteActivityById = async (
  onboardingActivityId: number
): Promise<void> => {
  await axiosPrivate.post(`/default/activity/delete/${onboardingActivityId}`)
}

const useDeleteActivityById = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (onboardingActivityId: number) =>
      deleteActivityById(onboardingActivityId),
    {
      onSuccess: () => {
        void queryClient.resetQueries(departmentQueryKeys.allDepartment)
      },
    }
  )
}

export default useDeleteActivityById
