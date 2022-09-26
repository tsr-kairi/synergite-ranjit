import { Navbar, ScrollArea, createStyles } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconWallet,
  IconActivity,
  IconFileAnalytics,
  IconSettings,
  IconContrast2,
  IconTableOptions,
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
  // resources
  {
    label: 'Resources',
    icon: IconTableOptions,
    initiallyOpened: false,
    links: [
      { label: 'Employees', link: '/employee' },
      { label: 'Candidates', link: '/candidate' },
    ],
  },
  { label: 'Activities', icon: IconActivity, url: '/employee' },
  { label: 'Contacts', icon: IconFileAnalytics },
  { label: 'On Boarding', icon: IconContrast2, url: '/onboarding' },
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

  // active: {
  //   '&, &:hover': {
  //     backgroundColor: theme.fn.variant({
  //       variant: 'light',
  //       color: theme.primaryColor,
  //     }).background,
  //     color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
  //       .color,
  //   },
  // },
}))

// interface NavbarLinkProps {
//   active?: boolean
// }
export default function NavBar() {
  const { classes } = useStyles()
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <Navbar
      hiddenBreakpoint="sm"
      width={{ sm: 200, md: 250, lg: 300 }}
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
