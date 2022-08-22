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
  IconChevronDown,
  IconClock,
} from '@tabler/icons'
import Logo from '../logo'

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
      backgroundColor: theme.colors.blue[8],
      color: theme.colors.grey[0],
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
    width: '300px',
    paddingLeft: '20px',
  },
  rightSide: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
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
}

interface INewDateOptProps {
  month: string
  day: string
  year: string
}

export default function HeaderBar({ user }: IHeaderBarProps) {
  const { classes, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  // date&time
  const newDateOpt: INewDateOptProps = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
  const date = new Date()

  return (
    <Header className={classes.header} height={80}>
      <Box className={classes.leftSide}>
        <Logo />
      </Box>
      <Box className={classes.rightSide}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group spacing={7} className={classes.dateTime}>
            <div>{date.toLocaleDateString('en-US', newDateOpt)}</div>
            <IconClock size={18} stroke={2} />
          </Group>
        </MediaQuery>
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
                <Menu.Item
                  icon={<IconSettings size={14} stroke={1.5} />}
                  className={classes.accSet}
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconLogout size={14} stroke={1.5} />}
                  className={classes.logout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </Box>
    </Header>
  )
}
