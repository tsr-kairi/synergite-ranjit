import { useEffect, useState } from 'react'
import { ClientTable } from './client-table'
import axios from 'axios'
import { IRowData } from '@/types'

export const Client = () => {
  const [clientData, setClientData] = useState<IRowData[]>([] as IRowData[])
  useEffect(() => {
    axios
      .get<IRowData[]>('http://localhost:4000/clientTableData')
      .then((res) => {
        setClientData(res.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  if (!clientData.length) {
    return <div>Loading...</div>
  }

  return <ClientTable data={clientData} />
}

export default Client
