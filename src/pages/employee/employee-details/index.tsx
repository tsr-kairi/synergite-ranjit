import { createStyles } from '@mantine/core'
import Personal from './personal'

const useStyles = createStyles(() => ({
  employeeDetails: {
    display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  employeeProProfile: {
    display: 'flex',
    height: '88.5vh',
    width: 'maxWidth',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
  },
}))

export const EmployeeDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.employeeDetails}>
        <div className={classes.employeeProProfile}>
          <Personal />
        </div>
      </div>
    </>
  )
}

export default EmployeeDetails
