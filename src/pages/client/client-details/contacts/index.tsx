import { clientQueryKeys } from '@/react-query/queryKeys'
import ClientService from '@/services/clientService'
import { IFindContactsByClientId, TContacts } from '@/types'
import { Loader } from '@mantine/core'
import { useState } from 'react'
import { useQuery } from 'react-query'
import ContactsTable from './contactsTable'

interface contactsProps {
  client_id: string
}

const Contacts = ({ client_id }: contactsProps) => {
  // const search = window.location.search
  // const params = new URLSearchParams(search)
  // const id = params.get('id')
  const [contactsData, setContactsData] = useState<TContacts[]>(
    [] as TContacts[]
  )

  const { isError, error, isLoading } = useQuery<
    IFindContactsByClientId,
    Error
  >(
    [clientQueryKeys.contactList, client_id],
    async () => await ClientService.findContactsByClientId(String(client_id)),
    {
      onSuccess: (data) => {
        setContactsData(data.data)
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

  return <ContactsTable data={contactsData} />
}

export default Contacts
