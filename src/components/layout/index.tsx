import NavBar from '@/components/layout/navBar/NavBar'
import { AppShell, createStyles } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import HeaderBar from './HeaderBar'
const useStyles = createStyles((theme) => ({
  outletStyle: {
    backgroundColor: theme.colors.grey[0],
  },
}))

const AppShellMain = () => {
  const { classes } = useStyles()

  return (
    <AppShell
      navbar={<NavBar />}
      header={
        <HeaderBar
          user={{
            name: 'John Doe',
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

export default AppShellMain
