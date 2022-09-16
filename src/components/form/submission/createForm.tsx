import useCreateSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useCreateSubmission'
import { TSubmissionCreate } from '@/types/submission-type'
import { useState } from 'react'
import {
  Button,
  createStyles,
  Drawer,
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
import EmployeeIdList from './idList'
// import { number } from 'zod'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const id = params.get('id')
  const { classes } = useStyles()
  const { mutate: addSubmission } = useCreateSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)
  const [employeeDetails, setEmployeeDetails] = useState({} as TAEmployee)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)
  const [opened, setIsOpened] = useState(false)
  const [empId, setEmpId] = useState<null | number>(0)
  console.log('New Emp', empId)

  const form = useForm<TSubmissionCreate>({
    // validate: zodResolver(zSubmissionCreate),
    initialValues: {
      employee_id: 0,
      vendor_id: 0,
      submission_status: '',
      remarks: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TSubmissionCreate) => {
    const submissionCreateData = {
      ...values,
      client_id: Number(id),
      job_id: Number(id),
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
          <TextInput
            required
            label="Vendors Id"
            type={'number'}
            placeholder="Vendors Id"
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
            {...form.getInputProps('vendor_id')}
          />
          <TextInput
            required
            label="Employees Id"
            type={'number'}
            placeholder="Employees Id"
            onClick={() => {
              setIsOpened(true)
            }}
            value={empId}
            rightSection={
              <IconExternalLink
                size="20"
                color="grey"
                cursor="pointer"
                // onClick={() => setEmployeeOpened(true)}
                onClick={() => {
                  setEmployeeOpened(true)
                  // setEmployeeDetails()
                }}
              />
            }
            {...form.getInputProps('employee_id')}
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
          <EmployeeDetailsForm {...employeeDetails} />
        </Drawer>

        {/* Showing Employee IdList */}
        <Drawer
          opened={opened}
          onClose={() => setIsOpened(false)}
          title="Employee Id List"
          padding="xl"
          size="xl"
          position="right"
        >
          <EmployeeIdList setEmpId={setEmpId} />
        </Drawer>
      </Paper>
    </>
  )
}

// EmployeeIdList
