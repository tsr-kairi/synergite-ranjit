import useCreateVendor from '@/pages/vendor/hooks/useCreateVendor'
import TextDivider from '@/components/elements/text-divider'
import { TVendorCreate, zVendorCreate } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  Accordion,
  Select,
  Textarea,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { UsState } from '@/pages/data/usState'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const { classes } = useStyles()
  const { mutate: addVendor } = useCreateVendor()
  const [searchValue, onSearchChange] = useState('')

  const form = useForm<TVendorCreate>({
    validate: zodResolver(zVendorCreate),
    initialValues: {
      first_name: '',
      last_name: '',
      primary_email: '',
      primary_phone: '',
      city: '',
      country: '',
      state: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TVendorCreate) => {
    const vendorCreateData = {
      ...values,
    }

    addVendor(vendorCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Vendor Created successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
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
                    label="First Name"
                    type={'text'}
                    placeholder="First Name"
                    {...form.getInputProps('first_name')}
                  />
                  <TextInput
                    label="Last Name"
                    type={'text'}
                    placeholder="Last Name"
                    {...form.getInputProps('last_name')}
                  />
                  <TextInput
                    label="Address 1"
                    type={'text'}
                    placeholder="Address 1"
                    {...form.getInputProps('address_line1')}
                  />
                  <TextInput
                    label="Address 2"
                    type={'text'}
                    placeholder="Address 2"
                    {...form.getInputProps('address_line2')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="City"
                    placeholder="City"
                    // searchable
                    // onSearchChange={onSearchChange}
                    // searchValue={searchValue}
                    // nothingFound="No Matching City"
                    data={[
                      {
                        value: 'Come from json/api',
                        label: 'Come from json/api',
                      },
                    ]}
                    {...form.getInputProps('city')}
                  />
                  <TextInput
                    label="County"
                    type={'text'}
                    placeholder="County"
                    {...form.getInputProps('county')}
                  />

                  <Select
                    label="State"
                    placeholder="State"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching State"
                    data={UsState.map((s) => {
                      return { value: s.state, label: s.state }
                    })}
                    {...form.getInputProps('state')}
                  />
                  <Select
                    label="Country"
                    placeholder="Country"
                    // searchable
                    // onSearchChange={onSearchChange}
                    // searchValue={searchValue}
                    // nothingFound="No Matching Country"
                    data={[
                      {
                        value: 'United States of America',
                        label: 'United States of America',
                      },
                    ]}
                    {...form.getInputProps('country')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Zip"
                    type={'number'}
                    placeholder="Zip"
                    {...form.getInputProps('zip')}
                  />
                  <TextInput
                    label="Phone"
                    type={'number'}
                    placeholder="Phone"
                    {...form.getInputProps('primary_phone')}
                  />
                  <TextInput
                    label="Email"
                    type={'email'}
                    placeholder="Email"
                    {...form.getInputProps('primary_email')}
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
                    label="Invoicing Frequency"
                    type={'email'}
                    placeholder="Invoicing Frequency"
                    {...form.getInputProps('invoicing_frequency')}
                  />
                  <TextInput
                    label="Format of Timesheet"
                    type={'email'}
                    placeholder="Format of Timesheet"
                    {...form.getInputProps('format_of_timesheet')}
                  />
                  <TextInput
                    label="Additional Details"
                    type={'email'}
                    placeholder="Additional Details"
                    {...form.getInputProps('additional_details')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    label="Remarks"
                    placeholder="Remarks"
                    {...form.getInputProps('remarks')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Button fullWidth type="submit" mt="md" mb="lg">
            Add New
          </Button>
        </form>
      </Paper>
    </>
  )
}
