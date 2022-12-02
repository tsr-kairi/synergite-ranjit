import { useAuth } from '@/store/auth.store'
import {
  getPermission,
  IAllPagePermissionOptionsWithAllowedCheck,
  IPermissionOptions,
} from '@/utils/permission.utils'
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

// export const navLinks = [
//   {
//     id: '1',
//     canIAccess: false,
//     label: 'Dashboard',
//     icons: IconLayoutDashboard,
//     isActive: false,
//     links: [{ label: 'Home', link: '/', canIAccess: false, icon: IconHome2 }],
//   },
//   {
//     id: '2',
//     canIAccess: false,
//     label: 'General',
//     // icons: IconWallet,
//     icons: IconBulb,
//     initiallyOpened: false,
//     isActive: false,
//     links: [
//       { label: 'Clients', link: '/client', canIAccess: false, icon: IconHome2 },
//       { label: 'Vendors', link: '/vendor', canIAccess: false, icon: IconHome2 },
//       {
//         label: 'Admin',
//         canIAccess: false,
//         icon: IconHome2,
//         subLinks: [
//           {
//             label: 'Activity',
//             subLink: '/activity',
//             canIAccess: false,
//             icon: IconActivity,
//           },
//           {
//             label: 'Departments',
//             subLink: '/department',
//             canIAccess: false,
//             icon: IconBuildingCommunity,
//           },
//           {
//             label: 'Roles',
//             subLink: '/roles',
//             canIAccess: false,
//             icon: IconDivide,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '3',
//     canIAccess: false,
//     label: 'Back Office',
//     // icons: IconTableOptions,
//     icons: IconDevicesPc,
//     initiallyOpened: false,
//     isActive: false,
//     links: [
//       // { label: 'Candidates', link: '/candidate', canIAccess: false, icon: IconUser },
//       {
//         label: 'Employees',
//         link: '/employee',
//         canIAccess: false,
//         icon: IconUsers,
//       },
//       {
//         label: 'Timesheet',
//         link: '/timesheets',
//         canIAccess: false,
//         icon: IconFileAnalytics,
//       },
//       {
//         label: 'Expenses',
//         link: '/timesheets',
//         canIAccess: false,
//         icon: IconFileAnalytics,
//       },
//       {
//         label: 'Onboarding',
//         link: '/onboarding-list',
//         canIAccess: false,
//         icon: IconFileReport,
//       },
//     ],
//   },

//   // {
//   //   id: '4',
//   //   canIAccess: false,
//   // label: 'TimeSheets',
//   //   icons: IconFileAnalytics,
//   //   isActive: false,
//   //   links: [
//   //     {
//   //       label: 'Submit Timesheet',
//   //       link: '/timesheets',
//   //       canIAccess: false, icon: IconFileAnalytics,
//   //     },
//   //   ],
//   // },

//   // {
//   //   id: '5',
//   //   canIAccess: false,
//   // label: 'On Boarding List',
//   //   icons: IconFileReport,
//   //   isActive: false,
//   //   links: [
//   //     {
//   //       label: 'On Boarding List',
//   //       link: '/onboarding-list',
//   //       canIAccess: false, icon: IconFileReport,
//   //     },
//   //   ],
//   // },
//   {
//     id: '6',
//     canIAccess: false,
//     label: 'ATS',
//     // icons: IconBriefcase,
//     icons: IconGps,
//     isActive: false,
//     links: [
//       { label: 'Job', link: '/job', canIAccess: false, icon: IconBriefcase },
//       {
//         label: 'Candidates',
//         link: '/candidate',
//         canIAccess: false,
//         icon: IconUser,
//       },
//       {
//         label: 'Submission',
//         link: '/submission',
//         canIAccess: false,
//         icon: IconBookUpload,
//       },
//     ],
//   },
//   // {
//   //   id: '7',
//   //   canIAccess: false,
//   // label: 'Submission',
//   //   icons: IconBookUpload,
//   //   isActive: false,
//   //   links: [{ label: 'Submission', link: '/submission', canIAccess: false, icon: IconBookUpload }],
//   // },
//   {
//     id: '8',
//     canIAccess: false,
//     label: 'Activities',
//     icons: IconActivity,
//     isActive: false,
//     links: [
//       {
//         label: 'All Activities',
//         link: '/my-activities',
//         canIAccess: false,
//         icon: IconActivity,
//       },
//       {
//         label: 'My Team Activities',
//         link: '/my-team-activities',
//         canIAccess: false,
//         icon: IconActivity,
//       },
//       {
//         label: 'My Team Delegated Activities',
//         link: '/my-team-delegated-activities',
//         canIAccess: false,
//         icon: IconActivity,
//       },
//     ],
//   },
//   {
//     id: '9',
//     canIAccess: false,
//     label: 'Admin',
//     icons: IconUserCircle,
//     initiallyOpened: false,
//     isActive: false,
//     links: [
//       {
//         label: 'Activities',
//         link: '/activity',
//         canIAccess: false,
//         icon: IconActivity,
//       },
//       {
//         label: 'Departments',
//         link: '/department',
//         canIAccess: false,
//         icon: IconBuildingCommunity,
//       },
//       { label: 'Roles', link: '/roles', canIAccess: false, icon: IconDivide },
//     ],
//   },
// ]

