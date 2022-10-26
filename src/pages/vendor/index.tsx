import { ListViewLayout } from '@/components/layout/list-view.layout'
import useGetAllVendors from './hooks/useGetAllVendors'
import VendorTable from './vendor-table'
import CreateForm from '@/components/form/vendor/createForm'

export const Vendor = () => {
  const { data, isError, isLoading } = useGetAllVendors()

  return (
    <ListViewLayout
      title="Vendors"
      createDrawerTitle="Add New Vendor"
      createDrawerChildren={<CreateForm />}
      isError={isError}
      isLoading={isLoading}
      createDrawerSize={'1200px'}
    >
      <VendorTable data={data?.data || []} />
    </ListViewLayout>
  )

  // if (isError) {
  //   console.log(error)
  //   return <h1>An Error Occurred</h1>
  // }

  // if (data?.data.length) {
  //   return <VendorTable data={data.data} />
  // } else {
  //   return <Loader variant="dots" />
  // }
}

export default Vendor
