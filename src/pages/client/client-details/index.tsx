import { createStyles, Grid } from '@mantine/core'
import Contacts from './contacts'
import Jobs from './jobs'
import Personal from './personal'

const useStyles = createStyles(() => ({
  clientDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  clientProProfile: {
    // display: 'flex',
    // height: '88.5vh',
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
  },
  clientContactJobs: {
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

export const ClientDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <div className={classes.clientDetails}>
            <div className={classes.clientProProfile}>
              <Personal />
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div className={classes.clientDetails}>
            <div className={classes.clientContactJobs}>
              <div>
                <Contacts />
              </div>
              <Jobs />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default ClientDetails
