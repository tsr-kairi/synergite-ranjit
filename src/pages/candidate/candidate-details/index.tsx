import { createStyles } from '@mantine/core'
import Personal from './personal'

const useStyles = createStyles(() => ({
  vendorDetails: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))

export const VendorDetails = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.vendorDetails}>
        <Personal />
      </div>
    </div>
  )
}

export default VendorDetails
