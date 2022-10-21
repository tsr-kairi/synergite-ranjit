import { createStyles } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconWallet,
  IconActivity,
  IconFileAnalytics,
  IconSettings,
  IconContrast2,
} from '@tabler/icons'

import LinksGroup from './NavBarLinksGroup'

const mockdata = [
  {
    label: 'Dashboard',
    icon: IconLayoutDashboard,
  },
  {
    label: 'Account',
    icon: IconWallet,
    initiallyOpened: false,
    links: [
      { label: 'Clients', link: '/client' },
      { label: 'Vendors', link: '/vendor' },
    ],
  },
  {
    label: 'Resources',
    icon: IconWallet,
    initiallyOpened: false,
    links: [
      { label: 'Candidates', link: '/candidate' },
      { label: 'Employees', link: '/employee' },
    ],
  },
  {
    label: 'Admin',
    icon: IconActivity,
    initiallyOpened: false,
    links: [
      { label: 'Activities', link: '/activity' },
      { label: 'Departments', link: '/department' },
      { label: 'Roles', link: '/roles' },
    ],
  },

  // { label: 'Employees', icon: IconUsers, url: '/employee' },
  // { label: 'Activities', icon: IconActivity, url: '/activity' },
  // { label: 'Contacts', icon: IconFileAnalytics },
  { label: 'TimeSheets', icon: IconFileAnalytics, url: '/timesheets' },

  { label: 'On Boarding List', icon: IconContrast2, url: '/onboarding-list' },
  { label: 'Job', icon: IconContrast2, url: '/job' },
  { label: 'Settings', icon: IconSettings },
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
    // backgroundColor: theme.colors.blue[9],
    backgroundColor: '#04334c',
  },
  linksInner: {
    paddingBottom: theme.spacing.xl,
  },

  // classes
  container: {
    marginTop: '16px',
    // background: theme.colors?.blue?.[9],
    background: '#04334c',
    overflow: 'hidden',
    display: 'flex',
    // '&:hover': {
    // }
  },
  menuIcon: {
    // '&:hover': {
    // }
  },
}))

interface NavBarProps {
  isBurgerIconOpen: boolean
}

const NavBar: React.FC<NavBarProps> = ({ isBurgerIconOpen }) => {
  const { classes } = useStyles()

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} isSidebarOpen={isBurgerIconOpen} />
  ))

  return (
    <div
      className={classes.container}
      style={{
        width: isBurgerIconOpen ? '300px' : '60px',
        justifyContent: isBurgerIconOpen ? 'start' : 'center',
      }}
    >
      <div className={classes.linksInner}>{links}</div>
    </div>
  )
}

export default NavBar
