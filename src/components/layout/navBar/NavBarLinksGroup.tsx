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
} from '@mantine/core'
import { TablerIcon, IconChevronLeft, IconChevronRight } from '@tabler/icons'
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
    // paddingLeft: 40,
    // marginLeft: 37,
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

  user: {
    color: theme.colors.blue[5],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
  },
  userActive: {
    backgroundColor: 'rgba(103, 169, 241, 0.14)',
  },
  accSet: {
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
  url?: string
  isSidebarOpen?: boolean
  isActive: boolean
  onTopLinkClick: () => void
}

export default function LinksGroup({
  icon: Icon,
  label,
  links,
  isSidebarOpen,
  isActive,
  onTopLinkClick,
}: LinksGroupProps) {
  const { classes, theme, cx } = useStyles()
  const hasLinks = Array.isArray(links)

  const [isOnHoverOpen, setIsOnHoverOpen] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const [menuOpened, setMenuOpened] = useState(false)

  // const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft

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
        width={500}
        position="right-start"
        offset={7}
        transition="pop-top-right"
        onClose={() => setMenuOpened(false)}
        onOpen={() => setMenuOpened(true)}
        openDelay={100}
        closeDelay={400}
        zIndex={1000}
      >
        <Menu.Target>
          <UnstyledButton
            // className={classes.control}
            style={isActive ? parentBackgroundColor : {}}
            className={cx(classes.control, {
              [classes.userActive]: menuOpened,
            })}
          >
            <Anchor
              className={classes.anchor}
              onClick={onTopLinkClick}
              // onMouseEnter={() => (isSidebarOpen ? setIsOnHoverOpen(true) : null)}
              onMouseLeave={() => setIsOnHoverOpen(false)}
            >
              <Group position="apart" spacing={0}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip
                    label={label}
                    position="right"
                    transitionDuration={0}
                  >
                    <ThemeIcon
                      className={classes.icoTheme}
                      size={30}
                      style={isActive ? parentBackgroundColor : {}}
                      onClick={() => setMenuOpened(true)}
                    >
                      <Icon size={20} />
                    </ThemeIcon>
                  </Tooltip>
                  {/* {isSidebarOpen && <Box ml="md">{label}</Box>} */}
                </Box>
              </Group>
            </Anchor>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{label}</Menu.Label>
          {/* <Menu.Item icon={items} className={classes.accSet}> */}
          {menuOpened ? (
            <Card shadow="sm" radius="md" withBorder>
              <Group position="apart">
                <Text weight={500}>{items}</Text>
              </Group>
            </Card>
          ) : null}
          {/* </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>

      {/* {menuOpened ? (
        <div
          style={{
            position: 'absolute',
            left: '100px',
            top: '0px',
            zIndex: 10,
          }}
        >
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{items}</Text>
            </Group>
          </Card>
        </div>
      ) : null} */}

      {/* {hasLinks ? (
        <Collapse in={isActive || isOnHoverOpen}>{items}</Collapse>
      ) : null} */}
    </>
  )
}
