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

  const [employeeDetails, setEmployeeDetails] = useState({} as TAEmployee)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)

  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)

  const form = useForm<TSubmission>({
    // validate: zodResolver(zSubmissionEdit),
    initialValues: submissionData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const employeeName = `${employeeDetails?.fname || ''} ${
    employeeDetails?.lname || ''
  }`
  const vendorName = `${vendorDetails?.first_name || ''} ${
    vendorDetails?.last_name || ''
  }`

  // get recruiters api function
  const findAlRecruiter = async () => {
    const response = await axiosPrivate.get<TRecruitersFindAll>(`/recruiters`)
    return response.data
  }
  const { data: recruiters } = useQuery<TRecruitersFindAll, Error>(
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
          {/* {employeeType.state === 'UP' && ( */}
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
          {/* )} */}
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
              recruiters?.data.map((r) => {
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
              setEmployeeDetails(employee as TAEmployee)
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
