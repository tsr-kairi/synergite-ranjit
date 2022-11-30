import { permissionQueryKeys } from '@/react-query/queryKeys'
import ClientService from '@/services/clientService'
import { IFindPermissionByRoleId, TPermission } from '@/types/permission-type'
import { Loader } from '@mantine/core'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import RolesPermission from './roles-permission'

const PermissionManager = () => {
  const { rolesId } = useParams()
  //   console.log('Role Uuid', rolesId)

  //   const { data, isError, error, isLoading } = useGetPermissionFindById(
  //     String(rolesId)
  //   )

  //   if (isError) {
  //     console.log(error)
  //     return <h1>An Error Occurred</h1>
  //   }

  //   if (!isLoading) {
  //     return <RolesPermission data={data?.data ? data.data : []} />
  //   } else if (isLoading) {
  //     return <Loader variant="dots" />
  //   } else {
  //     return <></>
  //   }

  const [permissionData, setPermissionData] = useState<TPermission>(
    {} as TPermission
  )

  const { isError, error, isLoading } = useQuery<
    IFindPermissionByRoleId,
    Error
  >(
    [permissionQueryKeys.allPermission, rolesId],
    async () => await ClientService.findPermissionFindById(String(rolesId)),
    {
      onSuccess: (data) => {
        setPermissionData(data.data)
      },
    }
  )

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return <RolesPermission data={permissionData} />
}

export default PermissionManager
// data={data?.data ? data.data : []}
