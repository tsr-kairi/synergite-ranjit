import { IVendorFindAll } from '@/types'
import { Loader } from '@mantine/core'
import { useQuery } from 'react-query'
import VendorTable from './vendor-table'
import VendorService from '@/services/vendorService'

export const Vendor = () => {
  const { data, isError, error, isLoading } = useQuery<IVendorFindAll, Error>(
    'vendorAll',
    async () => await VendorService.findAllVendor()
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

  if (data?.data.length) {
    return <VendorTable data={data.data} />
  } else {
    return <h1>Loading...</h1>
  }
}

export default Vendor
