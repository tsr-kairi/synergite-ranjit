import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TRolesCreate, TRolesFindById } from '@/types/roles-type'
import { useMutation, useQueryClient } from 'react-query'

const createRoles = async (activity: TRolesCreate): Promise<TRolesFindById> => {
  return await axiosPrivate.post('/default/activity', activity)
}

const useCreateRoles = () => {
  const queryClient = useQueryClient()

  return useMutation(createRoles, {
    onSuccess: () => {
      void queryClient.resetQueries(rolesQueryKeys.allRoles)
    },
  })
}

export default useCreateRoles
