import { useEffect, useState } from 'react'
import axios from 'axios'
import { IRowVendorData } from '@/types'
import { VendorTable } from './vendor-table'

export const Vendor = () => {
  const [vendorData, setVendorData] = useState<IRowVendorData[]>(
    [] as IRowVendorData[]
  )
  useEffect(() => {
    axios
      .get<IRowVendorData[]>('http://localhost:4000/vendorTableData')
      .then((res) => {
        setVendorData(res.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  if (!vendorData.length) {
    return <div>Loading...</div>
  }

  return <VendorTable data={vendorData} />
}

export default Vendor
