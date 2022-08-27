import { createStyles } from '@mantine/core'
import { TContactsFindById } from '@/types'
import { Loader } from '@mantine/core'
import ClientService from '@/services/clientService'
import { useQuery } from 'react-query'
import Personal from './personal'
import { Contacts } from './contacts'

const useStyles = createStyles(() => ({
  clientDetails: {
    display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  clientProProfile: {
    display: 'flex',
    height: '88.5vh',
    width: '30%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
  },
  clientContactJobs: {
    flex: 1,
  },
}))

export const ClientDetails = () => {
  const { classes } = useStyles()
  const { data, isError, error, isLoading } = useQuery<
    TContactsFindById,
    Error
  >('clientAll', async () => await ClientService.findById())

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  if (data?.data.length) {
    return (
      <>
        <div className={classes.clientDetails}>
          <div className={classes.clientProProfile}>
            <Personal />
          </div>
          <div className={classes.clientContactJobs}>
            <Contacts data={data} />
            {/* <Jobs data={clientData.jobs} /> */}
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }
}

export default ClientDetails
