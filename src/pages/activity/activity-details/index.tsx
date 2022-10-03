import { createStyles, Grid } from '@mantine/core'
import Personal from './personal'
import Tasks from './tasks'

const useStyles = createStyles(() => ({
  activityDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  activityProProfile: {
    // display: 'flex',
    // height: '88.5vh',
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
  },
  activityContactJobs: {
    height: '88.5vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  },
  contacts: {
    height: '40vh',
  },
}))

export const ActivityDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <div className={classes.activityDetails}>
            <div className={classes.activityProProfile}>
              <Personal />
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div className={classes.activityDetails}>
            <div className={classes.activityContactJobs}>
              <div>
                <Tasks />
              </div>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default ActivityDetails
