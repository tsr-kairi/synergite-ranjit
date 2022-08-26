import { createStyles } from '@mantine/core'
import { useState } from 'react'
import { TClientDetails } from '@/types'
import { Loader } from '@mantine/core'
import ClientService from '@/services/clientService'
import { useQuery } from 'react-query'
import { Contacts } from './contacts'
import Personal from './personal'
import { Jobs } from './jobs'

import { useParams } from 'react-router-dom'
import Client from '..'

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
        console.log(data)
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
          <Personal />
        </div>
        <div className={classes.clientContactJobs}>
          <Contacts data={clientData.contacts} />
          <Jobs data={clientData.jobs} />
        </div>
      </div>
    </>
  )
}
