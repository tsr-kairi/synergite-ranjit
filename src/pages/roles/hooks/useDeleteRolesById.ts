import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteRolesById = async (rolesId: string): Promise<void> => {
  await axiosPrivate.delete(`/role/${rolesId}`)
}

const useDeleteRolesById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (rolesId: string) => deleteRolesById(rolesId), {
    onSuccess: () => {
      void queryClient.resetQueries(rolesQueryKeys.allRoles)
      console.log('Delete Roles Called')
    },
  })
}

export default useDeleteRolesById
