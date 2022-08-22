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
  { label: 'Dashboard', icon: IconLayoutDashboard, link: '/dashboard' },
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
    link: '/employee',
    icon: IconUsers,
    links: [
      { label: 'First', link: '/' },
      { label: 'Second', link: '/' },
      { label: 'Third', link: '/' },
    ],
  },
  { label: 'Activities', icon: IconActivity },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconSettings },
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[9],
    height: '100vh',
    borderTop: `1px solid ${theme.colors.blue[6]}`,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
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
    <Navbar hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }} hidden={!open}>
      <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
        {/* Main Navbar */}
        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
    </Navbar>
  )
}
