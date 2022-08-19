import { useState } from 'react'
import {
  createStyles,
  // Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Header,
  MediaQuery,
  Box,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconLogout,
  IconSettings,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconClock,
} from '@tabler/icons'
import Logo from '../logo'
// import Logo from '../logo'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '90px',
    backgroundColor: theme.colors.blue[9],
    border: 'none',
  },

  user: {
    color: theme.colors.grey[0],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colors.blue[0],
      color: theme.colors.grey[9],
    },

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
    backgroundColor: theme.colors.white,
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '17.2%',
    paddingLeft: '20px',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '20px',
    paddingLeft: '50px',

    [theme.fn.smallerThan('xl')]: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      width: '0%',
      paddingRight: '20px',
      paddingLeft: '0px',
    },
  },

  dateTime: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.grey[0],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    backgroundColor: theme.colors.blue[7],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.blue[8],
    },
  },
}))

interface HeaderBarProps {
  user: { name: string; image: string }
}

export default function HeaderBar({ user }: HeaderBarProps) {
  const { classes, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  return (
    <Header className={classes.header} height={80}>
      <Box className={classes.leftSide}>
        <Logo />
      </Box>
      <Box className={classes.rightSide}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group spacing={7} className={classes.dateTime}>
            <div>18 AUG 2022</div>
            <IconClock size={18} stroke={2} />
          </Group>
        </MediaQuery>
        {/* 3rd */}
        <div>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="xl"
              color="white"
            />

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
                      size={24}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconSwitchHorizontal size={14} stroke={1.5} />}
                >
                  Change account
                </Menu.Item>
                <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>
                  Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} stroke={1.5} />}
                >
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </Box>
    </Header>
  )
}
