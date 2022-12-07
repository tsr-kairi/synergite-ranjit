export interface IPermissionOptions {
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

type IPagePermissionOptions = 'read' | 'create' | 'update' | 'delete' | '*'

export interface IAllPagePermissionOptions {
  [key: string]: IPermissionOptions
}

export interface IAllPagePermissionOptionsWithAllowedCheck {
  [key: string]: {
    permission: IPermissionOptions
    amIEvenAllowedToNavigateToThisPage: boolean
  }
}

const parsePermission = (pagePermissionOption: IPagePermissionOptions) => {
  switch (pagePermissionOption) {
    case 'read':
      return { read: true }
    case 'create':
      return { create: true }
    case 'update':
      return { update: true }
    case 'delete':
      return { delete: true }
    case '*':
      return {
        read: true,
        create: true,
        update: true,
        delete: true,
      }
  }
} // End of parsePermission

export const getPermission = (payload: {
  pageName: string
  permissions: string[]
  getAllPermissions?: boolean
}) => {
  const { pageName, permissions, getAllPermissions } = payload

  let permissionOptions = {
    read: false,
    create: false,
    update: false,
    delete: false,
  }

  const allPagePermissionOptions: IAllPagePermissionOptions = {}

  for (const permission of permissions) {
    const [page, pagePermissionOption] = permission
      .toLocaleLowerCase()
      .split(':')

    if (getAllPermissions) {
      // This permission exist
      if (allPagePermissionOptions[page]) {
        const parsedPermission = parsePermission(
          pagePermissionOption as IPagePermissionOptions
        )

        allPagePermissionOptions[page] = {
          ...allPagePermissionOptions[page],
          ...parsedPermission,
        }
      } else {
        const parsedPermission = parsePermission(
          pagePermissionOption as IPagePermissionOptions
        )

        allPagePermissionOptions[page] = {
          read: false,
          create: false,
          update: false,
          delete: false,
          ...parsedPermission,
        }
      }
    } else if (!getAllPermissions && page === pageName.toLocaleLowerCase()) {
      const parsedPermission = parsePermission(
        pagePermissionOption as IPagePermissionOptions
      )

      permissionOptions = {
        ...permissionOptions,
        ...parsedPermission,
      }
    }
  } // End of for loop

  const amIEvenAllowedToNavigateToThisPageHandler = (
    permissionOptions: IPermissionOptions
  ) => {
    if (
      !permissionOptions.read &&
      !permissionOptions.create &&
      !permissionOptions.update &&
      !permissionOptions.delete
    ) {
      return false
    }

    return true
  } // End of amIEvenAllowedToNavigateToThisPageHandler

  if (getAllPermissions) {
    const allPagePermissionOptionsWithAllowedCheck: IAllPagePermissionOptionsWithAllowedCheck =
      {}

    for (const page in allPagePermissionOptions) {
      const permissionOptions = allPagePermissionOptions[page]

      allPagePermissionOptionsWithAllowedCheck[page] = {
        permission: permissionOptions,
        amIEvenAllowedToNavigateToThisPage:
          amIEvenAllowedToNavigateToThisPageHandler(permissionOptions),
      }
    }

    return allPagePermissionOptionsWithAllowedCheck
  }

  return {
    permissionOptions,
    amIEvenAllowedToNavigateToThisPage:
      amIEvenAllowedToNavigateToThisPageHandler(permissionOptions),
  }
} // End of getPermission
