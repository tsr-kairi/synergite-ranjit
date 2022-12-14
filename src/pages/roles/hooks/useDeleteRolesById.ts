import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteRolesById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/role/${uuid}`)
}

const useDeleteRolesById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteRolesById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(rolesQueryKeys.rolesDetails)
      console.log('Delete Roles Called')
    },
  })
}

export default useDeleteRolesById
