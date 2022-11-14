import { createStyles } from '@mantine/core'
import Jobs from './jobs'
import Personal from './personal'

const useStyles = createStyles(() => ({
  clientDetails: {
    // paddingLeft: '20px',
    // paddingRight: '20px',
    width: '100%',
  },
  client: {
    marginTop: '20px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))

export const ClientDetails = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.clientDetails}>
        <Personal />
        <div className={classes.client}>
          <Jobs />
        </div>
      </div>
    </div>
  )
}

export default ClientDetails
