// import { permissionQueryKeys } from '@/react-query/queryKeys'
// import axiosPrivate from '@/services/axiosPrivate'
// import { TPermissionFindAll } from '@/types/permission-type'
// import { useQuery } from 'react-query'

// const findAllPermission = async () => {
//   const response = await axiosPrivate.get<TPermissionFindAll>('/permissions')
//   return response.data
// }

// const useGetAllPermission = () => {
//   return useQuery<TPermissionFindAll, Error>(
//     permissionQueryKeys.allPermission,
//     findAllPermission
//     // {
//     //   onSuccess: () => console.log('GetAllPermission On Success Called'),
//     // }
//   )
// }

// export default useGetAllPermission
