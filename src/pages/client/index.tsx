import { useEffect, useState } from 'react'
import { ClientTable } from './client-table'
import axios from 'axios'
import { IRowClientData } from '@/types'
import { Loader } from '@mantine/core'

export const Client = () => {
  const [clientData, setClientData] = useState<IRowClientData[]>(
    [] as IRowClientData[]
  )
  useEffect(() => {
    axios
      .get<IRowClientData[]>('http://localhost:4000/clientTableData')
      .then((res) => {
        setClientData(res.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  if (!clientData.length) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return <ClientTable data={clientData} />
}

export default Client
