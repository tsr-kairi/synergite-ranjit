import { TJobs } from '@/types'
import { createStyles } from '@mantine/core'
import { useParams, useSearchParams } from 'react-router-dom'

import Personal from './personal'
import Submission from './submission/submission'
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
interface jobIdProps {
  jobId: TJobs[]
}

export const JobDetails = ({ jobId }: jobIdProps) => {
  const { classes } = useStyles()
  // const [searchParams] = useSearchParams()
  const { clientId } = useParams()

  return (
    <div className={classes.main}>
      <div className={classes.mainDetails}>
        <Personal />
      </div>
      <div className={classes.mainDetails}>
        <Submission client_id={String(clientId)} job_id={String(jobId)} />
      </div>
    </div>
  )
}

export default JobDetails
