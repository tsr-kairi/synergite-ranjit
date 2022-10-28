import { TSubmissionCreate } from '@/types/submission-type'
import { useState } from 'react'
import {
  Button,
  createStyles,
  Drawer,
  Grid,
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
import { TCandidate } from '@/types/candidate-type'
import { TRecruitersFindAll } from '@/types/recruiters-type'
import { TJobs, TVendor } from '@/types'
import EmployeeIdList from './employeeIdList'
import useCreateSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useCreateSubmission'
import { useParams } from 'react-router-dom'
import VendorIdList from './vendorIdList'
import axiosPrivate from '@/services/axiosPrivate'
import { recruitersQueryKeys } from '@/react-query/queryKeys'
import { useQuery } from 'react-query'
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

  console.log('JobID-New', jobId)

  const { classes } = useStyles()
  const { mutate: addSubmission } = useCreateSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)

  const [employeeDetails, setEmployeeDetails] = useState({} as TCandidate)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)
  // const [employeeType] = useState({} as TJobs)

  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)

  // const [rejected, setRejected] = useState(false)

  const form = useForm<TSubmissionCreate>({
    // validate: zodResolver(zSubmissionCreate),
    initialValues: {
      first_name: '',
      last_name: '',
      city: '',
      state: '',
      country: '',
      status: '',
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
  // const recruiterName = `${recruiterData?.fname || ''} ${
  //   recruiterData?.lname || ''
  // }`

  // get recruiters api function
  const findAlRecruiter = async () => {
    const response = await axiosPrivate.get<TRecruitersFindAll>(`/recruiters`)
    return response.data
  }
  const { data: recruiter } = useQuery<TRecruitersFindAll, Error>(
    recruitersQueryKeys.recruiters,
    findAlRecruiter
  )

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
          <TextInput
            key={employeeDetails?.uuid}
            mt="md"
            required
            label="Candidate"
            type={'text'}
            placeholder="Candidate"
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
          {/* {vendorName ? ( */}
          <TextInput
            mt="md"
            required
            label="Vendor"
            type={'text'}
            placeholder="Vendor"
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
          {/* ) : null} */}

          <Grid mt="md">
            <Grid.Col span={12}>
              <Select
                data={[
                  { value: 'Selected', label: 'Selected' },
                  { value: 'Rejected', label: 'Rejected' },
                  { value: 'On Hold', label: 'On Hold' },
                ]}
                placeholder="Submission Status"
                label="Submission Status"
                {...form.getInputProps('status')}
              />
            </Grid.Col>
          </Grid>
          <Select
            mt={'md'}
            data={
              recruiter?.data.map((r) => {
                return { value: r.uuid, label: r.fname }
              }) || []
            }
            label="Recruiters"
            type={'text'}
            placeholder="Recruiters"
            {...form.getInputProps('recruiters')}
          />
          {form.values.status === 'Rejected' && (
            <Select
              mt={'md'}
              data={[
                { value: 'Client Rejected', label: 'Client Rejected' },
                { value: 'Position on Hold', label: 'Position on Hold' },
                {
                  value: 'Internally rejected',
                  label: 'Internally rejected',
                },
                { value: 'Others', label: 'Others' },
              ]}
              label="Rejection Reason"
              type={'text'}
              placeholder="Rejection Reason"
              {...form.getInputProps('rejection_reason')}
            />
          )}

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
          title="Candidate details"
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
          title="Candidate"
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
          title="Vendor"
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
