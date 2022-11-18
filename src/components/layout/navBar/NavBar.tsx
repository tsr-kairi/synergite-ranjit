import { createStyles } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconWallet,
  IconFileAnalytics,
  IconBriefcase,
  IconTableOptions,
  IconBookUpload,
  IconUserCircle,
  IconFileReport,
  IconHome2,
  IconActivity,
  IconBuildingCommunity,
  IconDivide,
  IconUser,
  IconUsers,
  IconBulb,
  IconDevicesPc,
  IconGps,
} from '@tabler/icons'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

import LinksGroup from './NavBarLinksGroup'

export const navLinks = [
  {
    id: '1',
    label: 'Dashboard',
    icons: IconLayoutDashboard,
    isActive: false,
    links: [{ label: 'Home', link: '/', icon: IconHome2 }],
  },
  {
    id: '2',
    label: 'General',
    // icons: IconWallet,
    icons: IconBulb,
    initiallyOpened: false,
    isActive: false,
    links: [
      { label: 'Clients', link: '/client', icon: IconHome2 },
      { label: 'Vendors', link: '/vendor', icon: IconHome2 },
      {
        label: 'Admin',
        icon: IconHome2,
        subLinks: [
          { label: 'Activity', subLink: '/activity', icon: IconActivity },
          {
            label: 'Departments',
            subLink: '/department',
            icon: IconBuildingCommunity,
          },
          { label: 'Roles', subLink: '/roles', icon: IconDivide },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Back Office',
    // icons: IconTableOptions,
    icons: IconDevicesPc,
    initiallyOpened: false,
    isActive: false,
    links: [
      // { label: 'Candidates', link: '/candidate', icon: IconUser },
      { label: 'Employees', link: '/employee', icon: IconUsers },
      {
        label: 'Timesheet',
        link: '/timesheets',
        icon: IconFileAnalytics,
      },
      {
        label: 'Expenses',
        link: '/timesheets',
        icon: IconFileAnalytics,
      },
      {
        label: 'Onboarding',
        link: '/onboarding-list',
        icon: IconFileReport,
      },
    ],
  },

  // {
  //   id: '4',
  //   label: 'TimeSheets',
  //   icons: IconFileAnalytics,
  //   isActive: false,
  //   links: [
  //     {
  //       label: 'Submit Timesheet',
  //       link: '/timesheets',
  //       icon: IconFileAnalytics,
  //     },
  //   ],
  // },

  // {
  //   id: '5',
  //   label: 'On Boarding List',
  //   icons: IconFileReport,
  //   isActive: false,
  //   links: [
  //     {
  //       label: 'On Boarding List',
  //       link: '/onboarding-list',
  //       icon: IconFileReport,
  //     },
  //   ],
  // },
  {
    id: '6',
    label: 'ATS',
    // icons: IconBriefcase,
    icons: IconGps,
    isActive: false,
    links: [
      { label: 'Job', link: '/job', icon: IconBriefcase },
      { label: 'Candidates', link: '/candidate', icon: IconUser },
      { label: 'Submission', link: '/submission', icon: IconBookUpload },
    ],
  },
  // {
  //   id: '7',
  //   label: 'Submission',
  //   icons: IconBookUpload,
  //   isActive: false,
  //   links: [{ label: 'Submission', link: '/submission', icon: IconBookUpload }],
  // },
  {
    id: '8',
    label: 'Activities',
    icons: IconActivity,
    isActive: false,
    links: [
      { label: 'All Activities', link: '/my-activities', icon: IconActivity },
      {
        label: 'My Team Activities',
        link: '/my-team-activities',
        icon: IconActivity,
      },
      {
        label: 'My Team Delegated Activities',
        link: '/my-team-delegated-activities',
        icon: IconActivity,
      },
    ],
  },
  // {
  //   id: '9',
  //   label: 'Admin',
  //   icons: IconUserCircle,
  //   initiallyOpened: false,
  //   isActive: false,
  //   links: [
  //     { label: 'Activities', link: '/activity', icon: IconActivity },
  //     {
  //       label: 'Departments',
  //       link: '/department',
  //       icon: IconBuildingCommunity,
  //     },
  //     { label: 'Roles', link: '/roles', icon: IconDivide },
  //   ],
  // },
]

const useStyles = createStyles((theme) => ({
  // links: {
  //   marginLeft: -theme.spacing.md,
  //   marginRight: -theme.spacing.md,
  //   backgroundColor: '#04334c',
  // },
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
