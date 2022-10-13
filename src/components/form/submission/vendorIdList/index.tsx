// import useGetAllEmployees from '@/pages/employee/hooks/useGetAllEmployees'
import useGetAllVendors from '@/pages/vendor/hooks/useGetAllVendors'
import { TVendor } from '@/types'
import { Paper } from '@mantine/core'
import { vendor, VendorId } from './vendorIdList'

const data = [
  {
    vendor_name: 'Rahul Singh',
    vendor_uuid: '1',
  },
  {
    vendor_name: 'Biswas Singh',
    vendor_uuid: '2',
  },
  {
    vendor_name: 'Shekhar Sudra',
    vendor_uuid: '3',
  },
  {
    vendor_name: 'Sibangi Nama',
    vendor_uuid: '4',
  },
  {
    vendor_name: 'Sunil Sarkar',
    vendor_uuid: '5',
  },
  {
    vendor_name: 'Petter Parker',
    vendor_uuid: '6',
  },
]

interface VendorIdListProps {
  setVendor: (value: TVendor) => void
}

const VendorIdList = ({ setVendor }: VendorIdListProps) => {
  // const { data, isError, error } = useGetAllEmployees()
  const { data, isError, error } = useGetAllVendors()
  console.log(data?.data)

  return (
    <Paper
      style={{
        boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
        padding: '20px',
      }}
    >
      <VendorId data={data?.data || []} setVendor={setVendor} />
    </Paper>
  )
}

export default VendorIdList
