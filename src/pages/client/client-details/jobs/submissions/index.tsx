import { createStyles, Grid } from '@mantine/core'
import Personal from './personal'
import Submission from './submission'

const useStyles = createStyles(() => ({
  submissionDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  submissionProProfile: {
    // display: 'flex',
    // height: '88.5vh',
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
  },
  submissionContactJobs: {
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

export const SubmissionMain = () => {
  const { classes } = useStyles()

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <div className={classes.submissionDetails}>
            <div className={classes.submissionProProfile}>
              <Personal />
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div className={classes.submissionDetails}>
            <div className={classes.submissionContactJobs}>
              <div>
                <Submission />
              </div>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default SubmissionMain
