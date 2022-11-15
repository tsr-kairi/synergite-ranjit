import { useEffect, useState } from 'react'

import NavBar from '@/components/layout/navBar/NavBar'
// import useCurrentUser from '@/pages/login/hooks/useCurrentUser'
// import axiosPrivate from '@/services/axiosPrivate'
import { AppShell, createStyles } from '@mantine/core'
// import { useEffect } from 'react'
import HeaderBar from './HeaderBar'
import { useAuth } from '@/store/auth.store'
import { useNetwork } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
const useStyles = createStyles((theme) => ({
  outletStyle: {
    backgroundColor: theme.colors.grey[0],
    // display: 'none',
  },

  nav: {
    position: 'absolute',
    left: '100px',
    top: '0px',
    zIndex: 1000,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const { classes } = useStyles()

  const { online } = useNetwork()

  const { user, autoLogin } = useAuth((state) => ({
    user: state.user,
    autoLogin: state.autoLogin,
  }))

  useEffect(() => {
    autoLogin().catch((error) => console.log(error))
  }, [autoLogin])

  return (
    <AppShell
      navbar={
        <NavBar
          isBurgerIconOpen={isSidebarOpen}
          onNavbarSideIconClick={() =>
            setIsSidebarOpen((prevState) => !prevState)
          }
          // className={classes.nav}
        />
        // <NavbarMain />
      }
      header={
        <HeaderBar
          isBurgerIconOpen={isSidebarOpen}
          onBurgerIconClick={() => setIsSidebarOpen((prevState) => !prevState)}
          user={{
            name: `${user.firstName} ${user.lastName}`,
            image:
              'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
          }}
        />
      }
      className={classes.outletStyle}
    >
      {online ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <p style={{ fontSize: '40px', opacity: 0.5 }}>Your offline</p>
        </div>
      )}
    </AppShell>
  )
}

export default AppShellMain
