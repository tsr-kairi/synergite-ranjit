export const setAuthDataInLocalStorage = (
  accessToken: string,
  refreshToken: string
) => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + 1)

  localStorage.setItem('expire_at', date.toString())
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
}

export const getPermission = (pageName: string, permissions: string[]) => {
  const permissionOptions = {
    read: false,
    write: false,
    update: false,
    delete: false,
  }

  for (const permission of permissions) {
    const [page, pagePermissionOption] = permission
      .toLocaleLowerCase()
      .split(':')

    if (page === pageName.toLocaleLowerCase()) {
      switch (pagePermissionOption) {
        case 'read':
          permissionOptions.read = true
          break
        case 'write':
          permissionOptions.write = true
          break
        case 'update':
          permissionOptions.update = true
          break
        case 'delete':
          permissionOptions.delete = true
          break
      }
    }
  } // End of for loop

  return permissionOptions
} // End of getPermission
