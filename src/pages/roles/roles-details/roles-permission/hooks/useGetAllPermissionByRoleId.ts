// import { permissionQueryKeys } from '@/react-query/queryKeys'
// import axiosPrivate from '@/services/axiosPrivate'
// import { TPermissionFindById } from '@/types/permission-type'
// import { useQuery } from 'react-query'

// const findPermissionFindById = async (rolesId: string) => {
//   const response = await axiosPrivate.get<TPermissionFindById>(
//     `/permissions/?role-uuid=${rolesId}`
//   )
//   console.log('responsePermission', response)
//   return response.data
// }

// const useGetPermissionFindById = (rolesId: string) => {
//   return useQuery<TPermissionFindById, Error>(
//     [permissionQueryKeys.permissionByID, rolesId],
//     async () => await findPermissionFindById(rolesId),
//     {
//       onSuccess: () =>
//         console.log('GetAllPermissionFindById On Success Called'),
//     }
//   )
// }

// export default useGetPermissionFindById
