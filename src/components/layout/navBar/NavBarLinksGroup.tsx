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
  Menu,
} from '@mantine/core'
import { TablerIcon } from '@tabler/icons'
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
    // fontWeight: 500,
    // fontSize: theme.fontSizes.sm,
    textDecoration: 'none',
    // padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: 'rgba(252,185,0,1)',
    },
  },

  linkGroup: {
    marginTop: '2px',
    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grey[0]
        : theme.colors.gray[0],
    // borderLeft: `1px solid ${theme.colors.grey[0]}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(252,185,0,1)'
          : 'rgba(252,185,0,1)',
      color: theme.colors.grey[0],
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

  controlActive: {
    backgroundColor: 'rgba(103, 169, 241, 0.14)',
  },
  menuDD: {
    // boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    backgroundColor: '#04334c',
  },
}))

interface LinksGroupProps {
  id: string
  icons: TablerIcon
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string; icon: TablerIcon }[]
  // url?: string
  isSidebarOpen?: boolean
  isActive: boolean
  onTopLinkClick: () => void
}

export default function LinksGroup({
  icons: Icons,
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
    <Group
      key={link.label}
      className={cx(classes.linkGroup, {
        [classes.linkActive]: link.label === active,
      })}
    >
      {/* <span>{link.icon}</span> */}
      <Icons size={20} />
      {/* <span dangerouslySetInnerHTML={{ __html: link.icon }}></span> */}
      <Text
        component={Link}
        to={link.link}
        className={classes.link}
        onClick={() => {
          setActive(link.label)
        }}
      >
        {link.label}
      </Text>
    </Group>
  ))

  return (
    <>
      <Menu
        width={280}
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
          <UnstyledButton
            style={isActive ? parentBackgroundColor : {}}
            className={cx(classes.control, {
              [classes.controlActive]: menuOpened,
            })}
          >
            <Anchor
              className={classes.anchor}
              onClick={onTopLinkClick}
              onMouseLeave={() => setIsOnHoverOpen(false)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon
                  className={classes.icoTheme}
                  size={30}
                  style={isActive ? parentBackgroundColor : {}}
                  onClick={() => setMenuOpened(true)}
                >
                  <Icons size={20} />
                </ThemeIcon>
              </Box>
            </Anchor>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown className={classes.menuDD}>
          <Menu.Label
            style={{
              fontSize: '16px',
              fontWeight: 'lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff',
              // borderBottom: `1px solid white`,
            }}
          >
            {label}
            <Icons size={20} />
          </Menu.Label>
          <Menu.Item style={{ padding: '5px', backgroundColor: 'transparent' }}>
            {menuOpened ? (
              <Collapse in={isActive || isOnHoverOpen}>{items}</Collapse>
            ) : null}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
