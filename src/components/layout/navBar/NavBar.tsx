import { Navbar, ScrollArea, createStyles } from '@mantine/core'
import {
  IconUsers,
  IconLayoutDashboard,
  IconWallet,
  IconActivity,
  IconFileAnalytics,
  IconSettings,
} from '@tabler/icons'
import LinksGroup from './NavBarLinksGroup'

const mockdata = [
  { label: 'Dashboard', icon: IconLayoutDashboard },
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
    label: 'Employees',
    icon: IconUsers,
    initiallyOpened: false,
    links: [
      { label: 'Active Employee', link: '' },
      { label: 'All Employee', link: '' },
    ],
  },
  { label: 'Activities', icon: IconActivity },
  { label: 'Contacts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconSettings },
]

const useStyles = createStyles((theme) => ({
  mainNav: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  navbar: {
    backgroundColor: theme.colors.blue[9],
    height: '100vh',
    borderTop: `1px solid ${theme.colors.blue[6]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: theme.colors.blue[9],
  },

  linksInner: {
    paddingBottom: theme.spacing.xl,
  },
}))

export default function NavBar() {
  const { classes } = useStyles()
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <Navbar
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      hidden={!open}
      className={classes.mainNav}
    >
      <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
        {/* Main Navbar */}
        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
    </Navbar>
  )
}
