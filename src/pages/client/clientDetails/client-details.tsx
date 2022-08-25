import { createStyles, Paper } from '@mantine/core'
import { useState } from 'react'
import { TClientDetails } from '@/types'
import { Loader } from '@mantine/core'
import ClientService from '@/services/clientService'
import { useQuery } from 'react-query'
import { ClientAccounts } from './client-accounts'
import ClientPersonalDetails from './client-personal-details'
import { useParams } from 'react-router-dom'

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
export default function ClientDetails() {
  const { classes } = useStyles()

  const [clientData, setClientData] = useState<TClientDetails>(
    {} as TClientDetails
  )

  const { clientId } = useParams()

  const { isError, error, isLoading } = useQuery(
    ['clientSingle', clientId],
    (clientId) => ClientService.findById(Number(clientId)),
    {
      onSuccess: (data) => {
        setClientData(data?.data)
      },
    }
  )

  if (isError) {
    console.log(error)
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return (
    <>
      <div className={classes.clientDetails}>
        <div className={classes.clientProProfile}>
          <ClientPersonalDetails />
        </div>
        <div className={classes.clientContactJobs}>
          <ClientAccounts data={clientData} />
        </div>
      </div>
    </>
  )
}
