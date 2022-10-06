import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TRolesFindById } from '@/types/roles-type'
import { useQuery } from 'react-query'

const findRolesById = async (rolesId: number) => {
  const response = await axiosPrivate.get<TRolesFindById>(
    `/default/activity/activity_id/${rolesId}`
  )
  return response.data
}

const useGetRolesById = (rolesId: number) => {
  return useQuery<TRolesFindById, Error>(
    [rolesQueryKeys.rolesDetails, rolesId],
    async () => await findRolesById(rolesId),
    {
      onSuccess: () => console.log('GetAllRolesById On Success Called'),
    }
  )
}

export default useGetRolesById
