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
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
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
                  <TextInput
                    label="Start Date"
                    type={'date'}
                    placeholder="Start Date"
                    {...form.getInputProps('start_date')}
                  />
                  <Select
                    label="City"
                    placeholder="City"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching City"
                    data={UsState.map((s) => {
                      return { value: s.code, label: s.state }
                    })}
                    {...form.getInputProps('city')}
                  />
                  <Select
                    label="State"
                    placeholder="State"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching State"
                    data={UsState.map((s) => {
                      return { value: s.code, label: s.state }
                    })}
                    {...form.getInputProps('state')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="Country Code"
                    placeholder="Country Code"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching Country No"
                    data={WCountry.map((c) => {
                      return { value: c.code, label: c.code }
                    })}
                    {...form.getInputProps('country_code')}
                  />
                  {/* <Select
                    label="Country"
                    placeholder="Country"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching Country"
                    data={WCountry.map((c) => {
                      return { value: c.code, label: c.country }
                    })}
                    {...form.getInputProps('country')}
                  /> */}
                  <TextInput
                    label="Job Title"
                    type={'text'}
                    placeholder="Job Title"
                    {...form.getInputProps('job_title')}
                  />
                  <TextInput
                    label="No of Positions"
                    type={'number'}
                    placeholder="No of Positions"
                    {...form.getInputProps('number_of_position')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="Priority"
                    type={'numbers'}
                    placeholder="Priority"
                    data={[
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                      { value: 3, label: 3 },
                    ]}
                    {...form.getInputProps('priority')}
                  />
                  <TextInput
                    label="Priority reason"
                    type={'text'}
                    placeholder="Priority reason"
                    {...form.getInputProps('priority_reason')}
                  />
                  <TextInput
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                    {...form.getInputProps('job_status')}
                  />
                  <Select
                    label="Employee Type"
                    type={'text'}
                    placeholder="Employee Type"
                    data={[
                      { value: 'C2C', label: 'C2C' },
                      { value: '1099', label: '1099' },
                      { value: 'W2', label: 'W2' },
                    ]}
                    {...form.getInputProps('employee_type')}
                  />
                </Group>
                <Group grow align="center" mt="md">
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
                  <Select
                    label="Visa Status"
                    type={'text'}
                    placeholder="Visa Status"
                    data={[
                      { value: 'USC', label: 'USC' },
                      { value: 'H1', label: 'H1' },
                      { value: 'Green Card', label: 'Green Card' },
                    ]}
                    {...form.getInputProps('visa_status')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  {/* <Select
                    label="Languages"
                    placeholder="Languages"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching Languages"
                    data={WLanguages.map((l) => {
                      return { value: l.code, label: l.language }
                    })}
                    {...form.getInputProps('language')}
                  /> */}
                  <Select
                    label="Industry"
                    placeholder="Industry"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching Industry"
                    data={UsIndustry.map((i) => {
                      return { value: i.industry, label: i.industry }
                    })}
                    {...form.getInputProps('industry')}
                  />
                  <TextInput
                    label="Client Contact Email"
                    type={'text'}
                    placeholder="Client Contact Email"
                    {...form.getInputProps('client_contact_email')}
                  />
                  <TextInput
                    label="Client Contact Phone"
                    type={'text'}
                    placeholder="Client Contact Phone"
                    {...form.getInputProps('client_contact_phone')}
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
                    type={'text'}
                    placeholder="Recruiters"
                    data={[
                      { value: 'Ranjit', label: 'Ranjit' },
                      { value: 'Vishal', label: 'Vishal' },
                      { value: 'Roshan', label: 'Roshan' },
                    ]}
                    {...form.getInputProps('recruiter_uuid')}
                  />
                  <Select
                    label="Source"
                    type={'text'}
                    placeholder="Source"
                    data={[
                      { value: 'Ranjit', label: 'Ranjit' },
                      { value: 'Vishal', label: 'Vishal' },
                      { value: 'Roshan', label: 'Roshan' },
                    ]}
                    {...form.getInputProps('sourcer_uuid')}
                  />
                </Group>
                <Group grow align="center" mt="md">
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
                  <TextInput
                    label="Maximum Submissions"
                    type={'number'}
                    placeholder="Maximum Submissions"
                    {...form.getInputProps('maximum_submission')}
                  />
                  <Select
                    label="Interview Panel"
                    type={'text'}
                    placeholder="Interview Panel"
                    data={[
                      { value: 'Ranjit', label: 'Ranjit' },
                      { value: 'Vishal', label: 'Vishal' },
                      { value: 'Roshan', label: 'Roshan' },
                    ]}
                    {...form.getInputProps('interview_panel_uuid')}
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
                  <Select
                    label="Client Contract Period"
                    type={'number'}
                    placeholder="Client Contract Period"
                    data={[
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                      { value: 3, label: 3 },
                    ]}
                    {...form.getInputProps('client_contract_period')}
                  />
                  <Select
                    label="Job Type"
                    type={'text'}
                    placeholder="Job Type"
                    data={[
                      { value: 'Fulltime', label: 'Fulltime' },
                      { value: 'Contractual', label: 'Contractual' },
                      { value: 'C2H', label: 'C2H' },
                    ]}
                    {...form.getInputProps('job_type')}
                  />
                  <TextInput
                    label="W2 Pay Rate"
                    type={'text'}
                    placeholder="W2 Pay Rate"
                    {...form.getInputProps('w2_pay_rate')}
                  />
                  <TextInput
                    label="Contract Period"
                    type={'text'}
                    placeholder="Contract Period"
                    {...form.getInputProps('contract_period')}
                  />
                  {/* <TextInput
                    label="Contract Period"
                    type={'text'}
                    placeholder="Contract Period"
                    {...form.getInputProps('contract_period')}
                  /> */}
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
                      { value: 'Ranjit', label: 'Ranjit' },
                      { value: 'Vishal', label: 'Vishal' },
                      { value: 'Roshan', label: 'Roshan' },
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
