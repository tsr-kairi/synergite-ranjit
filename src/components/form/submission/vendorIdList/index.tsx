import useGetAllVendors from '@/pages/vendor/hooks/useGetAllVendors'
import { TVendor } from '@/types'
import { Loader, Paper } from '@mantine/core'
import { VendorId } from './vendorIdList'

interface VendorIdListProps {
  selectedVendor?: TVendor
  setVendor: (value: TVendor) => void
}

const VendorIdList = ({ selectedVendor, setVendor }: VendorIdListProps) => {
  const { data, isError, isLoading } = useGetAllVendors()

  if (isError) {
    return <h1>An Error Occurred</h1>
  }

  if (!isLoading && data && data?.data?.length > 0) {
    return (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        <VendorId
          key={data?.data?.length}
          selectedVendor={selectedVendor}
          data={data?.data || []}
          setVendor={setVendor}
        />
      </Paper>
    )
  } else {
    return <Loader variant="dots" />
  }

  // return (
  //   <Paper
  //     style={{
  //       boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
  //       padding: '20px',
  //     }}
  //   >
  //     <VendorId
  //       key={data?.data?.length}
  //       data={data?.data || []}
  //       setVendor={setVendor}
  //     />
  //   </Paper>
  // )
}

export default VendorIdList
