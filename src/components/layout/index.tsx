import HeaderBar from '@/components/headerBar/HeaderBar'
import NavBar from '@/components/navBar/NavBar'
import { AppShell } from '@mantine/core'
import { ReactNode } from 'react'

interface AppShellMainProps {
  children: ReactNode
}

const AppShellMain = ({ children }: AppShellMainProps) => {
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
    >
      {children}
    </AppShell>
  )
}

export default AppShellMain
