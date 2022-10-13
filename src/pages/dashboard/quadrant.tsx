import { createStyles, Text, Button, Group } from '@mantine/core'
import { IconChevronsRight } from '@tabler/icons'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  detailHead: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))

export function Guadrant() {
  const { classes } = useStyles()

  return (
    <div>
      <Text>What would you like to do today?</Text>
      <div style={{ display: 'flex' }}>
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
