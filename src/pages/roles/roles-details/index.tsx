import { createStyles } from '@mantine/core'
import Personal from './personal'
import RolesPermission from './roles-permission/roles-permission'

const useStyles = createStyles(() => ({
  rolesDetails: {
    width: '100%',
  },
  roles: {
    marginTop: '20px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))

export const RolesDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.main}>
        <div className={classes.rolesDetails}>
          <Personal />
          <div className={classes.roles}>
            <RolesPermission />
          </div>
        </div>
      </div>
    </>
  )
}

export default RolesDetails
