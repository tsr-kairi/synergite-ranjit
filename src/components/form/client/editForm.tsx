import useEditClient from '@/pages/client/hooks/useEditClient'
import TextDivider from '@/components/elements/text-divider'
import { TClient } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Accordion,
  Select,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconPaperclip } from '@tabler/icons'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(clientData: TClient) {
  const { classes } = useStyles()
  const { mutate: editClient } = useEditClient()

  const form = useForm<TClient>({
    // validate: zodResolver(zClientEdit),
    initialValues: clientData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TClient) => {
    const clientCreateData = {
      ...values,
      // status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    editClient(clientCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Client Edited successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Accordion defaultValue="client_details">
            <Accordion.Item
              value="client_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Account Information" />
              </Accordion.Control>

              {/* account info */}
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
                    label="Display Name"
                    type={'text'}
                    placeholder="Display Name"
                    {...form.getInputProps('display_name')}
                  />
                  <Select
                    label="Account Status"
                    placeholder="Account Status"
                    {...form.getInputProps('account_status')}
                    data={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="Account Owner"
                    placeholder="Account Owner"
                    {...form.getInputProps('account_owner')}
                    data={[
                      {
                        value: 'get_from_api',
                        label: 'Acc Owner Get From Api...',
                      },
                    ]}
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
                  <Select
                    label="Industry"
                    placeholder="Industry"
                    {...form.getInputProps('industry')}
                    data={[
                      {
                        value: 'active',
                        label: 'Come from Api/JSON format...',
                      },
                    ]}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Website"
                    type={'text'}
                    placeholder="Website"
                    {...form.getInputProps('website')}
                  />

                  <TextInput
                    label="Contract End Date"
                    type={'date'}
                    placeholder="Contract End Date"
                    {...form.getInputProps('contract_end_date')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    label="Description"
                    type={'text'}
                    placeholder="Description"
                    {...form.getInputProps('description')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* invoicing details */}
            <Accordion.Item
              value="invoice_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Invoice Details" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <Select
                    label="BIlling Cycle"
                    placeholder="BIlling Cycle"
                    data={[
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'bi_weekly', label: 'Bi-Weekly' },
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'semi_monthly', label: 'Semi-Monthly' },
                    ]}
                    {...form.getInputProps('billing_cycle')}
                  />
                  <Select
                    label="Payment Frequency"
                    placeholder="Payment Frequency"
                    data={[
                      { value: 'NET_0', label: 'Net 0' },
                      { value: 'NET_3', label: 'Net 3' },
                      {
                        value: 'NET_5',
                        label: 'Net 5',
                      },
                      { value: 'NET_10', label: 'Net 10' },
                      { value: 'NET_30', label: 'Net 30' },
                      { value: 'NET_45', label: 'Net 45' },
                    ]}
                    {...form.getInputProps('payment_frequency')}
                  />
                  <FileInput
                    label="Invoicing Template"
                    placeholder="Invoicing Template"
                    icon={<IconPaperclip size={14} />}
                    {...form.getInputProps('invoicing_template')}
                  />
                  <FileInput
                    label="Format of Timesheet"
                    placeholder="Format of Timesheet"
                    icon={<IconPaperclip size={14} />}
                    {...form.getInputProps('format_of_template')}
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
            {/* Billing address */}
            <Accordion.Item
              value="billing_address"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Billing Address" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
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
                  <Select
                    label="City"
                    placeholder="City"
                    data={[
                      {
                        value: 'come_from_api_json_format',
                        label: 'Come from Api/JSON format...',
                      },
                    ]}
                    {...form.getInputProps('city')}
                  />
                  <Select
                    label="State"
                    placeholder="State"
                    data={[
                      {
                        value: 'come_from_api_json_format',
                        label: 'Come from Api/JSON format...',
                      },
                    ]}
                    {...form.getInputProps('state')}
                  />
                  <TextInput
                    label="Zip Code"
                    type={'number'}
                    placeholder="Zip Code"
                    {...form.getInputProps('zip')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>

            {/* shipping address */}
            <Accordion.Item
              value="shipping_address"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Shipping Address" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
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
                  <Select
                    label="City"
                    placeholder="City"
                    data={[
                      {
                        value: 'come_from_api_json_format',
                        label: 'Come from Api/JSON format...',
                      },
                    ]}
                    {...form.getInputProps('city')}
                  />
                  <Select
                    label="State"
                    placeholder="State"
                    data={[
                      {
                        value: 'come_from_api_json_format',
                        label: 'Come from Api/JSON format...',
                      },
                    ]}
                    {...form.getInputProps('state')}
                  />
                  <TextInput
                    label="Zip Code"
                    type={'number'}
                    placeholder="Zip Code"
                    {...form.getInputProps('zip')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* documents */}
            <Accordion.Item value="documents" style={{ borderBottom: 'none' }}>
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Documents" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Document Name "
                    type={'text'}
                    placeholder="Document Name "
                    {...form.getInputProps('document_name')}
                  />
                  <Select
                    label="Document Type "
                    placeholder="Document Type "
                    data={[
                      {
                        value: 'premium',
                        label: 'Premium',
                      },
                      {
                        value: 'regular',
                        label: 'Regular',
                      },
                    ]}
                    {...form.getInputProps('document_type')}
                  />
                  <Select
                    label="Status"
                    placeholder="Status"
                    data={[
                      {
                        value: 'blank',
                        label: 'Blank',
                      },
                    ]}
                    {...form.getInputProps('status')}
                  />

                  <FileInput
                    label="Attachments"
                    placeholder="Attachments"
                    icon={<IconPaperclip size={14} />}
                    {...form.getInputProps('attachments')}

                    // accept="image/png,image/jpeg, "
                  />
                  <TextInput
                    label="Expiry Date"
                    type={'date'}
                    placeholder="Expiry Date"
                    {...form.getInputProps('expiry_date')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Button fullWidth type="submit" mt="md" mb="lg">
            Update Now
          </Button>
        </form>
      </Paper>
    </>
  )
}
