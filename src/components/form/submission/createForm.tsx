import { TSubmissionCreate } from '@/types/submission-type'
import { useState } from 'react'
import {
  Accordion,
  Box,
  Button,
  createStyles,
  Divider,
  Drawer,
  Group,
  Paper,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconExternalLink, IconInfoCircle } from '@tabler/icons'
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
import ClientDetailsForm from './details/clientDetailsForm'
import { UsState } from '@/pages/data/usState'
import useGetJobById from '@/pages/client/hooks/useGetJobById'

// useStyles is used for entire components styles
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    // height: '100%',
    // overflow: 'auto',
    // display: 'block',
    // marginBottom: '32px',
  },
}))

// export default function CreateForm() {

const CreateForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientUuid = params.get('client_id')
  const { jobId } = useParams()

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
  const { data: jobData } = useGetJobById(String(jobId))

  // const [rejected, setRejected] = useState(false)

  const [searchValue, onSearchChange] = useState('')

  const form = useForm<TSubmissionCreate>({
    // validate: zodResolver(zSubmissionCreate),
    initialValues: {
      first_name: '',
      last_name: '',

      // new field Nov
      job_title: '',
      candidate_location: '',
      // client: '',
      employment_type: '',
      pay_rate: '',
      pay_type: '',
      bill_type: '',
      bill_rate: '',
      submitted_by: '',
      submitted_date: '',
      ssn: '',
      dob: '',
      passport_no: '',
      linkedin_url: '',
      currently_working_with_employer: '',
      company_name: '',
      employer_name: '',
      employer_phone_no: '',
      employer_email_id: '',
      employer_fax_no: '',
      immigration_status: '',

      recruitment_mgr_id: '',
      acct_mgr_id: '',

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
      // recruitment_mgr_id: '',
      // acct_mgr_id: '',
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
      <Paper
        p={20}
        radius="sm"
        className={classes.paper}
        style={{
          padding: '10px',
          height: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          scrollBehavior: 'smooth',
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* <Accordion defaultValue="submission">
            <Accordion.Item value="submission" style={{ borderBottom: 'none' }}>
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Submission Core" />
              </Accordion.Control>
              <Accordion.Panel> */}
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
              clearable
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

            {/* <TextInput
              label="Employment Type"
              type={'text'}
              placeholder="Employment Type"
              value={
                employeeDetails?.employment_type
                  ? employeeDetails?.employment_type
                  : 'N/A'
              }
              // {...form.getInputProps('first_name')}
            /> */}

            {form.values?.employment_type === 'ET_C2C' && (
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
          <Group grow align="center" mt="md">
            <TextInput
              label="First Name"
              type={'text'}
              placeholder="First Name"
              value={
                employeeDetails?.first_name
                  ? employeeDetails?.first_name
                  : 'N/A'
              }
              // {...form.getInputProps('first_name')}
            />
            <TextInput
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              value={
                employeeDetails?.last_name ? employeeDetails?.last_name : 'N/A'
              }
              // {...form.getInputProps('last_name')}
            />
            {/* <Select
              data={[
                { value: 'None Selected', label: 'None Selected' },
                {
                  value: 'Application Packaging Engineer',
                  label: 'Application Packaging Engineer',
                },
                {
                  value: 'Architect',
                  label: 'Architect',
                },
                {
                  value: 'Assoc Business Analyst',
                  label: 'Assoc Business Analyst',
                },
                {
                  value: 'Assoc Developer',
                  label: 'Assoc Developer',
                },
                {
                  value: 'Assoc QA Analyst',
                  label: 'Assoc QA Analyst',
                },
                {
                  value: 'Associate Java Developer',
                  label: 'Associate Java Developer',
                },
                {
                  value: 'BI Developer',
                  label: 'BI Developer',
                },
                {
                  value: 'Business Intelligence Analyst',
                  label: 'Business Intelligence Analyst',
                },
                {
                  value: 'Business Systems Analyst',
                  label: 'Business Systems Analyst',
                },
                {
                  value: 'Chief Strategy Officer',
                  label: 'Chief Strategy Officer',
                },
                {
                  value: 'Client Relations Director',
                  label: 'Client Relations Director',
                },
                {
                  value: 'Cloud Data Solutions Developer',
                  label: 'Cloud Data Solutions Developer',
                },
                {
                  value: 'Cloud Data Solutions Developer',
                  label: 'Cloud Data Solutions Developer',
                },
              ]}
              placeholder="Job Title"
              label="Job Title"
              {...form.getInputProps('job_title')}
            /> */}
            <TextInput
              label="Job Title"
              type={'text'}
              placeholder="Job Title"
              value={
                jobData?.data?.job_title ? jobData?.data?.job_title : 'N/A'
              }
              // {...form.getInputProps('last_name')}
            />
            <Select
              clearable
              label="Candidate Location"
              placeholder="Candidate Location"
              data={[{ value: 'USA', label: 'USA' }]}
              {...form.getInputProps('candidate_location')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="SSN"
              type={'text'}
              placeholder="SSN"
              {...form.getInputProps('ssn')}
            />
            <TextInput
              label="Phone"
              type={'number'}
              placeholder="Phone"
              value={employeeDetails?.phone ? employeeDetails?.phone : 'N/A'}
              // {...form.getInputProps('phone')}
            />
            <TextInput
              label="Email"
              type={'email'}
              placeholder="Email"
              value={employeeDetails?.email ? employeeDetails?.email : 'N/A'}
              // {...form.getInputProps('email')}
            />
            <TextInput
              label="DOB"
              type={'date'}
              placeholder="DOB"
              value={employeeDetails?.dob ? employeeDetails?.dob : 'N/A'}
              // {...form.getInputProps('dob')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              label="Bill Rate"
              type={'number'}
              placeholder="Bill Rate"
              {...form.getInputProps('bill_rate')}
            />
            <Select
              clearable
              label="Bill Type"
              placeholder="Bill Type"
              data={[
                { value: 'BT_WEEKLY', label: 'Weekly' },
                { value: 'BT_BI_WEEKLY', label: 'Bi-Weekly' },
                { value: 'BT_MONTHLY', label: 'Monthly' },
                { value: 'BT_SEMI_MONTHLY', label: 'Semi Monthly' },
              ]}
              {...form.getInputProps('bill_type')}
            />
            <Select
              clearable
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
              label="Pay Type"
              type={'number'}
              placeholder="Pay Type"
              {...form.getInputProps('pay_type')}
            />
          </Group>

          {/* ) : null} */}
          <Group grow align="center" mt="md">
            <Select
              clearable
              data={
                recruiter?.data.map((r) => {
                  return { value: r.uuid, label: r.fname }
                }) || []
              }
              label="Recruiters"
              placeholder="Recruiters"
              {...form.getInputProps('recruiters')}
            />
            {form.values.employment_type === 'ET_C2C' ? (
              <Select
                clearable
                label="Immigration Status"
                placeholder="Immigration Status"
                data={[{ value: 'N/A', label: 'N/A' }]}
                {...form.getInputProps('immigration_status')}
              />
            ) : (
              <Select
                clearable
                label="Immigration Status"
                placeholder="Immigration Status"
                data={[
                  { value: 'IS_USC', label: 'USC' },
                  { value: 'IS_H1', label: 'H1' },
                  { value: 'IS_GREEN_CARD', label: 'Green Card' },
                ]}
                {...form.getInputProps('immigration_status')}
              />
            )}
            <Select
              clearable
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
                clearable
                data={[
                  { value: 'Client Rejected', label: 'Client Rejected' },
                  {
                    value: 'Position on Hold',
                    label: 'Position on Hold',
                  },
                  {
                    value: 'Internally rejected',
                    label: 'Internally rejected',
                  },
                  { value: 'Others', label: 'Others' },
                ]}
                label="Rejection Reason"
                placeholder="Rejection Reason"
                {...form.getInputProps('rejection_reason')}
              />
            )}
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              label="Passport No"
              type={'text'}
              placeholder="Passport No"
              {...form.getInputProps('passport_no')}
            />
            <TextInput
              label="Linkedin Url"
              type={'text'}
              placeholder="Linkedin Url"
              value={
                employeeDetails?.linkedin_url
                  ? employeeDetails?.linkedin_url
                  : 'N/A'
              }
              // {...form.getInputProps('linkedin_url')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              label="Job Id"
              type={'text'}
              placeholder="Job Id"
              {...form.getInputProps('job_id')}
            />
            <Select
              clearable
              label="State"
              placeholder="State"
              searchable
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              nothingFound="No Matching State"
              data={UsState.map((s) => {
                return { value: s.state, label: s.state }
              })}
              {...form.getInputProps('city')}
            />
            <Select
              clearable
              data={[{ value: 'Come From Api', label: 'Come From Api' }]}
              label="Submitted By"
              placeholder="Submitted By"
              {...form.getInputProps('submitted_by')}
            />
            <TextInput
              label="Submitted Date"
              type={'date'}
              placeholder="Submitted Date"
              {...form.getInputProps('submitted_date')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Select
              clearable
              label="Currently working with Employer"
              placeholder="Currently working with Employer"
              data={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              {...form.getInputProps('currently_working_with_employer')}
            />
            <Select
              clearable
              label="Recruitment Manager"
              placeholder="Recruitment Manager"
              data={[
                { value: 'Jhon', label: 'Jhon' },
                { value: 'Rona', label: 'Rona' },
                { value: 'Dev', label: 'Dev' },
              ]}
              {...form.getInputProps('recruitment_mgr_id')}
            />
            <Select
              clearable
              label="Account Manager"
              placeholder="Account Manager"
              data={[
                { value: 'Pradeep', label: 'Pradeep' },
                { value: 'Rama', label: 'Rama' },
              ]}
              {...form.getInputProps('acct_mgr_id')}
            />
            {/* <Select
              label="Recruiters"
              placeholder="Recruiters"
              data={[
                { value: 'Ranjit', label: 'Ranjit' },
                { value: 'Vishal', label: 'Vishal' },
                { value: 'Roshan', label: 'Roshan' },
              ]}
              {...form.getInputProps('recruiter_uuid')}
            /> */}
          </Group>
          <Textarea
            required
            label="Remarks"
            type={'text'}
            placeholder="Remarks"
            mt="md"
            {...form.getInputProps('remarks')}
          />

          {/* If the candidate is working with any employer or vendor company then fields from 30 to 34 should be displayed for further inputs */}

          {form.values.currently_working_with_employer === 'Yes' && (
            <>
              <Divider
                mb="20px"
                mt="30px"
                variant="dashed"
                label={
                  <>
                    <IconInfoCircle size={16} />
                    <Box ml={5} mt={1.5}>
                      Candidate is working with Employer, so you first fill
                      these fields and continue
                    </Box>
                  </>
                }
              />
              <Group grow align="center" mt="md">
                <TextInput
                  label="Company Name"
                  type={'text'}
                  placeholder="Company Name"
                  {...form.getInputProps('company_name')}
                />
                <TextInput
                  label="Employer Name"
                  type={'text'}
                  placeholder="Employer Name"
                  {...form.getInputProps('employer_name')}
                />
                <TextInput
                  label="Employer Phone No"
                  type={'number'}
                  placeholder="Employer Phone No"
                  {...form.getInputProps('employer_phone_no')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  label="Employer Email Id"
                  type={'email'}
                  placeholder="Employer Email Id"
                  {...form.getInputProps('employer_email_id')}
                />
                <TextInput
                  label="Employer Fax No"
                  type={'text'}
                  placeholder="Employer Fax No"
                  {...form.getInputProps('employer_fax_no')}
                />
              </Group>
            </>
          )}

          <Button fullWidth type="submit" mt="xl" mb="xl">
            Submit Now
          </Button>
          {/* </Accordion.Panel>
            </Accordion.Item>
          </Accordion> */}
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
