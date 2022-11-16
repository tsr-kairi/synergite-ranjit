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
  const { classes } = useStyles()
  const { mutate: editSubmission } = useEditSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)

  const [employeeDetails, setEmployeeDetails] = useState({} as TCandidate)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)

  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)

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
            {/* {vendorName ? ( */}
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
            <Select
              label="Client"
              placeholder="Client"
              data={[{ value: 'Pradeep', label: 'Pradeep' }]}
              {...form.getInputProps('client')}
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
              required
              label="Bill Rate"
              type={'text'}
              placeholder="Bill Rate"
              {...form.getInputProps('bill_rate')}
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
