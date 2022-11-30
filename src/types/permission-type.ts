import { z } from 'zod'

const zRolePermission = z.object({
  description: z.string(),
  uuid: z.string(),
})

const zAvailablePermission = z.object({
  description: z.string(),
  uuid: z.string(),
})

// Permission List Data
const zPermission = z.object({
  role_permission: z.array(zRolePermission),
  available_permissions: z.array(zAvailablePermission),
})

// new Permission save
const zPermissionCreate = z.object({
  newAvailablePermissions: z.array(z.string()),
  newRolePermissions: z.array(z.string()),
  roleUuid: z.string(),
})

type TPermissionCreate = z.infer<typeof zPermissionCreate>
type TPermission = z.infer<typeof zPermission>

// Permission T - interface define
interface TPermissionFindAll {
  data: TPermission[]
}

// interface TPermissionCreateResponse {
//   data: TPermission
// }

interface TPermissionFindById {
  data: TPermission[]
  message: string
  ok: boolean
}

interface IFindPermissionByRoleId {
  data: TPermission
}

// export types

export type {
  TPermission,
  TPermissionFindAll,
  TPermissionFindById,
  IFindPermissionByRoleId,
  TPermissionCreate,
}

// export ZOD
export { zPermissionCreate }
