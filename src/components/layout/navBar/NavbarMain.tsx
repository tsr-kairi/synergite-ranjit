import { useState } from 'react'
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from '@mantine/core'
import {
  TablerIcon,
  IconActivity,
  IconBookUpload,
  IconBriefcase,
  IconContrast2,
  IconFileAnalytics,
  IconLayoutDashboard,
  IconTableOptions,
  IconWallet,
} from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.15
      ),
    },
  },
}))

interface NavbarLinkProps {
  icon: TablerIcon
  label: string
  active?: boolean
  onClick?(): void
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )
}

const navLinks = [
  {
    id: '1',
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    isActive: false,
  },
  {
    id: '2',
    label: 'Account',
    icon: IconWallet,
    initiallyOpened: false,
    isActive: false,
  },
  {
    id: '3',
    label: 'Resources',
    icon: IconTableOptions,
    initiallyOpened: false,
    isActive: false,
  },

  {
    id: '4',
    label: 'TimeSheets',
    icon: IconFileAnalytics,
    isActive: false,
  },

  {
    id: '5',
    label: 'On Boarding List',
    icon: IconContrast2,
    isActive: false,
  },
  {
    id: '6',
    label: 'Job',
    icon: IconBriefcase,
    url: '/job',
    isActive: false,
  },
  {
    id: '7',
    label: 'Submission',
    icon: IconBookUpload,
    isActive: false,
  },
  {
    id: '8',
    label: 'Admin',
    icon: IconActivity,
    initiallyOpened: false,
    isActive: false,
  },
]

export function NavbarMain() {
  const [active, setActive] = useState(2)

  const links = navLinks.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ))

  return (
    <Navbar
      height={750}
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: 'filled',
          color: theme.primaryColor,
        }).background,
      })}
    >
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
