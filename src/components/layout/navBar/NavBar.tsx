import { createStyles } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconWallet,
  IconActivity,
  IconFileAnalytics,
  IconSettings,
  IconContrast2,
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
    url: '/',
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
    icon: IconWallet,
    initiallyOpened: false,
    isActive: false,
    links: [
      { label: 'Candidates', link: '/candidate' },
      { label: 'Employees', link: '/employee' },
    ],
  },
  {
    id: '4',
    label: 'Admin',
    icon: IconActivity,
    initiallyOpened: false,
    isActive: false,
    links: [
      { label: 'Activities', link: '/activity' },
      { label: 'Departments', link: '/department' },
      { label: 'Roles', link: '/roles' },
    ],
  },

  // { label: 'Employees', icon: IconUsers, url: '/employee' },
  // { label: 'Activities', icon: IconActivity, url: '/activity' },
  // { label: 'Contacts', icon: IconFileAnalytics },
  {
    id: '5',
    label: 'TimeSheets',
    icon: IconFileAnalytics,
    url: '/timesheets',
    isActive: false,
  },

  {
    id: '6',
    label: 'On Boarding List',
    icon: IconContrast2,
    url: '/onboarding-list',
    isActive: false,
  },
  {
    id: '7',
    label: 'Job',
    icon: IconContrast2,
    url: '/job',
    isActive: false,
  },
  {
    id: '8',
    label: 'Settings',
    icon: IconSettings,
    isActive: false,
  },
]

const useStyles = createStyles((theme) => ({
  mainNav: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  navbar: {
    backgroundColor: '#04334c',
    height: '100vh',
    borderTop: `1px solid #04334c`,
  },
  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: '#04334c',
  },
  linksInner: {
    paddingBottom: theme.spacing.xl,
  },

  // classes
  container: {
    marginTop: '16px',
    background: '#04334c',
    overflow: 'hidden',
    display: 'flex',
    position: 'relative',
  },
  navbarSideIcon: {
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '8px',
    height: '40px',
    borderTopRightRadius: '8px',
    backgroundColor: '#04334c',
    position: 'fixed',
    zIndex: 8000,
    bottom: 0,
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
  const navigate = useNavigate()

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
          } else if (item.url) {
            navigate(item.url)
          }
        }}
      />
    )
  })

  return (
    <div
      className={classes.container}
      style={{
        width: isBurgerIconOpen ? '300px' : '60px',
        justifyContent: isBurgerIconOpen ? 'start' : 'center',
        marginTop: '80px',
      }}
    >
      <div className={classes.linksInner}>{links}</div>

      <button
        className={classes.navbarSideIcon}
        style={{
          left: isBurgerIconOpen ? '255px' : '60px',
        }}
        onClick={onNavbarSideIconClick}
      ></button>
    </div>
  )
}

export default NavBar
