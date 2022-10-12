import { TSubmissionCreate } from '@/types/submission-type'
import { useState } from 'react'
import {
  Button,
  createStyles,
  Drawer,
  Group,
  Paper,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconExternalLink } from '@tabler/icons'
import EmployeeDetailsForm from './details/employeeDetailsForm'
import VendorDetailsForm from './details/vendorDetailsForm'
import { TAEmployee } from '@/types/employee-type'
import { TVendor } from '@/types'
import EmployeeIdList from './employeeIdList'
import useCreateSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useCreateSubmission'
import { useParams } from 'react-router-dom'
import VendorIdList from './vendorIdList'
// import { number } from 'zod'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientUuid = params.get('client_id')
  const { jobId } = useParams()

  //
  const { classes } = useStyles()
  const { mutate: addSubmission } = useCreateSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)
  const [employeeDetails, setEmployeeDetails] = useState({} as TAEmployee)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)

  //
  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)

  const [employeeUuid, setEmployeeUuid] = useState<string>('')
  const [employeeName, setEmployeeName] = useState<string>('')
  const [vendorUuid, setVendorUuid] = useState<string>('')
  const [vendorName, setVendorName] = useState<string>('')

  // console.log('New Emp', employeeName)

  const form = useForm<TSubmissionCreate>({
    // validate: zodResolver(zSubmissionCreate),
    initialValues: {
      first_name: '',
      last_name: '',
      city: '',
      state: '',
      country: '',
      submission_status: '',
      rejection_reason: '',
      recruiters: '',
      remarks: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TSubmissionCreate) => {
    const submissionCreateData = {
      ...values,
      client_id: String(clientUuid),
      vendor_id: String(vendorUuid),
      job_id: String(jobId),
      recruitment_mgr_id: '',
      acct_mgr_id: '',
      employee_id: String(employeeUuid),
    }

    addSubmission(submissionCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Submission Created successfully.',
    })
  }
  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group position="apart">
            <TextInput
              required
              label="First Name"
              type={'text'}
              placeholder="First Name"
              {...form.getInputProps('first_name')}
            />
            <TextInput
              required
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              {...form.getInputProps('last_name')}
            />
          </Group>
          <TextInput
            mt="md"
            required
            label="Vendors Name"
            type={'text'}
            placeholder="Vendors Name"
            onClick={() => {
              vendorListIsOpened(true)
            }}
            value={vendorName || ''}
            rightSection={
              <IconExternalLink
                size="20"
                color="grey"
                cursor="pointer"
                onClick={() => {
                  setVendorOpened(true)
                  // setVendorDetails()
                }}
              />
            }
            // {...form.getInputProps('vendor_id')}
          />
          <TextInput
            key={employeeName}
            mt="md"
            required
            label="Candidate Name"
            type={'text'}
            placeholder="Candidate Name"
            onClick={() => {
              employeeListIsOpened(true)
            }}
            value={employeeName || ''}
            rightSection={
              <IconExternalLink
                size="20"
                color="grey"
                cursor="pointer"
                onClick={() => {
                  setEmployeeOpened(true)
                  // setEmployeeDetails(employeeDetails)
                }}
              />
            }
            // {...form.getInputProps('em')}
          />
          <Select
            data={[
              { value: 'Unknown', label: 'Unknown' },
              { value: 'Selected', label: 'Selected' },
              { value: 'Rejected', label: 'Rejected' },
              { value: 'On Hold', label: 'On Hold' },
            ]}
            placeholder="Submission Status"
            label="Submission Status"
            mt="md"
            {...form.getInputProps('submission_status')}
          />
          <Group position="apart" mt="md">
            <TextInput
              required
              label="City"
              type={'text'}
              placeholder="City"
              {...form.getInputProps('city')}
            />
            <TextInput
              required
              label="State"
              type={'text'}
              placeholder="State"
              {...form.getInputProps('state')}
            />
          </Group>
          <Group position="apart" mt="md">
            <TextInput
              required
              label="Recruiters"
              type={'text'}
              placeholder="Recruiters"
              {...form.getInputProps('recruiters')}
            />
            <TextInput
              required
              label="Rejection Reason"
              type={'text'}
              placeholder="Rejection Reason"
              {...form.getInputProps('rejection_reason')}
            />
          </Group>
          <Textarea
            required
            label="Remarks"
            type={'text'}
            placeholder="Remarks"
            mt="md"
            {...form.getInputProps('remarks')}
          />
          <Button fullWidth type="submit" mt="xl">
            Submit Now
          </Button>
        </form>

        {/* Showing Vendor Details */}
        <Drawer
          opened={vendorOpened}
          onClose={() => setVendorOpened(false)}
          title="Vendor details"
          padding="xl"
          size="xl"
          position="right"
        >
          <VendorDetailsForm {...vendorDetails} />
        </Drawer>

        {/* Showing Employee Details */}
        <Drawer
          opened={employeeOpened}
          onClose={() => setEmployeeOpened(false)}
          title="Employee details"
          padding="xl"
          size="xl"
          position="right"
        >
          <EmployeeDetailsForm />
        </Drawer>

        {/* Showing Employee IdList */}
        <Drawer
          opened={employeeListOpened}
          onClose={() => employeeListIsOpened(false)}
          title="Employee List"
          padding="xl"
          size="xl"
          position="right"
        >
          <EmployeeIdList
            setEmployee={(employee) => {
              setEmployeeUuid(employee.uuid)
              setEmployeeName(employee.fname)
            }}
          />
        </Drawer>

        <Drawer
          opened={vendorListOpened}
          onClose={() => vendorListIsOpened(false)}
          title="Vendor List"
          padding="xl"
          size="xl"
          position="right"
        >
          <VendorIdList
            setVendor={(vendor) => {
              setVendorUuid(vendor.vendor_uuid)
              setVendorName(vendor.vendor_name)
            }}
          />
        </Drawer>
      </Paper>
    </>
  )
}
