import { useState } from 'react'
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  Anchor,
  Tooltip,
  Menu,
  Card,
  Image,
  Badge,
  Divider,
} from '@mantine/core'
import {
  TablerIcon,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from '@tabler/icons'
import { Link } from 'react-router-dom'
import theme from '@/theme/theme'

const parentBackgroundColor = {
  backgroundColor:
    theme.colorScheme === 'dark'
      ? theme?.colors?.dark?.[7]
      : 'rgba(252,185,0,1)',
  color: theme.colorScheme === 'dark' ? theme.white : theme?.colors?.grey?.[0],
}

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
    margin: `1px`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grey[0]
        : theme.colors.grey[3],
    fontSize: theme.fontSizes.sm,

    '&:hover': parentBackgroundColor,
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grey[9]
        : theme.colors.gray[9],
    borderLeft: `1px solid ${theme.colors.blue[6]}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(252,185,0,1)'
          : 'rgba(252,185,0,1)',
      color: theme.colors.grey[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: 'rgba(252,185,0,1)',
    },
  },

  icoTheme: {
    backgroundColor: 'rgba(103, 169, 241, 0.44)',
    '&:hover': {
      borderRadius: '8px',
    },
  },
  anchor: {
    color: theme.colors.grey[0],
    fontWeight: 500,
    fontSize: theme.fontSizes.md,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      textDecoration: 'none',
    },
  },

  userActive: {
    backgroundColor: 'rgba(103, 169, 241, 0.14)',
  },
  accSet: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
}))

interface LinksGroupProps {
  id: string
  icon: TablerIcon
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
  // url?: string
  isSidebarOpen?: boolean
  isActive: boolean
  onTopLinkClick: () => void
}

export default function LinksGroup({
  icon: Icon,
  label,
  links,
  isActive,
  onTopLinkClick,
}: LinksGroupProps) {
  const { classes, cx } = useStyles()
  const hasLinks = Array.isArray(links)

  const [isOnHoverOpen, setIsOnHoverOpen] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const [menuOpened, setMenuOpened] = useState(false)

  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component={Link}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: link.label === active,
      })}
      onClick={() => {
        setActive(link.label)
      }}
      key={link.label}
    >
      {link.label}
    </Text>
  ))

  return (
    <>
      <Menu
        width={200}
        position="right-start"
        offset={12}
        transition="pop-top-right"
        onClose={() => setMenuOpened(false)}
        onOpen={() => setMenuOpened(true)}
        openDelay={100}
        closeDelay={400}
        withArrow
      >
        <Menu.Target>
          <Tooltip
            label={label}
            position="right-start"
            transitionDuration={300}
            color="#67A9F1"
            withArrow
          >
            <UnstyledButton
              style={isActive ? parentBackgroundColor : {}}
              className={cx(classes.control, {
                [classes.userActive]: menuOpened,
              })}
            >
              <Anchor
                className={classes.anchor}
                onClick={onTopLinkClick}
                onMouseLeave={() => setIsOnHoverOpen(false)}
              >
                {/* <Group position="apart" spacing={0}> */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThemeIcon
                    className={classes.icoTheme}
                    size={30}
                    style={isActive ? parentBackgroundColor : {}}
                    onClick={() => setMenuOpened(true)}
                  >
                    <Icon size={20} />
                  </ThemeIcon>
                </Box>
                {/* </Group> */}
              </Anchor>
            </UnstyledButton>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown className={classes.accSet}>
          <Menu.Label>{label}</Menu.Label>
          <Divider />
          <Menu.Item>
            {menuOpened ? (
              <Collapse in={isActive || isOnHoverOpen}>{items}</Collapse>
            ) : null}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
