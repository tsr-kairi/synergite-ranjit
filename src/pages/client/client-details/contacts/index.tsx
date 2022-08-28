import ClientService from '@/services/clientService'
import { TContacts } from '@/types'
import { Loader } from '@mantine/core'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ContactsTable from './contactsTable'

const Contacts = () => {
  const { clientId } = useParams()
  const [contactsData, setContactsData] = useState<TContacts[]>(
    [] as TContacts[]
  )

  const { isError, error, isLoading } = useQuery<TContacts[], Error>(
    ['contactList', clientId],
    async () => await ClientService.findContactsByClientId(Number(clientId)),
    {
      onSuccess: (data) => {
        setContactsData(data)
      },
    }
  )

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

  console.log({ contactsData })

  return <ContactsTable data={contactsData} />
}

export default Contacts
