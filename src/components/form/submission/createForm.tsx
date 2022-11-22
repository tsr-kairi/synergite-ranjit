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
import { TCandidate } from '@/types/candidate-type'
import { TRecruitersFindAll } from '@/types/recruiters-type'
import { TClient, TVendor } from '@/types'
import EmployeeIdList from './employeeIdList'
import useCreateSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useCreateSubmission'
import { useParams } from 'react-router-dom'
import VendorIdList from './vendorIdList'
import axiosPrivate from '@/services/axiosPrivate'
import { recruitersQueryKeys } from '@/react-query/queryKeys'
import { useQuery } from 'react-query'
import useGetClientById from '@/pages/client/hooks/useGetClientById'
import ClientDetails from '../details/client-details/clientDetails'
import ClientDetailsForm from './details/clientDetailsForm'

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

  // console.log('JobID-New', jobId)

  const { classes } = useStyles()
  const { mutate: addSubmission } = useCreateSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)
  const [clientDetailsOpened, setClientDetailsOpened] = useState(false)

  const [employeeDetails, setEmployeeDetails] = useState({} as TCandidate)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)
  // const [employeeType] = useState({} as TJobs)

  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)
  const { data: clientData } = useGetClientById(String(clientUuid))

  // const [rejected, setRejected] = useState(false)

  const form = useForm<TSubmissionCreate>({
    // validate: zodResolver(zSubmissionCreate),
    initialValues: {
      first_name: '',
      last_name: '',

      // new field Nov
      candidate_location: '',
      client: '',
      employment_type: '',
      pay_rate: '',
      bill_rate: '',
      immigration_status: '',

      status: '',
      remarks: '',
      rejection_reason: '',
      recruiters: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const employeeName = `${employeeDetails?.first_name || ''} ${
    employeeDetails?.last_name || ''
  }`
  const vendorName = `${vendorDetails?.first_name || ''} ${
    vendorDetails?.last_name || ''
  }`
  const clientName = `${clientData?.data?.first_name || ''} ${
    clientData?.data?.last_name || ''
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
    form.reset()

    showNotification({
      title: 'Success!!',
      message: 'Submission Created successfully.',
    })
  }

  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
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
          <Group grow align="center" mt="md">
            <TextInput
              key={employeeDetails?.uuid}
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
            {form.values.employment_type === 'ET_C2C' && (
              <TextInput
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
            )}
          </Group>
          {/* ) : null} */}
          <Group grow align="center" mt="md">
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
            {form.values.status === 'Rejected' && (
              <Select
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
          </Group>
          <Group grow align="center" mt="md">
            <Select
              label="Immigration Status"
              placeholder="Immigration Status"
              data={[
                { value: 'IS_USC', label: 'USC' },
                { value: 'IS_H1', label: 'H1' },
                { value: 'IS_GREEN_CARD', label: 'Green Card' },
              ]}
              {...form.getInputProps('immigration_status')}
            />
            <TextInput
              required
              label="SSN"
              type={'text'}
              placeholder="SSN"
              {...form.getInputProps('ssn')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Select
              data={
                recruiter?.data.map((r) => {
                  return { value: r.uuid, label: r.fname }
                }) || []
              }
              label="Recruiters"
              placeholder="Recruiters"
              {...form.getInputProps('recruiters')}
            />
            <Select
              label="Candidate Location"
              placeholder="Candidate Location"
              data={[{ value: 'USA', label: 'USA' }]}
              {...form.getInputProps('candidate_location')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              readOnly={true}
              key={clientData?.data?.uuid}
              label="Client"
              type={'text'}
              placeholder="Client"
              value={clientName || ''}
              rightSection={
                clientData?.data?.uuid ? (
                  <IconExternalLink
                    size="20"
                    color="grey"
                    cursor="pointer"
                    onClick={() => {
                      setClientDetailsOpened(true)
                    }}
                  />
                ) : null
              }
            />
            <Select
              label="Employment Type"
              placeholder="Employment Type"
              data={[
                { value: 'ET_W2', label: 'W2' },
                { value: 'ET_C2C', label: 'C2C' },
                { value: 'ET_1099', label: '1099' },
                {
                  value: 'ET_INTERNAL',
                  label: 'Internal Employees',
                },
              ]}
              {...form.getInputProps('employment_type')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Select
              label="Pay Rate"
              placeholder="Pay Rate"
              data={[
                { value: 'PT_HOURLY', label: 'Hourly' },
                { value: 'PT_BI_WEEKLY', label: 'Bi-Weekly' },
                { value: 'PT_FORTNIGHT', label: 'Weekly' },
                { value: 'PT_MONTHLY', label: 'Monthly' },
                { value: 'PT_ANNUALLY', label: 'Annual Salary' },
                { value: 'PR_PER_DAY', label: 'Per Day' },
              ]}
              {...form.getInputProps('pay_rate')}
            />
            <TextInput
              label="Bill Rate"
              type={'text'}
              placeholder="Bill Rate"
              {...form.getInputProps('bill_rate')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              label="DOB"
              type={'date'}
              placeholder="DOB"
              {...form.getInputProps('dob')}
            />
            <TextInput
              label="Phone"
              type={'number'}
              placeholder="Phone"
              {...form.getInputProps('phone')}
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
          size="1200px"
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
          size="1200px"
          position="right"
        >
          <EmployeeDetailsForm {...employeeDetails} />
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
              employeeListIsOpened(false)
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
              vendorListIsOpened(false)
            }}
          />
        </Drawer>

        {/* client details */}
        <Drawer
          opened={clientDetailsOpened}
          onClose={() => setClientDetailsOpened(false)}
          title="Client Details"
          padding="xl"
          size="1200px"
          position="right"
        >
          <ClientDetailsForm
            key={clientUuid}
            {...((clientData?.data || {}) as TClient)}
          />
        </Drawer>
      </Paper>
    </>
  )
}

export default CreateForm
