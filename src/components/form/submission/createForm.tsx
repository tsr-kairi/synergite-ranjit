import { TSubmissionCreate } from '@/types/submission-type'
import { useState } from 'react'
import {
  Button,
  createStyles,
  Drawer,
  Grid,
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
    height: '100%',
    overflow: 'auto',
    display: 'block',
    marginBottom: '32px',
  },
}))

const CreateForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientUuid = params.get('client_id')
  const { jobId } = useParams()

  const { classes } = useStyles()
  const { mutate: addSubmission } = useCreateSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)

  const [employeeDetails, setEmployeeDetails] = useState({} as TAEmployee)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)

  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)

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

  const employeeName = `${employeeDetails?.fname || ''} ${
    employeeDetails?.lname || ''
  }`
  const vendorName = `${vendorDetails?.first_name || ''} ${
    vendorDetails?.last_name || ''
  }`

  const handleSubmit = (values: TSubmissionCreate) => {
    const submissionCreateData = {
      ...values,
      client_id: String(clientUuid),
      employee_id: employeeDetails?.uuid,
      employee_name: employeeName,
      vendor_id: vendorDetails?.uuid,
      vendor_name: vendorName,
      job_id: String(jobId),
      recruitment_mgr_id: '',
      acct_mgr_id: '',
    }

    addSubmission(submissionCreateData)
    onClose()

    showNotification({
      title: 'Success!!',
      message: 'Submission Created successfully.',
    })
  }

  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                required
                label="First Name"
                type={'text'}
                placeholder="First Name"
                {...form.getInputProps('first_name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                required
                label="Last Name"
                type={'text'}
                placeholder="Last Name"
                {...form.getInputProps('last_name')}
              />
            </Grid.Col>
          </Grid>
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
              vendorDetails?.uuid ? (
                <IconExternalLink
                  size="20"
                  color="grey"
                  cursor="pointer"
                  onClick={() => {
                    setVendorOpened(true)
                    // setVendorDetails()
                  }}
                />
              ) : null
            }
          />
          <TextInput
            key={employeeDetails?.uuid}
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
              employeeDetails?.uuid ? (
                <IconExternalLink
                  size="20"
                  color="grey"
                  cursor="pointer"
                  onClick={() => {
                    setEmployeeOpened(true)
                    // setEmployeeDetails(employeeDetails)
                  }}
                />
              ) : null
            }
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
          <Grid mt="md">
            <Grid.Col span={6}>
              <TextInput
                required
                label="City"
                type={'text'}
                placeholder="City"
                {...form.getInputProps('city')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                required
                label="State"
                type={'text'}
                placeholder="State"
                {...form.getInputProps('state')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                required
                label="Recruiters"
                type={'text'}
                placeholder="Recruiters"
                {...form.getInputProps('recruiters')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Rejection Reason"
                type={'text'}
                placeholder="Rejection Reason"
                {...form.getInputProps('rejection_reason')}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            required
            label="Remarks"
            type={'text'}
            placeholder="Remarks"
            mt="md"
            {...form.getInputProps('remarks')}
          />
          <Button fullWidth type="submit" mt="xl" mb="xl">
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
          <EmployeeDetailsForm employeeData={employeeDetails} />
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
              setEmployeeDetails(employee)
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
              setVendorDetails(vendor)
            }}
          />
        </Drawer>
      </Paper>
    </>
  )
}

export default CreateForm
