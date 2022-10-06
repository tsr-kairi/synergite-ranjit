import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteRolesById = async (rolesId: number): Promise<void> => {
  await axiosPrivate.post(`/default/activity/delete/${rolesId}`)
}

const useDeleteRolesById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (rolesId: number) => deleteRolesById(rolesId), {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.allDefaultActivity)
    },
  })
}

export default useDeleteRolesById
