import { createStyles } from '@mantine/core'
import Personal from './personal'
import Submission from './submission'

const useStyles = createStyles(() => ({
  submissionDetails: {
    display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  submissionProProfile: {
    display: 'flex',
    height: '88.5vh',
    width: '30%',
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
      <div className={classes.submissionDetails}>
        <div className={classes.submissionProProfile}>
          <Personal />
        </div>
        <div className={classes.submissionContactJobs}>
          <div>
            <Submission />
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmissionMain
