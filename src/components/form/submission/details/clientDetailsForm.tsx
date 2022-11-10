import useEditClient from '@/pages/client/hooks/useEditClient'
import TextDivider from '@/components/elements/text-divider'
import theme from '@/theme/theme'
import { TClient } from '@/types'
import {
  createStyles,
  Group,
  Accordion,
  TextInput,
  Textarea,
  Tooltip,
  ActionIcon,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { IconArrowBackUp } from '@tabler/icons'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))

export default function ClientDetailsForm(clientDetailsData: TClient) {
  const { classes } = useStyles()
  const { mutate: clientDetails } = useEditClient()

  const form = useForm<TClient>({
    initialValues: clientDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TClient) => {
    const clientDetailsData = {
      ...values,
    }

    clientDetails(clientDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Client Details Fetched Successfully.',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group position="apart">
            <Link to={`/client`} className={classes.userLink}>
              <Tooltip
                label="Back to Client details"
                color="blue"
                withArrow
                transition="slide-left"
                transitionDuration={500}
              >
                <ActionIcon variant="light" radius="xl" color={'blue'}>
                  <IconArrowBackUp size={18} />
                </ActionIcon>
              </Tooltip>
            </Link>
          </Group>
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
                    readOnly={true}
                    label="First Name"
                    type={'text'}
                    placeholder="First Name"
                    value={clientDetailsData.first_name}
                  />
                  <TextInput
                    readOnly={true}
                    label="Last Name"
                    type={'text'}
                    placeholder="Last Name"
                    value={clientDetailsData.last_name}
                  />
                  <TextInput
                    readOnly={true}
                    label="Display Name"
                    type={'text'}
                    placeholder="Display Name"
                    // value={clientDetailsData.display_name}
                  />
                  <TextInput
                    readOnly={true}
                    label="Account Status"
                    type={'text'}
                    placeholder="Account Status"
                    // value={clientDetailsData.account_status}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Account Owner"
                    type={'text'}
                    placeholder="Account Owner"
                    // value={clientDetailsData.account_owner}
                  />
                  <TextInput
                    readOnly={true}
                    label="Phone"
                    type={'number'}
                    placeholder="Phone"
                    value={clientDetailsData.primary_phone}
                  />
                  <TextInput
                    readOnly={true}
                    label="Email"
                    type={'email'}
                    placeholder="Email"
                    value={clientDetailsData.primary_email}
                  />
                  <TextInput
                    readOnly={true}
                    label="Industry"
                    type={'text'}
                    placeholder="Industry"
                    // value={clientDetailsData.industry}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Website"
                    type={'text'}
                    placeholder="Website"
                    // value={clientDetailsData.website}
                  />

                  <TextInput
                    readOnly={true}
                    label="Contract End Date"
                    type={'date'}
                    placeholder="Contract End Date"
                    // value={clientDetailsData.contract_end_date}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    readOnly={true}
                    label="Description"
                    placeholder="Description"
                    // value={clientDetailsData.description}
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
                  <TextInput
                    readOnly={true}
                    label="BIlling Cycle"
                    type={'text'}
                    placeholder="BIlling Cycle"
                    // value={clientDetailsData.billing_cycle}
                  />
                  <TextInput
                    readOnly={true}
                    label="Payment Frequency"
                    type={'text'}
                    placeholder="Payment Frequency"
                    // value={clientDetailsData.payment_frequency}
                  />
                  <TextInput
                    readOnly={true}
                    label="Invoicing Template"
                    placeholder="Invoicing Template"
                    // value={clientDetailsData.invoicing_template}
                  />
                  <TextInput
                    readOnly={true}
                    label="Format of Timesheet"
                    placeholder="Format of Timesheet"
                    // value={clientDetailsData.format_of_template}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    label="Remarks"
                    placeholder="Remarks"
                    // value={clientDetailsData.remarks}
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
                    readOnly={true}
                    label="Address 1"
                    type={'text'}
                    placeholder="Address 1"
                    value={clientDetailsData.address_line1}
                  />
                  <TextInput
                    readOnly={true}
                    label="Address 2"
                    type={'text'}
                    placeholder="Address 2"
                    value={clientDetailsData.address_line2}
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={clientDetailsData.city}
                  />
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={clientDetailsData.state}
                  />
                  <TextInput
                    readOnly={true}
                    label="Zip Code"
                    type={'number'}
                    placeholder="Zip Code"
                    value={clientDetailsData.zip}
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
                    readOnly={true}
                    label="Address 1"
                    type={'text'}
                    placeholder="Address 1"
                    value={clientDetailsData.address_line1}
                  />
                  <TextInput
                    readOnly={true}
                    label="Address 2"
                    type={'text'}
                    placeholder="Address 2"
                    value={clientDetailsData.address_line2}
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={clientDetailsData.city}
                  />
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={clientDetailsData.state}
                  />
                  <TextInput
                    readOnly={true}
                    label="Zip Code"
                    type={'number'}
                    placeholder="Zip Code"
                    value={clientDetailsData.zip}
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
                    readOnly={true}
                    label="Document Name"
                    type={'text'}
                    placeholder="Document Name"
                    // value={clientDetailsData.document_name}
                  />
                  <TextInput
                    readOnly={true}
                    label="Document Type"
                    type={'text'}
                    placeholder="Document Type"
                    // value={clientDetailsData.document_type}
                  />
                  <TextInput
                    readOnly={true}
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                    value={clientDetailsData.status}
                  />
                  <TextInput
                    readOnly={true}
                    label="Attachments"
                    type={'text'}
                    placeholder="Attachments"
                    // value={clientDetailsData.attachments}
                  />
                  <TextInput
                    readOnly={true}
                    label="Expiry Date"
                    type={'date'}
                    placeholder="Expiry Date"
                    // value={clientDetailsData.expiry_date}
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
