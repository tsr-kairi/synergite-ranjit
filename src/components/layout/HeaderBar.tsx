import { useState } from 'react'
import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Header,
  Box,
} from '@mantine/core'
import { IconLogout, IconSettings, IconChevronRight } from '@tabler/icons'
import Logo from '../logo'
import { Link, useNavigate } from 'react-router-dom'
import useCurrentUser from '@/pages/login/hooks/useCurrentUser'
import { useAuth } from '@/store/auth.store'
import AppBar from '../elements/app-bar'
import { getPermission } from '@/utils/permission.utils'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '90px',
    backgroundColor: 'transparent',
    border: 'none',

    [theme.fn.smallerThan('xs')]: {
      backgroundColor: theme.colors.blue[9],
      alignItems: 'center',
    },
  },

  user: {
    color: theme.colors.blue[5],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    // '&:hover': {
    // },

    // backgroundColor: 'rgba(103, 169, 241, 0.14)',

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: 'rgba(103, 169, 241, 0.14)',
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
    width: '299px',
    paddingLeft: '20px',
    backgroundColor: theme.colors.blue[9],

    [theme.fn.smallerThan('xs')]: {
      backgroundColor: 'transparent',
    },
  },
  rightSide: {
    display: 'flex',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'end',
    paddingRight: '25px',
    paddingLeft: '25px',

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'right',
    },
  },

  dateTime: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.grey[0],
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    backgroundColor: theme.colors.blue[8],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.blue[8],
    },
  },
  accSet: {
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
  logout: {
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
}))

interface IHeaderBarProps {
  user: { name: string; image: string }
  isBurgerIconOpen: boolean
  onBurgerIconClick: () => void
}

export default function HeaderBar({
  user,
  isBurgerIconOpen,
  onBurgerIconClick,
}: IHeaderBarProps) {
  const { classes, cx } = useStyles()
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()

  void useCurrentUser()

  return (
    <Header className={classes.header} height={80}>
      <AppBar className={classes.leftSide}>
        <Burger
          opened={isBurgerIconOpen}
          onClick={onBurgerIconClick}
          className={classes.burger}
          size="md"
          mr={8}
          color="white"
        />
        <Link to={'/'}>
          <Logo />
        </Link>

        <Box className={classes.rightSide}>
          <Group>
            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={28}
                    />
                    <Text
                      weight={500}
                      size="md"
                      sx={{ lineHeight: 1 }}
                      mr={3}
                      color="white"
                    >
                      {user.name}
                    </Text>
                    <IconChevronRight size={16} stroke={4.5} color="white" />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  icon={<IconSettings size={14} stroke={1.5} />}
                  className={classes.accSet}
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconLogout size={14} stroke={1.5} />}
                  className={classes.logout}
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Box>
      </AppBar>
    </Header>
  )
}
