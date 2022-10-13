import { Grid, createStyles, Text } from '@mantine/core'
import AnalyticsBoard from './analytics-graph'
import { EventBoard } from './event-board'
import { MessageBoard } from './message-board'
import { Guadrant } from './quadrant'
const useStyles = createStyles((theme) => ({
  FirstParentGrid: {
    display: 'flex',
    padding: '10px',
    width: '100%',
    flexDirection: 'column',
    gap: '30px',
  },
  SecParentGrid: {
    display: 'flex',
    gap: '30px',
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  // main sides
  leftSide: {
    flex: '1',
    gap: '15px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  rightSide: {
    width: '35%',
    gap: '15px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  // left side
  wellCome: {
    backgroundColor: theme.colors.grey[0],
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '30px',
    borderRadius: '10px',
    height: '104px',
  },
  analyticBoard: {
    backgroundColor: theme.colors.grey[0],
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '30px',
    borderRadius: '10px',
    // height: '315px',
  },
  eventBoard: {
    backgroundColor: theme.colors.grey[0],
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '10px',
    // height: '315px',
  },
  // right side
  messageBoard: {
    backgroundColor: theme.colors.grey[0],
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '10px',
    // height: '435px',
  },
  unknown: {
    backgroundColor: theme.colors.grey[0],
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '10px',
    height: '350px',
  },
  footer: {
    backgroundColor: theme.colors.grey[0],
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '10px',
    height: '74px',
  },
}))

export default function DashBoard() {
  const { classes } = useStyles()

  return (
    <div className={classes.FirstParentGrid}>
      <div className={classes.SecParentGrid}>
        <Grid className={classes.leftSide}>
          <Grid.Col className={classes.wellCome}>
            <Text size={'xl'}>
              Welcome to <b>Synergite</b> ! We are exited to have you !
            </Text>
          </Grid.Col>
          <Grid.Col className={classes.analyticBoard}>
            <Guadrant />
          </Grid.Col>
          <Grid.Col className={classes.eventBoard}>
            <AnalyticsBoard />
          </Grid.Col>
        </Grid>
        <Grid className={classes.rightSide}>
          <Grid.Col className={classes.messageBoard}>
            <MessageBoard
              title={'Message Board'}
              data={[
                {
                  title: 'Jone Doe',
                  description: 'Messages you have received',
                  image: 'https://randomuser.me/api/portraits/women/90.jpg',
                },
                {
                  title: 'Jone Doe',
                  description: 'Messages you have received',
                  image: 'https://randomuser.me/api/portraits/women/90.jpg',
                },
                {
                  title: 'Jone Doe',
                  description: 'Messages you have received',
                  image: 'https://randomuser.me/api/portraits/women/90.jpg',
                },
                {
                  title: 'Jone Doe',
                  description: 'Messages you have received',
                  image: 'https://randomuser.me/api/portraits/women/90.jpg',
                },
              ]}
            />
          </Grid.Col>
          <Grid.Col className={classes.unknown}>
            <EventBoard
              title={'Event Board'}
              data={[
                {
                  title: 'Mark Jupiter',
                  description: 'Hey dude whatsapp',
                  image:
                    'https://xsgames.co/randomusers/assets/avatars/male/74.jpg',
                },
                {
                  title: 'Mark Jupiter',
                  description: 'Hey dude whatsapp',
                  image:
                    'https://xsgames.co/randomusers/assets/avatars/male/74.jpg',
                },
                {
                  title: 'Mark Jupiter',
                  description: 'Hey dude whatsapp',
                  image:
                    'https://xsgames.co/randomusers/assets/avatars/male/74.jpg',
                },
                {
                  title: 'Mark Jupiter',
                  description: 'Hey dude whatsapp',
                  image:
                    'https://xsgames.co/randomusers/assets/avatars/male/74.jpg',
                },
              ]}
            />
          </Grid.Col>
        </Grid>
      </div>
      {/* <Grid>
        <Grid.Col className={classes.footer}></Grid.Col>
      </Grid> */}
    </div>
  )
}
