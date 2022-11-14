import { createStyles } from '@mantine/core'

import { useSearchParams } from 'react-router-dom'
import Personal from './personal'
import Submission from './submission'

const useStyles = createStyles(() => ({
  mainDetails: {
    // paddingLeft: '20px',
    // paddingRight: '20px',
    width: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))

export const SubmissionMain = () => {
  const [searchParams] = useSearchParams()
  // const search = window.location.search
  // const params = new URLSearchParams(search)
  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.mainDetails}>
        <Personal />
      </div>
      <div className={classes.mainDetails}>
        <Submission
          client_id={searchParams.get('client_id') || ''}
          job_id={searchParams.get('job_id') || ''}
        />
      </div>
    </div>
  )
}

export default SubmissionMain
