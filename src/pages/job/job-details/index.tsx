import { createStyles } from '@mantine/core'

import Personal from './personal'
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

export const JobDetails = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.mainDetails}>
        <Personal />
      </div>
    </div>
  )
}

export default JobDetails
