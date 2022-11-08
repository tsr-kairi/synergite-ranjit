import { createStyles } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconWallet,
  IconActivity,
  IconFileAnalytics,
  IconContrast2,
  IconBriefcase,
  IconTableOptions,
  IconBookUpload,
  IconUserCircle,
  IconFileReport,
} from '@tabler/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LinksGroup from './NavBarLinksGroup'

const navLinks = [
  {
    id: '1',
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    isActive: false,
    // url: '/',
    links: [{ label: 'Dashboard', link: '/' }],
  },
  {
    id: '2',
    label: 'Account',
    icon: IconWallet,
    initiallyOpened: false,
    isActive: false,
    links: [
      { label: 'Clients', link: '/client' },
      { label: 'Vendors', link: '/vendor' },
    ],
  },
  {
    id: '3',
    label: 'Resources',
    icon: IconTableOptions,
    initiallyOpened: false,
    isActive: false,
    links: [
      { label: 'Candidates', link: '/candidate' },
      { label: 'Employees', link: '/employee' },
    ],
  },

  {
    id: '4',
    label: 'TimeSheets',
    icon: IconFileAnalytics,
    isActive: false,
    links: [{ label: 'TimeSheets', link: '/timesheets' }],
  },

  {
    id: '5',
    label: 'On Boarding List',
    icon: IconFileReport,
    isActive: false,
    links: [{ label: 'On Boarding List', link: '/onboarding-list' }],
  },
  {
    id: '6',
    label: 'Job',
    icon: IconBriefcase,
    isActive: false,
    links: [{ label: 'Job', link: '/job' }],
  },
  {
    id: '7',
    label: 'Submission',
    icon: IconBookUpload,
    isActive: false,
    links: [{ label: 'Submission', link: '/submission' }],
  },
  {
    id: '8',
    label: 'Admin',
    icon: IconUserCircle,
    initiallyOpened: false,
    isActive: false,
    links: [
      { label: 'Activities', link: '/activity' },
      { label: 'Departments', link: '/department' },
      { label: 'Roles', link: '/roles' },
    ],
  },
]

const useStyles = createStyles((theme) => ({
  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: '#04334c',
  },
  linksInner: {
    paddingBottom: theme.spacing.xl,
  },

  container: {
    justifyContent: 'center',
    marginTop: '80px',
    background: '#04334c',
    display: 'flex',
    position: 'relative',
  },
}))

interface NavBarProps {
  isBurgerIconOpen: boolean
  onNavbarSideIconClick: () => void
}

const NavBar: React.FC<NavBarProps> = ({
  isBurgerIconOpen,
  onNavbarSideIconClick,
}) => {
  const [navLinkList, setNavLinkList] = useState(navLinks)
  // const navigate = useNavigate()

  const { classes } = useStyles()

  const links = navLinkList.map((item) => {
    let isOpen = item.isActive
    if (item.isActive && isBurgerIconOpen) {
      isOpen = true
    } else if (item.isActive && !isBurgerIconOpen) {
      isOpen = false
    }

    return (
      <LinksGroup
        key={item.label}
        {...item}
        isActive={isOpen}
        isSidebarOpen={isBurgerIconOpen}
        onTopLinkClick={() => {
          const updatedNavLinks = navLinkList.map((navLink) => {
            if (navLink.id === item.id) {
              navLink.isActive = !navLink.isActive
            } else {
              navLink.isActive = false
            }
            return navLink
          })

          setNavLinkList(updatedNavLinks)
          if (!isBurgerIconOpen && item.isActive) {
            onNavbarSideIconClick()
          }
          // else if (item.links) {
          //   navigate(item.links)
          // }
        }}
      />
    )
  })

  return (
    <div className={classes.container}>
      <div className={classes.linksInner}>{links}</div>
    </div>
  )
}

export default NavBar
