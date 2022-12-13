import useEditJob from '@/pages/client/hooks/useEditJob'
import { TJobs } from '@/types'
import { useState } from 'react'
import { UsState } from '@/pages/data/usState'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  Select,
  Textarea,
  Accordion,
  FileInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import TextDivider from '@/components/elements/text-divider'
import { WCountry } from '@/pages/data/wCountry'
import { UsIndustry } from '@/pages/data/industry'
// import { WLanguages } from '@/pages/data/languages'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(jobData: TJobs) {
  const [searchValue, onSearchChange] = useState('')
  const { classes } = useStyles()
  const { mutate: editJob } = useEditJob()

  const form = useForm<TJobs>({
    // validate: zodResolver(zJobEdit),
    initialValues: jobData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TJobs) => {
    const jobEditData = {
      ...values,
    }

    editJob(jobEditData)

    showNotification({
      title: 'Success!!',
      message: 'Job Edited successfully.',
    })
  }

  return (
    <>
      <Paper
        p={20}
        mt={30}
        radius="sm"
        className={classes.paper}
        style={{
          padding: '10px',
          height: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Accordion defaultValue="job_details">
            <Accordion.Item
              value="job_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Job Details" />
              </Accordion.Control>

              {/* Job Details */}
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Client request ID"
                    type={'text'}
                    placeholder="Client request ID"
                    {...form.getInputProps('client_request_id')}
                  />

                  <Select
                    label="Status"
                    placeholder="Status"
                    data={[
                      { value: 'New', label: 'New' },
                      { value: 'Active', label: 'Active' },
                      { value: 'Rejected', label: 'Rejected' },
                      {
                        value: 'Max Submittals reached',
                        label: 'Max Submittals reached',
                      },
                      { value: 'Closed Filled', label: 'Closed Filled' },
                      {
                        value: 'Closed not Filled',
                        label: 'Closed not Filled',
                      },
                      { value: 'Synergy on Hold', label: 'Synergy on Hold' },
                      {
                        value: 'Synergy cancelled',
                        label: 'Synergy cancelled',
                      },
                      { value: 'Client-Cancelled', label: 'Client-Cancelled' },
                      { value: 'CLient-Closed', label: 'CLient-Closed' },
                      { value: 'Pipeline', label: 'Pipeline' },
                      {
                        value: 'Target Date Expired',
                        label: 'Target Date Expired',
                      },
                    ]}
                    {...form.getInputProps('status')}
                  />
                  <Select
                    label="City"
                    placeholder="City"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching City"
                    data={UsState.map((s) => {
                      return { value: s.state, label: s.state }
                    })}
                    {...form.getInputProps('city')}
                  />
                  <Select
                    label="Country"
                    placeholder="Country"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching Country"
                    data={WCountry.map((c) => {
                      return { value: c.country, label: c.country }
                    })}
                    {...form.getInputProps('country')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  {/* <TextInput
                    label="Job Title"
                    type={'text'}
                    placeholder="Job Title"
                    {...form.getInputProps('job_title')}
                  /> */}
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
                  <TextInput
                    label="No of Positions"
                    type={'number'}
                    placeholder="No of Positions"
                    {...form.getInputProps('number_of_position')}
                  />
                  <Select
                    label="Priority"
                    placeholder="Priority"
                    data={[
                      { value: '1', label: '1' },
                      { value: '2', label: '2' },
                      { value: '3', label: '3' },
                    ]}
                    {...form.getInputProps('priority')}
                  />
                  <Select
                    label="Priority reason"
                    placeholder="Priority reason"
                    data={[
                      {
                        value: 'Client wants to Hire Immediately',
                        label: 'Client wants to Hire Immediately',
                      },
                      {
                        value: 'Direct manager request',
                        label: 'Direct manager request',
                      },
                      {
                        value: 'Immediate Interviews',
                        label: 'Immediate Interviews',
                      },
                      {
                        value: 'Only Vendor',
                        label: 'Only Vendor',
                      },
                      {
                        value: 'SoW',
                        label: 'SoW',
                      },
                    ]}
                    {...form.getInputProps('priority_reason')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="Customer Type"
                    placeholder="Customer Type"
                    data={[
                      { value: 'Direct Client', label: 'Direct Client' },
                      { value: 'InDirect Client', label: 'InDirect Client' },
                    ]}
                    {...form.getInputProps('customer_type')}
                  />
                  <Select
                    label="Employment Type"
                    placeholder="Employment Type"
                    data={[
                      { value: 'C2C', label: 'C2C' },
                      { value: '1099', label: '1099' },
                      { value: 'W2', label: 'W2' },
                    ]}
                    {...form.getInputProps('employment_type')}
                  />

                  <TextInput
                    label="Bill Rate"
                    type={'number'}
                    placeholder="Bill Rate"
                    {...form.getInputProps('bill_rate')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Pay Rate"
                    type={'number'}
                    placeholder="Pay Rate"
                    {...form.getInputProps('pay_rate')}
                  />
                  <TextInput
                    label="Work Experience"
                    type={'date'}
                    placeholder="Work Experience"
                    {...form.getInputProps('work_experience_in_years')}
                  />
                  <TextInput
                    label="Primary Skills"
                    type={'text'}
                    placeholder="Primary Skills"
                    {...form.getInputProps('primary_skills')}
                  />
                  <TextInput
                    label="Secondary Skills"
                    type={'text'}
                    placeholder="Secondary Skills"
                    {...form.getInputProps('secondary_skills')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="Remote Status"
                    placeholder="Remote Status"
                    data={[
                      { value: 'No Remote', label: 'No Remote' },
                      { value: 'Include Remote', label: 'Include Remote' },
                    ]}
                    {...form.getInputProps('remote_status')}
                  />
                  <Select
                    label="Immigration Status"
                    placeholder="Immigration Status"
                    data={[
                      { value: 'USC', label: 'USC' },
                      { value: 'H1', label: 'H1' },
                      { value: 'Green Card', label: 'Green Card' },
                    ]}
                    {...form.getInputProps('immigration_status')}
                  />
                  <TextInput
                    label="Client Contact Email"
                    type={'text'}
                    placeholder="Client Contact Email"
                    {...form.getInputProps('client_contact_email')}
                  />
                  <TextInput
                    label="Client Contact Phone"
                    type={'number'}
                    placeholder="Client Contact Phone"
                    {...form.getInputProps('client_contact_phone')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Maximum Submissions"
                    type={'number'}
                    placeholder="Maximum Submissions"
                    {...form.getInputProps('maximum_submission')}
                  />
                  <Select
                    label="Created By"
                    placeholder="Created By"
                    data={[{ value: 'All Syn Mngr', label: 'All Syn Mngr' }]}
                    {...form.getInputProps('created_by')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* Recruitment Team */}
            <Accordion.Item
              value="recruitment_team"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Recruitment Team" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <Select
                    label="Recruitment Manager"
                    type={'text'}
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
                    type={'text'}
                    placeholder="Account Manager"
                    data={[
                      { value: 'Pradeep', label: 'Pradeep' },
                      { value: 'Rama', label: 'Rama' },
                      { value: 'Rohit', label: 'Rohit' },
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
                <Group grow align="center" mt="md">
                  <Select
                    label="Primary Recruiters"
                    placeholder="Primary Recruiters"
                    data={[
                      { value: 'Ranjit', label: 'Ranjit' },
                      { value: 'Vishal', label: 'Vishal' },
                      { value: 'Roshan', label: 'Roshan' },
                    ]}
                    {...form.getInputProps('sourcer_uuid')}
                  />
                  <Select
                    label="Additional Recruiters"
                    type={'text'}
                    placeholder="Additional Recruiters"
                    data={[
                      { value: 'Ranjit', label: 'Ranjit' },
                      { value: 'Vishal', label: 'Vishal' },
                      { value: 'Roshan', label: 'Roshan' },
                    ]}
                    {...form.getInputProps('additional_recruiter_uuid')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* Recruiter Instructions Details */}
            <Accordion.Item
              value="recruiter_instructions"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Recruiter Instructions" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <Textarea
                    label="Recruiter Instructions"
                    type={'number'}
                    placeholder="Recruiter Instructions"
                    {...form.getInputProps('recruiter_instructions')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* Pay & Billing Details */}
            <Accordion.Item
              value="pay_and_billing_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Pay & Billing Details" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Client Contract Period"
                    type={'date'}
                    placeholder="Client Contract Period"
                    {...form.getInputProps('client_contract_period')}
                  />
                  <Select
                    label="Job Type"
                    placeholder="Job Type"
                    data={[
                      { value: 'JT_FULL_TIME', label: 'Fulltime' },
                      { value: 'JT_CONTRACTUAL', label: 'Contractual' },
                      { value: 'JT_C2H', label: 'C2H' },
                    ]}
                    {...form.getInputProps('job_type')}
                  />
                  <Select
                    label="Pay Type"
                    placeholder="Pay Type"
                    data={[
                      { value: 'PT_HOURLY', label: 'Hourly' },
                      { value: 'PT_BI_WEEKLY', label: 'Bi-Weekly' },
                      { value: 'PT_FORTNIGHT', label: 'Weekly' },
                      { value: 'PT_MONTHLY', label: 'Monthly' },
                      // { value: 'Semi-Monthly', label: 'Semi-Monthly' },
                      { value: 'PT_ANNUALLY', label: 'Annual Salary' },
                      { value: 'PR_PER_DAY', label: 'Per Day' },
                    ]}
                    {...form.getInputProps('pay_type')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>

            {/* Job Description */}
            <Accordion.Item
              value="job_description"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Job Description" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <Select
                    label="Job Domain"
                    type={'text'}
                    placeholder="Job Domain"
                    data={[
                      {
                        value: 'Administration/Operations',
                        label: 'Administration/Operations',
                      },
                      {
                        value: 'Financial Services',
                        label: 'Financial Services',
                      },
                      {
                        value: 'Recruitment Industry',
                        label: 'Recruitment Industry',
                      },
                      { value: 'Marketing', label: 'Marketing' },
                      {
                        value: 'Healthcare Industry',
                        label: 'Healthcare Industry',
                      },
                      {
                        value: 'Quality Assurance/Quality control',
                        label: 'Quality Assurance/Quality control',
                      },
                      {
                        value: 'Supply Chain Management',
                        label: 'Supply Chain Management',
                      },
                      { value: 'Education sector', label: 'Education sector' },
                      {
                        value: 'Information Technology and Services',
                        label: 'Information Technology and Services',
                      },
                      {
                        value: 'IT-Hardware and Networking',
                        label: 'IT-Hardware and Networking',
                      },
                      {
                        value: 'Mechanical Industry',
                        label: 'Mechanical Industry',
                      },
                      {
                        value: 'Sales/Business management',
                        label: 'Sales/Business management',
                      },
                      {
                        value: 'Creative/Design/Art and Performer',
                        label: 'Creative/Design/Art and Performer',
                      },
                      {
                        value: 'Customer and Personal Service',
                        label: 'Customer and Personal Service',
                      },
                      {
                        value: 'Legal and Regulatory',
                        label: 'Legal and Regulatory',
                      },
                      {
                        value: 'Protective Services',
                        label: 'Protective Services',
                      },
                      {
                        value: 'Purchasing and Procurement',
                        label: 'Purchasing and Procurement',
                      },
                      {
                        value: 'Scientific Research',
                        label: 'Scientific Research',
                      },
                      {
                        value: 'Transportation',
                        label: 'Transportation',
                      },
                      {
                        value: 'Warehouse and logistics',
                        label: 'Warehouse and logistics',
                      },
                    ]}
                    {...form.getInputProps('job_domain')}
                  />
                  <Textarea
                    label="Job Description"
                    placeholder="Job Description"
                    {...form.getInputProps('job_description')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* Docs details */}
            <Accordion.Item
              value="attachments"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Attachments" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <FileInput
                    label="Attachments"
                    placeholder="Attachments"
                    {...form.getInputProps('attachments')}

                    // accept="image/png,image/jpeg, "
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Button fullWidth type="submit" mt="md" mb="lg">
            Update Now
          </Button>
        </form>
      </Paper>
    </>
  )
}