export const navLinks = [
  {
    id: '1',
    canIAccess: false,
    label: 'Dashboard',
    icons: IconLayoutDashboard,
    isActive: false,
    links: [{ label: 'Home', link: '/', canIAccess: false, icon: IconHome2 }],
  },
  {
    id: '2',
    canIAccess: false,
    label: 'General',
    icons: IconBulb,
    initiallyOpened: false,
    isActive: false,
    links: [
      { label: 'Clients', link: '/client', canIAccess: false, icon: IconHome2 },
      { label: 'Vendors', link: '/vendor', canIAccess: false, icon: IconHome2 },
      {
        label: 'Admin',
        canIAccess: false,
        icon: IconHome2,
        subLinks: [
          {
            label: 'Activity',
            subLink: '/activity',
            canIAccess: false,
            icon: IconActivity,
          },
          {
            label: 'Departments',
            subLink: '/department',
            canIAccess: false,
            icon: IconBuildingCommunity,
          },
          {
            label: 'Roles',
            subLink: '/roles',
            canIAccess: false,
            icon: IconDivide,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    canIAccess: false,
    label: 'Back Office',
    icons: IconDevicesPc,
    initiallyOpened: false,
    isActive: false,
    links: [
      {
        label: 'Employees',
        link: '/employee',
        canIAccess: false,
        icon: IconUsers,
      },
      {
        label: 'Timesheet',
        link: '/timesheets',
        canIAccess: false,
        icon: IconFileAnalytics,
      },
      {
        label: 'Expenses',
        link: '/timesheets',
        canIAccess: false,
        icon: IconFileAnalytics,
      },
      {
        label: 'Onboarding',
        link: '/onboarding-list',
        canIAccess: false,
        icon: IconFileReport,
      },
    ],
  },
  {
    id: '6',
    canIAccess: false,
    label: 'ATS',
    // icons: IconBriefcase,
    icons: IconGps,
    isActive: false,
    links: [
      { label: 'Job', link: '/job', canIAccess: false, icon: IconBriefcase },
      {
        label: 'Candidates',
        link: '/candidate',
        canIAccess: false,
        icon: IconUser,
      },
      {
        label: 'Submission',
        link: '/submission',
        canIAccess: false,
        icon: IconBookUpload,
      },
    ],
  },
  {
    id: '8',
    canIAccess: false,
    label: 'Activities',
    icons: IconActivity,
    isActive: false,
    links: [
      {
        label: 'All Activities',
        link: '/my-activities',
        canIAccess: false,
        icon: IconActivity,
      },
      {
        label: 'My Team Activities',
        link: '/my-team-activities',
        canIAccess: false,
        icon: IconActivity,
      },
      {
        label: 'My Team Delegated Activities',
        link: '/my-team-delegated-activities',
        canIAccess: false,
        icon: IconActivity,
      },
    ],
  },
  {
    id: '9',
    canIAccess: false,
    label: 'Admin',
    icons: IconUserCircle,
    initiallyOpened: false,
    isActive: false,
    links: [
      {
        label: 'Activities',
        link: '/activity',
        canIAccess: false,
        icon: IconActivity,
      },
      {
        label: 'Departments',
        link: '/department',
        canIAccess: false,
        icon: IconBuildingCommunity,
      },
      { label: 'Roles', link: '/roles', canIAccess: false, icon: IconDivide },
    ],
  },
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

  const permissions = useAuth((state) => state.permissions)
  const allPermissions = getPermission({
    pageName: '',
    permissions,
    getAllPermissions: true,
  }) as IAllPagePermissionOptionsWithAllowedCheck

  const { classes } = useStyles()

  const allowedNavLikList = navLinkList.map((navLink) => {
    const { links } = navLink
    const hasLinks = Array.isArray(links)

    if (hasLinks) {
      navLink.links = navLink.links = links.map((link) => {
        const linkName = (
          link?.link?.replace('/', '') || ''
        ).toLocaleLowerCase()

        // Even if one link is available then I can show navLink
        const allPermission = allPermissions[linkName]
        if (allPermission) {
          navLink.canIAccess = true
          link.canIAccess = allPermission.amIEvenAllowedToNavigateToThisPage
        }

        return link
      })
    }

    return navLink
  })

  // const links = navLinkList.map((item) => {
  const links = allowedNavLikList.map((item) => {
    if (!item.canIAccess) {
      return null
    }

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
