import useEditClient from '@/pages/client/hooks/useEditClient'
import TextDivider from '@/components/elements/text-divider'
import { TClient, TClientFindAll } from '@/types'
import {
  createStyles,
  Group,
  Accordion,
  TextInput,
  Textarea,
  Tooltip,
  ActionIcon,
  Drawer,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { IconArrowBackUp, IconEdit } from '@tabler/icons'
import { useState } from 'react'
import EditClient from '@/components/form/client/editForm'
import axiosPrivate from '@/services/axiosPrivate'
import { useQuery } from 'react-query'
import { clientQueryKeys } from '@/react-query/queryKeys'
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

export default function ClientDetails(clientDetailsData: TClient) {
  const { classes } = useStyles()
  const { mutate: clientDetails } = useEditClient()
  const [clientEditData, setClientEditData] = useState({} as TClient)
  const [isOpened, setIsOpened] = useState(false)

  // get client api function
  const findAlClient = async () => {
    const response = await axiosPrivate.get<TClientFindAll>(`/client`)
    return response.data
  }
  const { data: client } = useQuery<TClientFindAll, Error>(
    clientQueryKeys.allClients,
    findAlClient
  )

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
      <div
        className={classes.paper}
        style={{
          padding: '10px',
          height: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
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
            {client?.data.map((item) => {
              return (
                <Tooltip
                  key={item.uuid}
                  label="Click to edit client"
                  color="blue"
                  withArrow
                  transition="slide-left"
                  transitionDuration={500}
                >
                  <ActionIcon variant="light" radius="xl" color={'blue'}>
                    <IconEdit
                      size={18}
                      cursor="pointer"
                      onClick={() => {
                        setIsOpened(true)
                        setClientEditData(item)
                      }}
                    />
                  </ActionIcon>
                </Tooltip>
              )
            })}
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
                    value={
                      clientDetailsData.first_name
                        ? clientDetailsData.first_name
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Last Name"
                    type={'text'}
                    placeholder="Last Name"
                    value={
                      clientDetailsData.last_name
                        ? clientDetailsData.last_name
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Display Name"
                    type={'text'}
                    placeholder="Display Name"
                    // value={clientDetailsData.display_name ? clientDetailsData.display_name : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Account Status"
                    type={'text'}
                    placeholder="Account Status"
                    // value={clientDetailsData.account_status ? clientDetailsData.account_status : 'N/A'}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Account Owner"
                    type={'text'}
                    placeholder="Account Owner"
                    // value={clientDetailsData.account_owner ? clientDetailsData.account_owner : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Phone"
                    type={'number'}
                    placeholder="Phone"
                    value={
                      clientDetailsData.primary_phone
                        ? clientDetailsData.primary_phone
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Email"
                    type={'email'}
                    placeholder="Email"
                    value={
                      clientDetailsData.primary_email
                        ? clientDetailsData.primary_email
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Industry"
                    type={'text'}
                    placeholder="Industry"
                    // value={clientDetailsData.industry ? clientDetailsData.industry : 'N/A'}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Website"
                    type={'text'}
                    placeholder="Website"
                    // value={clientDetailsData.website ? clientDetailsData.website : 'N/A'}
                  />

                  <TextInput
                    readOnly={true}
                    label="Contract End Date"
                    type={'date'}
                    placeholder="Contract End Date"
                    // value={clientDetailsData.contract_end_date ? clientDetailsData.contract_end_date : 'N/A'}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    readOnly={true}
                    label="Description"
                    placeholder="Description"
                    // value={clientDetailsData.description ? clientDetailsData.description : 'N/A'}
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
                    // value={clientDetailsData.billing_cycle ? clientDetailsData.billing_cycle : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Payment Frequency"
                    type={'text'}
                    placeholder="Payment Frequency"
                    // value={clientDetailsData.payment_frequency ? clientDetailsData.payment_frequency : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Invoicing Template"
                    placeholder="Invoicing Template"
                    // value={clientDetailsData.invoicing_template ? clientDetailsData.invoicing_template : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Format of Timesheet"
                    placeholder="Format of Timesheet"
                    // value={clientDetailsData.format_of_template ? clientDetailsData.format_of_template : 'N/A'}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    label="Remarks"
                    placeholder="Remarks"
                    // value={clientDetailsData.remarks ? clientDetailsData.remarks : 'N/A'}
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
                    value={
                      clientDetailsData.address_line1
                        ? clientDetailsData.address_line1
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Address 2"
                    type={'text'}
                    placeholder="Address 2"
                    value={
                      clientDetailsData.address_line2
                        ? clientDetailsData.address_line2
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={
                      clientDetailsData.city ? clientDetailsData.city : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={
                      clientDetailsData.state ? clientDetailsData.state : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Zip Code"
                    type={'number'}
                    placeholder="Zip Code"
                    value={
                      clientDetailsData.zip ? clientDetailsData.zip : 'N/A'
                    }
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
                    value={
                      clientDetailsData.address_line1
                        ? clientDetailsData.address_line1
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Address 2"
                    type={'text'}
                    placeholder="Address 2"
                    value={
                      clientDetailsData.address_line2
                        ? clientDetailsData.address_line2
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={
                      clientDetailsData.city ? clientDetailsData.city : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={
                      clientDetailsData.state ? clientDetailsData.state : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Zip Code"
                    type={'number'}
                    placeholder="Zip Code"
                    value={
                      clientDetailsData.zip ? clientDetailsData.zip : 'N/A'
                    }
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
                    // value={clientDetailsData.document_name ? clientDetailsData.document_name : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Document Type"
                    type={'text'}
                    placeholder="Document Type"
                    // value={clientDetailsData.document_type ? clientDetailsData.document_type : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                    value={
                      clientDetailsData.status
                        ? clientDetailsData.status
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Attachments"
                    type={'text'}
                    placeholder="Attachments"
                    // value={clientDetailsData.attachments ? clientDetailsData.attachments : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Expiry Date"
                    type={'date'}
                    placeholder="Expiry Date"
                    // value={clientDetailsData.expiry_date ? clientDetailsData.expiry_date : 'N/A'}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </form>
        <Drawer
          opened={isOpened}
          onClose={() => setIsOpened(false)}
          title="Edit Client"
          padding="xl"
          size="1200px"
          position="right"
        >
          <EditClient {...clientEditData} />
        </Drawer>
      </div>
    </>
  )
}

// import useEditClient from '@/pages/client/hooks/useEditClient'
// import TextDivider from '@/components/elements/text-divider'
// import { TClient } from '@/types'
// import {
//   TextInput,
//   Button,
//   Group,
//   createStyles,
//   Paper,
//   FileInput,
//   Accordion,
//   Select,
//   Textarea,
// } from '@mantine/core'
// import { useForm } from '@mantine/form'
// import { showNotification } from '@mantine/notifications'
// import { IconPaperclip } from '@tabler/icons'
// const useStyles = createStyles(() => ({
//   paper: {
//     boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
//   },
// }))

// export default function EditForm(clientData: TClient) {
//   const { classes } = useStyles()
//   const { mutate: editClient } = useEditClient()

//   const form = useForm<TClient>({
//     // validate: zodResolver(zClientEdit),
//     initialValues: clientData,
//     validateInputOnChange: true,
//     clearInputErrorOnChange: true,
//   })

//   const handleSubmit = (values: TClient) => {
//     const clientEditData = {
//       ...values,
//     }

//     editClient(clientEditData)

//     showNotification({
//       title: 'Success!!',
//       message: 'Client Edited successfully.',
//     })
//   }

//   return (
//     <>
//       <Paper
//         p={20}
//         mt={30}
//         radius="sm"
//         className={classes.paper}
//         style={{
//           padding: '10px',
//           height: '90vh',
//           overflowY: 'auto',
//           scrollbarWidth: 'none',
//         }}
//       >
//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Accordion defaultValue="client_details">
//             <Accordion.Item
//               value="client_details"
//               style={{ borderBottom: 'none' }}
//             >
//               <Accordion.Control style={{ padding: '0' }}>
//                 <TextDivider label="Account Information" />
//               </Accordion.Control>

//               {/* account info */}
//               <Accordion.Panel>
//                 <Group grow align="center" mt="md">
//                   <TextInput
//                     label="First Name"
//                     type={'text'}
//                     placeholder="First Name"
//                     {...form.getInputProps('first_name')}
//                   />
//                   <TextInput
//                     label="Last Name"
//                     type={'text'}
//                     placeholder="Last Name"
//                     {...form.getInputProps('last_name')}
//                   />
//                   <TextInput
//                     label="Display Name"
//                     type={'text'}
//                     placeholder="Display Name"
//                     {...form.getInputProps('display_name')}
//                   />
//                   <Select
//                     label="Account Status"
//                     placeholder="Account Status"
//                     {...form.getInputProps('account_status')}
//                     data={[
//                       { value: 'active', label: 'Active' },
//                       { value: 'inactive', label: 'Inactive' },
//                     ]}
//                   />
//                 </Group>
//                 <Group grow align="center" mt="md">
//                   <Select
//                     label="Account Owner"
//                     placeholder="Account Owner"
//                     {...form.getInputProps('account_owner')}
//                     data={[
//                       {
//                         value: 'get_from_api',
//                         label: 'Acc Owner Get From Api...',
//                       },
//                     ]}
//                   />
//                   <TextInput
//                     label="Phone"
//                     type={'number'}
//                     placeholder="Phone"
//                     {...form.getInputProps('primary_phone')}
//                   />
//                   <TextInput
//                     label="Email"
//                     type={'email'}
//                     placeholder="Email"
//                     {...form.getInputProps('primary_email')}
//                   />
//                   <Select
//                     label="Industry"
//                     placeholder="Industry"
//                     {...form.getInputProps('industry')}
//                     data={[
//                       {
//                         value: 'active',
//                         label: 'Come from Api/JSON format...',
//                       },
//                     ]}
//                   />
//                 </Group>
//                 <Group grow align="center" mt="md">
//                   <TextInput
//                     label="Website"
//                     type={'text'}
//                     placeholder="Website"
//                     {...form.getInputProps('website')}
//                   />

//                   <TextInput
//                     label="Contract End Date"
//                     type={'date'}
//                     placeholder="Contract End Date"
//                     {...form.getInputProps('contract_end_date')}
//                   />
//                 </Group>
//                 <Group grow align="center" mt="md">
//                   <Textarea
//                     label="Description"
//                     type={'text'}
//                     placeholder="Description"
//                     {...form.getInputProps('description')}
//                   />
//                 </Group>
//               </Accordion.Panel>
//             </Accordion.Item>
//             {/* invoicing details */}
//             <Accordion.Item
//               value="invoice_details"
//               style={{ borderBottom: 'none' }}
//             >
//               <Accordion.Control style={{ padding: '0' }}>
//                 <TextDivider label="Invoice Details" />
//               </Accordion.Control>
//               <Accordion.Panel>
//                 <Group grow align="center" mt="md">
//                   <Select
//                     label="BIlling Cycle"
//                     placeholder="BIlling Cycle"
//                     data={[
//                       { value: 'weekly', label: 'Weekly' },
//                       { value: 'bi_weekly', label: 'Bi-Weekly' },
//                       { value: 'monthly', label: 'Monthly' },
//                       { value: 'semi_monthly', label: 'Semi-Monthly' },
//                     ]}
//                     {...form.getInputProps('billing_cycle')}
//                   />
//                   <Select
//                     label="Payment Frequency"
//                     placeholder="Payment Frequency"
//                     data={[
//                       { value: 'NET_0', label: 'Net 0' },
//                       { value: 'NET_3', label: 'Net 3' },
//                       {
//                         value: 'NET_5',
//                         label: 'Net 5',
//                       },
//                       { value: 'NET_10', label: 'Net 10' },
//                       { value: 'NET_30', label: 'Net 30' },
//                       { value: 'NET_45', label: 'Net 45' },
//                     ]}
//                     {...form.getInputProps('payment_frequency')}
//                   />
//                   <FileInput
//                     label="Invoicing Template"
//                     placeholder="Invoicing Template"
//                     icon={<IconPaperclip size={14} />}
//                     {...form.getInputProps('invoicing_template')}
//                   />
//                   <FileInput
//                     label="Format of Timesheet"
//                     placeholder="Format of Timesheet"
//                     icon={<IconPaperclip size={14} />}
//                     {...form.getInputProps('format_of_template')}
//                   />
//                 </Group>
//                 <Group grow align="center" mt="md">
//                   <Textarea
//                     label="Remarks"
//                     placeholder="Remarks"
//                     {...form.getInputProps('remarks')}
//                   />
//                 </Group>
//               </Accordion.Panel>
//             </Accordion.Item>
//             {/* Billing address */}
//             <Accordion.Item
//               value="billing_address"
//               style={{ borderBottom: 'none' }}
//             >
//               <Accordion.Control style={{ padding: '0' }}>
//                 <TextDivider label="Billing Address" />
//               </Accordion.Control>
//               <Accordion.Panel>
//                 <Group grow align="center" mt="md">
//                   <TextInput
//                     label="Address 1"
//                     type={'text'}
//                     placeholder="Address 1"
//                     {...form.getInputProps('address_line1')}
//                   />
//                   <TextInput
//                     label="Address 2"
//                     type={'text'}
//                     placeholder="Address 2"
//                     {...form.getInputProps('address_line2')}
//                   />
//                   <Select
//                     label="City"
//                     placeholder="City"
//                     data={[
//                       {
//                         value: 'come_from_api_json_format',
//                         label: 'Come from Api/JSON format...',
//                       },
//                     ]}
//                     {...form.getInputProps('city')}
//                   />
//                   <Select
//                     label="State"
//                     placeholder="State"
//                     data={[
//                       {
//                         value: 'come_from_api_json_format',
//                         label: 'Come from Api/JSON format...',
//                       },
//                     ]}
//                     {...form.getInputProps('state')}
//                   />
//                   <TextInput
//                     label="Zip Code"
//                     type={'number'}
//                     placeholder="Zip Code"
//                     {...form.getInputProps('zip')}
//                   />
//                 </Group>
//               </Accordion.Panel>
//             </Accordion.Item>

//             {/* shipping address */}
//             <Accordion.Item
//               value="shipping_address"
//               style={{ borderBottom: 'none' }}
//             >
//               <Accordion.Control style={{ padding: '0' }}>
//                 <TextDivider label="Shipping Address" />
//               </Accordion.Control>
//               <Accordion.Panel>
//                 <Group grow align="center" mt="md">
//                   <TextInput
//                     label="Address 1"
//                     type={'text'}
//                     placeholder="Address 1"
//                     {...form.getInputProps('address_line1')}
//                   />
//                   <TextInput
//                     label="Address 2"
//                     type={'text'}
//                     placeholder="Address 2"
//                     {...form.getInputProps('address_line2')}
//                   />
//                   <Select
//                     label="City"
//                     placeholder="City"
//                     data={[
//                       {
//                         value: 'come_from_api_json_format',
//                         label: 'Come from Api/JSON format...',
//                       },
//                     ]}
//                     {...form.getInputProps('city')}
//                   />
//                   <Select
//                     label="State"
//                     placeholder="State"
//                     data={[
//                       {
//                         value: 'come_from_api_json_format',
//                         label: 'Come from Api/JSON format...',
//                       },
//                     ]}
//                     {...form.getInputProps('state')}
//                   />
//                   <TextInput
//                     label="Zip Code"
//                     type={'number'}
//                     placeholder="Zip Code"
//                     {...form.getInputProps('zip')}
//                   />
//                 </Group>
//               </Accordion.Panel>
//             </Accordion.Item>
//             {/* documents */}
//             <Accordion.Item value="documents" style={{ borderBottom: 'none' }}>
//               <Accordion.Control style={{ padding: '0' }}>
//                 <TextDivider label="Documents" />
//               </Accordion.Control>
//               <Accordion.Panel>
//                 <Group grow align="center" mt="md">
//                   <TextInput
//                     label="Document Name "
//                     type={'text'}
//                     placeholder="Document Name "
//                     {...form.getInputProps('document_name')}
//                   />
//                   <Select
//                     label="Document Type "
//                     placeholder="Document Type "
//                     data={[
//                       {
//                         value: 'premium',
//                         label: 'Premium',
//                       },
//                       {
//                         value: 'regular',
//                         label: 'Regular',
//                       },
//                     ]}
//                     {...form.getInputProps('document_type')}
//                   />
//                   <Select
//                     label="Status"
//                     placeholder="Status"
//                     data={[
//                       {
//                         value: 'blank',
//                         label: 'Blank',
//                       },
//                     ]}
//                     {...form.getInputProps('status')}
//                   />

//                   <FileInput
//                     label="Attachments"
//                     placeholder="Attachments"
//                     icon={<IconPaperclip size={14} />}
//                     {...form.getInputProps('attachments')}

//                     // accept="image/png,image/jpeg, "
//                   />
//                   <TextInput
//                     label="Expiry Date"
//                     type={'date'}
//                     placeholder="Expiry Date"
//                     {...form.getInputProps('expiry_date')}
//                   />
//                 </Group>
//               </Accordion.Panel>
//             </Accordion.Item>
//           </Accordion>

//           <Button fullWidth type="submit" mt="md" mb="lg">
//             Update Now
//           </Button>
//         </form>
//       </Paper>
//     </>
//   )
// }
