import { permissionQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TPermissionCreate, TPermissionFindById } from '@/types/permission-type'
import { useMutation, useQueryClient } from 'react-query'

const savePermission = async (
  permission: TPermissionCreate
): Promise<TPermissionFindById> => {
  return await axiosPrivate.post(
    '/permissions/update-role-permissions',
    permission
  )
}

const useSavePermission = () => {
  const queryClient = useQueryClient()

  return useMutation(savePermission, {
    onSuccess: () => {
      void queryClient.resetQueries(permissionQueryKeys.allPermission)
      console.log('Create Permission Called')
    },
  })
}

export default useSavePermission
