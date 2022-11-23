import useEditSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useEditSubmission'
import { TSubmission } from '@/types/submission-type'
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
import EmployeeDetailsForm from './details/employeeDetailsForm'
import VendorDetailsForm from './details/vendorDetailsForm'
import EmployeeIdList from './employeeIdList'
import VendorIdList from './vendorIdList'
import { TAEmployee } from '@/types/employee-type'
import { TVendor } from '@/types'
import { IconExternalLink } from '@tabler/icons'
import { TRecruitersFindAll } from '@/types/recruiters-type'
import axiosPrivate from '@/services/axiosPrivate'
import { recruitersQueryKeys } from '@/react-query/queryKeys'
import { useQuery } from 'react-query'
import { TCandidate } from '@/types/candidate-type'
import { UsState } from '@/pages/data/usState'
import useGetClientById from '@/pages/client/hooks/useGetClientById'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    height: '100%',
    overflow: 'auto',
    display: 'block',
    marginBottom: '32px',
  },
}))

export default function EditForm(submissionData: TSubmission) {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientUuid = params.get('client_id')

  const { classes } = useStyles()
  const { mutate: editSubmission } = useEditSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)

  const [employeeDetails, setEmployeeDetails] = useState({} as TCandidate)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)

  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)

  const { data: clientData } = useGetClientById(String(clientUuid))

  const [searchValue, onSearchChange] = useState('')

  const form = useForm<TSubmission>({
    // validate: zodResolver(zSubmissionEdit),
    initialValues: submissionData,
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

  // get recruiters api function
  const findAlRecruiter = async () => {
    const response = await axiosPrivate.get<TRecruitersFindAll>(`/recruiters`)
    return response.data
  }
  const { data: recruiter } = useQuery<TRecruitersFindAll, Error>(
    recruitersQueryKeys.recruiters,
    findAlRecruiter
  )

  const handleSubmit = (values: TSubmission) => {
    const submissionCreateData = {
      ...values,
      employeeName,
      vendorName,
    }

    editSubmission(submissionCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Submission Edited successfully.',
    })
  }

  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Select
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
              label="SSN"
              type={'text'}
              placeholder="SSN"
              {...form.getInputProps('ssn')}
            />
            <TextInput
              label="Phone"
              type={'number'}
              placeholder="Phone"
              {...form.getInputProps('phone')}
            />
            <TextInput
              label="Email"
              type={'email'}
              placeholder="Email"
              {...form.getInputProps('email')}
            />
            <TextInput
              label="DOB"
              type={'date'}
              placeholder="DOB"
              {...form.getInputProps('dob')}
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
          <Group grow align="center" mt="md">
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
            <TextInput
              readOnly={true}
              label="Client"
              type={'text'}
              placeholder="Client"
              value={clientName || ''}
              // rightSection={
              //   clientData?.data?.uuid ? (
              //     <IconExternalLink
              //       size="20"
              //       color="grey"
              //       cursor="pointer"
              //       onClick={() => {
              //         setClientDetailsOpened(true)
              //       }}
              //     />
              //   ) : null
              // }
            />

            <TextInput
              key={employeeDetails?.uuid}
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
              label="Immigration Status"
              placeholder="Immigration Status"
              data={[
                { value: 'IS_USC', label: 'USC' },
                { value: 'IS_H1', label: 'H1' },
                { value: 'IS_GREEN_CARD', label: 'Green Card' },
              ]}
              {...form.getInputProps('immigration_status')}
            />
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
              {...form.getInputProps('linkedin_url')}
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
              label="Currently working with Employer"
              placeholder="Currently working with Employer"
              data={[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ]}
              {...form.getInputProps('recruitment_manager_uuid')}
            />
            <Select
              label="Recruitment Manager"
              placeholder="Recruitment Manager"
              data={[
                { value: 'Jhon', label: 'Jhon' },
                { value: 'Rona', label: 'Rona' },
                { value: 'Dev', label: 'Dev' },
              ]}
              {...form.getInputProps('recruitment_manager_uuid')}
            />
            <Select
              label="Account Manager"
              placeholder="Account Manager"
              data={[
                { value: 'Pradeep', label: 'Pradeep' },
                { value: 'Rama', label: 'Rama' },
              ]}
              {...form.getInputProps('account_manager_uuid')}
            />
            <Select
              label="Recruiters"
              placeholder="Recruiters"
              data={[
                { value: 'Ranjit', label: 'Ranjit' },
                { value: 'Vishal', label: 'Vishal' },
                { value: 'Roshan', label: 'Roshan' },
              ]}
              {...form.getInputProps('recruiter_uuid')}
            />
          </Group>
          <Textarea
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
          <EmployeeDetailsForm {...employeeDetails} />
        </Drawer>
        {/* employeeData={employeeDetails} */}
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
