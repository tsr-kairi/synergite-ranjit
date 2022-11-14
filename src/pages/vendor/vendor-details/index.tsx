import { createStyles } from '@mantine/core'
import Contacts from './contacts'
import Personal from './personal'

const useStyles = createStyles(() => ({
  vendorDetails: {
    // paddingLeft: '20px',
    // paddingRight: '20px',
    width: '100%',
  },
  vendor: {
    marginTop: '20px',
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
        <div className={classes.vendor}>
          <Contacts />
        </div>
      </div>
    </div>
  )
}

export default VendorDetails
