import TextDivider from '@/components/elements/text-divider'
import { TVendor } from '@/types'
import {
  createStyles,
  Group,
  Accordion,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import useEditVendor from '../../hooks/useEditVendor'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  dividerText: {
    color: theme.colors?.blue?.[9],
  },
}))

export default function VendorDetails(vendorDetailsData: TVendor) {
  const { classes } = useStyles()
  const { mutate: vendorDetails } = useEditVendor()

  const form = useForm<TVendor>({
    initialValues: vendorDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TVendor) => {
    const vendorDetailsData = {
      ...values,
    }

    vendorDetails(vendorDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Vendor Details Fetched Successfully.',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Accordion defaultValue="vendor_details">
            <Accordion.Item
              value="vendor_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Vendor Information" />
              </Accordion.Control>

              {/* Vendor Information */}
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="First Name"
                    type={'text'}
                    placeholder="First Name"
                    value={
                      vendorDetailsData.first_name
                        ? vendorDetailsData.first_name
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Last Name"
                    type={'text'}
                    placeholder="Last Name"
                    value={
                      vendorDetailsData.last_name
                        ? vendorDetailsData.last_name
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Address 1"
                    type={'text'}
                    placeholder="Address 1"
                    // value={vendorDetailsData.address_line1 ? vendorDetailsData.address_line1 : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Address 2"
                    type={'text'}
                    placeholder="Address 2"
                    // value={vendorDetailsData.address_line2 ? vendorDetailsData.address_line2 : 'N/A'}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={
                      vendorDetailsData.city ? vendorDetailsData.city : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="County"
                    type={'text'}
                    placeholder="County"
                    // value={vendorDetailsData.county ? vendorDetailsData.county : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Country"
                    type={'text'}
                    placeholder="Country"
                    value={
                      vendorDetailsData.country
                        ? vendorDetailsData.country
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={
                      vendorDetailsData.state ? vendorDetailsData.state : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Zip"
                    type={'number'}
                    placeholder="Zip"
                    // value={vendorDetailsData.zip ? vendorDetailsData.primary_phone : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Phone"
                    type={'number'}
                    placeholder="Phone"
                    value={
                      vendorDetailsData.primary_phone
                        ? vendorDetailsData.primary_phone
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Email"
                    type={'email'}
                    placeholder="Email"
                    value={
                      vendorDetailsData.primary_email
                        ? vendorDetailsData.primary_email
                        : 'N/A'
                    }
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* Invoice Details */}
            <Accordion.Item
              value="invoice_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Invoice Details" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Invoicing Frequency"
                    type={'email'}
                    placeholder="Invoicing Frequency"
                    // value={vendorDetailsData.invoicing_frequency ? vendorDetailsData.primary_phone : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Format of Timesheet"
                    type={'email'}
                    placeholder="Format of Timesheet"
                    // value={vendorDetailsData.format_of_timesheet ? vendorDetailsData.primary_phone : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Additional Details"
                    type={'email'}
                    placeholder="Additional Details"
                    // value={vendorDetailsData.additional_details ? vendorDetailsData.primary_phone : 'N/A'}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    readOnly={true}
                    label="Remarks"
                    placeholder="Remarks"
                    // value={vendorDetailsData.remarks ? vendorDetailsData.primary_phone : 'N/A'}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </form>
      </div>
    </>
  )
}
