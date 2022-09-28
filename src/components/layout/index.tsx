import { useContext } from 'react'

import NavBar from '@/components/layout/navBar/NavBar'
// import useCurrentUser from '@/pages/login/hooks/useCurrentUser'
// import axiosPrivate from '@/services/axiosPrivate'
import { AppShell, createStyles } from '@mantine/core'
// import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBar from './HeaderBar'
import { useAuth } from '@/store/auth.strore'
const useStyles = createStyles((theme) => ({
  outletStyle: {
    backgroundColor: theme.colors.grey[0],
  },
}))

// type IUser = {
//   first_name: string
//   last_name: string
// }
// type ILoginResponse = {
//   ok: boolean
//   message: string
//   data: IUser
// }

const AppShellMain = () => {
  const { classes } = useStyles()

  const user = useAuth((state) => state.user)

  // useEffect(() => {
  //   void ApiCall()
  // }, [])
  // const ApiCall = async () => {
  //   const access_token = localStorage.getItem('access_token')

  //   if (!access_token) {
  //     return false
  //   }

  //   try {
  //     const response = await axiosPrivate.get<ILoginResponse>(
  //       '/user/getcurrentuser'
  //     )
  //     console.log(response)
  //     return response.data.data
  //   } catch (error) {
  //     console.log(error)
  //     return null
  //   }
  // }

  return (
    <AppShell
      navbar={<NavBar />}
      header={
        <HeaderBar
          user={{
            name: `${user.firstName} ${user.lastName}`,
            image:
              'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
          }}
        />
      }
      className={classes.outletStyle}
    >
      {/* <div className={classes.outletStyle}> */}
      <Outlet />
      {/* </div> */}
    </AppShell>
  )
}
// export { useCurrentUser }

export default AppShellMain
