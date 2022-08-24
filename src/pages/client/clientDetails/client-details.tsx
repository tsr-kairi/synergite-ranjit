import { createStyles, Paper } from '@mantine/core'
import { useState } from 'react'
import { TClientList } from '@/types'
import { Loader } from '@mantine/core'
import ClientService from '@/services/clientService'
import { useQuery } from 'react-query'
import { ClientAccounts } from './client-accounts'

const useStyles = createStyles(() => ({
  clientDetails: {
    display: 'flex',
    // backgroundColor: theme.colors.blue[6],
    paddingLeft: '20px',
    paddingRight: '20px',
    gap: '20px',
    // placeItems: 'center',
    // '&:hover': {
    //   backgroundColor: theme.colors.blue[6],
    // },
  },
}))
export default function ClientDetails() {
  const { classes } = useStyles()

  const [clientData, setClientData] = useState<TClientList[]>(
    [] as TClientList[]
  )
  const { isError, error, isLoading } = useQuery(
    'clientAll',
    ClientService.findAll,
    // () => ClientService.findById,
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
        <div>
          <Paper>
            <h3>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              accusantium exercitationem corrupti mollitia ex amet, quidem unde
              possimus quod eaque?
            </h3>
          </Paper>
        </div>
        <div>
          <div>
            <ClientAccounts data={clientData} />
          </div>
          <Paper>
            <h1>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              accusantium exercitationem corrupti mollitia ex amet, quidem unde
              possimus quod eaque?
            </h1>
          </Paper>
        </div>
      </div>
    </>
  )
}
