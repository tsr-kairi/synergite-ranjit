import { createStyles, Text, Button, Group, ActionIcon } from '@mantine/core'
import { IconChevronsRight, IconEmpathize } from '@tabler/icons'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  detailHead: {
    border: `1px solid ${theme.colors.blue[4]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.colors.accent[0],
    },
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.accent[9],
    },
  },
}))

export function Guadrant() {
  const { classes } = useStyles()

  return (
    <div>
      <Group align={'center'} mb="md">
        <Text
          weight={'lighter'}
          style={{
            fontFamily: '-moz-initial',
            fontSize: '20px',
            color: '#E39133',
          }}
        >
          What would you like to do today?
        </Text>
        <ActionIcon variant="light" radius="xl" color={'#E39133'}>
          <IconEmpathize size={28} color={'#E39133'} />
        </ActionIcon>
      </Group>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to={`/onboarding`} className={classes.userLink}>
          <Button
            className={classes.detailHead}
            rightIcon={<IconChevronsRight />}
            variant="subtle"
            mt={'md'}
            size="md"
          >
            Onboard a candidate
          </Button>
        </Link>
        <Link to={`/onboarding-list`} className={classes.userLink}>
          <Button
            className={classes.detailHead}
            rightIcon={<IconChevronsRight />}
            variant="subtle"
            mt={'md'}
            size="md"
          >
            Continue Onboarding now
          </Button>
        </Link>
        <Link to={`/`} className={classes.userLink}>
          <Button
            className={classes.detailHead}
            rightIcon={<IconChevronsRight />}
            variant="subtle"
            mt={'md'}
            size="md"
          >
            Terminate Employee
          </Button>
        </Link>
      </div>
    </div>
  )
}
