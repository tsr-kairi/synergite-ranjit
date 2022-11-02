import useEditCandidate from '@/pages/candidate/hooks/useEditCandidate'
import TextDivider from '@/components/elements/text-divider'
import { TCandidate } from '@/types/candidate-type'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Select,
  Accordion,
  Textarea,
  Grid,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconUpload } from '@tabler/icons'
import { WCountry } from '@/pages/data/wCountry'
import { UsState } from '@/pages/data/usState'
import { useState } from 'react'
import { WLanguages } from '@/pages/data/languages'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(candidateData: TCandidate) {
  const { classes } = useStyles()
  const { mutate: editCandidate } = useEditCandidate()
  const [searchValue, onSearchChange] = useState('')

  const form = useForm<TCandidate>({
    // validate: zodResolver(zEmployeeEdit),
    initialValues: candidateData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TCandidate) => {
    const candidateEditData = {
      ...values,
    }

    editCandidate(candidateEditData)

    showNotification({
      title: 'Success!!',
      message: 'Employee Edited successfully.',
    })
  }
  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Accordion defaultValue="candidate_details">
            {/* Personal Details Information */}
            <Accordion.Item
              value="candidate_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Personal Details" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Candidate ID"
                    type={'text'}
                    placeholder="Auto Generated number"
                    {...form.getInputProps('candidate_id')}
                  />
                  <TextInput
                    label="First Name"
                    type={'text'}
                    placeholder="First Name"
                    {...form.getInputProps('first_name')}
                  />
                  <TextInput
                    label="Middle Name"
                    type={'text'}
                    placeholder="Middle Name"
                    {...form.getInputProps('middle_name')}
                  />
                  <TextInput
                    label="Last Name"
                    type={'text'}
                    placeholder="Last Name"
                    {...form.getInputProps('last_name')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Email"
                    type={'text'}
                    placeholder="Email"
                    {...form.getInputProps('email')}
                  />
                  <TextInput
                    label="Phone"
                    type={'number'}
                    placeholder="Phone"
                    {...form.getInputProps('phone')}
                  />
                  <TextInput
                    label="Date of birth"
                    type={'date'}
                    placeholder="Date of birth"
                    {...form.getInputProps('dob')}
                  />
                  <Select
                    data={[
                      { value: 'Available', label: 'All Members of SYnergy' },
                    ]}
                    placeholder="Candidate ownership"
                    label="Candidate ownership"
                    {...form.getInputProps('candidate_ownership_uuid')}
                  />
                </Group>
                <Group grow align="center" mt="md">
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
                    {...form.getInputProps('job_title')} // old field
                  />
                  <Select
                    data={[
                      { value: 'IS_H1', label: 'H1' },
                      { value: 'IS_USC', label: 'USC' },
                      { value: 'IS_GREEN_CARD', label: 'Green Card' },
                    ]}
                    placeholder="Immigration status"
                    label="Immigration status"
                    {...form.getInputProps('immigration_status')}
                  />
                  <TextInput
                    label="Work Experience"
                    type={'text'}
                    placeholder="Work Experience"
                    {...form.getInputProps('work_experience')}
                  />
                  <Select
                    data={[
                      { value: 'Facebook', label: 'Facebook' },
                      { value: 'Twitter', label: 'Twitter' },
                      { value: 'Linked In', label: 'Linked In' },
                      { value: 'Github', label: 'Github' },
                      { value: 'Monster', label: 'Monster' },
                      { value: 'Direct sourcing', label: 'Direct sourcing' },
                      { value: 'Career Portal', label: 'Career Portal' },
                      { value: 'Career Builder', label: 'Career Builder' },
                      { value: 'Indeed', label: 'Indeed' },
                      { value: 'Zip Recruiter', label: 'Zip Recruiter' },
                      { value: 'Post Job Free', label: 'Post Job Free' },
                      { value: 'JobRapido', label: 'JobRapido' },
                      { value: 'GlassDoor', label: 'GlassDoor' },
                      { value: 'GigaJobs', label: 'GigaJobs' },
                      { value: 'Jooble', label: 'Jooble' },
                      { value: 'Jobomas', label: 'Jobomas' },
                      { value: 'TechFetch', label: 'TechFetch' },
                      { value: 'Resume Inbox', label: 'Resume Inbox' },
                      { value: 'Snaprecruit', label: 'Snaprecruit' },
                      { value: 'Monsterindia', label: 'Monsterindia' },
                      { value: 'Naukri', label: 'Naukri' },
                      { value: 'Referral Portal', label: 'Referral Portal' },
                      { value: 'Vendor', label: 'Vendor' },
                      { value: 'Dr Jobs Pro', label: 'Dr Jobs Pro' },
                      { value: 'Jora', label: 'Jora' },
                      { value: 'WhatJobs ', label: 'WhatJobs ' },
                      { value: 'Recruit.Net', label: 'Recruit.Net' },
                      {
                        value: 'Nexxt, NPAmarketplace',
                        label: 'Nexxt, NPAmarketplace',
                      },
                      {
                        value: 'Recruit. net Talent.com',
                        label: 'Recruit. net Talent.com',
                      },
                    ]}
                    placeholder="Source"
                    label="Source"
                    {...form.getInputProps('source')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    type={'date'}
                    placeholder="Created Date"
                    label="Created Date"
                    {...form.getInputProps('created_date')}
                  />
                  <Select
                    data={[
                      { value: 'ET_W2', label: 'W2' },
                      { value: 'ET_C2C', label: 'C2C' },
                      { value: 'ET_1099', label: '1099' },
                      {
                        value: 'ET_INTERNAL',
                        label: 'Internal Employees',
                      },
                    ]}
                    placeholder="Employment Type"
                    label="Employment Type"
                    {...form.getInputProps('employment_type')}
                  />
                  <TextInput
                    label="Skills"
                    type={'text'}
                    placeholder="Skills"
                    {...form.getInputProps('skills')}
                  />
                  <Select
                    data={[
                      { value: true, label: 'Yes' },
                      { value: false, label: 'No' },
                    ]}
                    placeholder="Security Clearance"
                    label="Security Clearance"
                    {...form.getInputProps('security_clearance')}
                  />
                </Group>

                <Group grow align="center" mt="md">
                  <Select
                    data={[
                      { value: true, label: 'Yes' },
                      { value: false, label: 'No' },
                    ]}
                    placeholder="Willing to Relocate"
                    label="Willing to Relocate"
                    {...form.getInputProps('willing_to_reallocate')}
                  />
                  <Select
                    data={[
                      { value: 'BILLABLE', label: 'Billable' },
                      { value: 'NON_BILLABLE', label: 'Non Billable' },
                    ]}
                    placeholder="Payment Type"
                    label="Payment Type"
                    {...form.getInputProps('payment_type')}
                  />
                  <TextInput
                    label="Current Pay Rate"
                    type={'number'}
                    placeholder="Current Pay Rate"
                    {...form.getInputProps('current_rate')}
                  />
                  <Select
                    label="Current Rate Type"
                    placeholder="Current Rate Type"
                    data={[
                      { value: 'RT_MONTHLY', label: 'Hourly' },
                      { value: 'RT_DAILY', label: 'Daily' },
                      { value: 'RT_HOURLY', label: 'Weekly' },
                      {
                        value: 'RT_WEEKLY',
                        label: 'Monthly',
                      },
                    ]}
                    {...form.getInputProps('current_rate_type')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    data={[
                      { value: 'RT_MONTHLY', label: 'Hourly' },
                      { value: 'RT_DAILY', label: 'Daily' },
                      { value: 'RT_HOURLY', label: 'Weekly' },
                      {
                        value: 'RT_WEEKLY',
                        label: 'Monthly',
                      },
                    ]}
                    placeholder="Expected Rate Type"
                    label="Expected Rate Type"
                    {...form.getInputProps('expected_rate_type')}
                  />
                  <Select
                    label="Languages Known"
                    placeholder="Languages Known"
                    searchable
                    onSearchChange={onSearchChange}
                    searchValue={searchValue}
                    nothingFound="No Matching Languages"
                    data={WLanguages.map((l) => {
                      return { value: l.language, label: l.language }
                    })}
                    {...form.getInputProps('language_known')}
                  />
                  <Select
                    data={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Others', label: 'Others' },
                    ]}
                    placeholder="Gender"
                    label="Gender"
                    {...form.getInputProps('gender')}
                  />
                  <Select
                    data={[
                      { value: 'SINGLE', label: 'Single' },
                      { value: 'MARRIED', label: 'Married' },
                      { value: 'WIDOWED', label: 'Widowed' },
                      { value: 'SEPERATED', label: 'Seperated' },
                      { value: 'DIVORCED', label: 'Divorced' },
                    ]}
                    placeholder="Marital Status"
                    label="Marital Status"
                    {...form.getInputProps('marital_status')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    type={'number'}
                    placeholder="Salary Expectation"
                    label="Salary Expectation"
                    {...form.getInputProps('salary_expectation')}
                  />
                  <TextInput
                    type={'text'}
                    placeholder="Current Pay Rate"
                    label="Current Pay Rate"
                    {...form.getInputProps('current_pay_rate')} // old field
                  />
                  <Select
                    label="Status"
                    placeholder="Status"
                    data={[
                      { value: 'AVAILABLE', label: 'Available' },
                      { value: 'INACTIVE', label: 'Inactive' },
                      { value: 'PLACED', label: 'Placed' },
                      { value: 'DO_NOT_CALL', label: 'Do not call' },
                      { value: 'NOT_AVAILABLE', label: 'Not available' },
                    ]}
                    {...form.getInputProps('candidate_status')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    label="Profile Summary"
                    placeholder="Profile Summary"
                    // autosize
                    // minRows={3}
                    // maxRows={4}
                    {...form.getInputProps('profile_summary')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* contact Information */}
            <Accordion.Item
              value="contact_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Contact Details" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Linkedin Url"
                    type={'text'}
                    placeholder="Linkedin Url"
                    {...form.getInputProps('linkedin_url')}
                  />
                  <TextInput
                    label="Github Url"
                    type={'text'}
                    placeholder="Github Url"
                    {...form.getInputProps('github_url')}
                  />
                  <TextInput
                    label="Address Line1"
                    type={'text'}
                    placeholder="Address Line1"
                    {...form.getInputProps('address1')}
                  />
                  <TextInput
                    label="Address Line2"
                    type={'text'}
                    placeholder="Address Line1"
                    {...form.getInputProps('address2')}
                  />
                </Group>

                <Group grow align="center" mt="md">
                  <Select
                    label="City"
                    data={[
                      {
                        value: 'from_api',
                        label: 'come from api/json format...',
                      },
                    ]}
                    placeholder="City"
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
                      return { value: s.state, label: s.state }
                    })}
                    {...form.getInputProps('state')}
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
                  <TextInput
                    label="Zip Code"
                    type={'number'}
                    placeholder="Zip Code"
                    {...form.getInputProps('zip')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* education Information */}
            <Accordion.Item
              value="education_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Education Details" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Institution"
                    type={'text'}
                    placeholder="Institution"
                    {...form.getInputProps('institution')}
                  />
                  <TextInput
                    label="Degree"
                    type={'text'}
                    placeholder="Degree"
                    {...form.getInputProps('degree')}
                  />
                  <FileInput
                    label="Attachment"
                    placeholder="Attachment"
                    icon={<IconUpload size={14} />}
                    {...form.getInputProps('attachments')} // old field
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* work_experience_details Information */}
            <Accordion.Item
              value="work_experience_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Work Experience Details" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Current Employer name"
                    type={'text'}
                    placeholder="Current Employer name"
                    {...form.getInputProps('current_employer_name')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* resumes Information */}
            <Accordion.Item value="resumes" style={{ borderBottom: 'none' }}>
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Resumes" />
              </Accordion.Control>
              <Accordion.Panel>
                <Grid>
                  <Grid.Col span={4}>
                    <FileInput
                      label="Attachment"
                      placeholder="Attachment"
                      icon={<IconUpload size={14} />}
                      {...form.getInputProps('attachments')} // old field
                    />
                  </Grid.Col>
                  <Grid.Col span={4}></Grid.Col>
                  <Grid.Col span={4}></Grid.Col>
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>
            {/* documents Information */}
            <Accordion.Item value="documents" style={{ borderBottom: 'none' }}>
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Documents" />
              </Accordion.Control>
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Document Name"
                    type={'text'}
                    placeholder="Document Name"
                    {...form.getInputProps('document_name')}
                  />
                  <Select
                    data={[
                      { value: 'Cover Letter,', label: 'Cover Letter,' },
                      { value: 'Visa', label: 'Visa' },
                      { value: 'Passport', label: 'Passport' },
                      { value: 'Driving License', label: 'Driving License' },
                      { value: 'Resume', label: 'Resume' },
                      { value: 'H1-B', label: 'H1-B' },
                      { value: 'L1', label: 'L1' },
                      { value: 'EAD', label: 'EAD' },
                      { value: 'Green Card', label: 'Green Card' },
                      { value: 'Purchase Order', label: 'Purchase Order' },
                      { value: 'Work Order', label: 'Work Order' },
                      {
                        value: 'Onboarding documents',
                        label: 'Onboarding documents',
                      },
                      { value: 'Others', label: 'Others' },
                    ]}
                    placeholder="Document Type"
                    label="Document Type"
                    {...form.getInputProps('documents')} // old field
                  />
                  <TextInput
                    label="Expiry date"
                    type={'date'}
                    placeholder="Expiry date"
                    {...form.getInputProps('expiry_date')} // old field
                  />
                </Group>
                {/* <Grid mt="md">
                  <Grid.Col span={4}>
                    <Select
                      data={[
                        { value: 'Cover Letter,', label: 'Cover Letter,' },
                        { value: 'Visa', label: 'Visa' },
                        { value: 'Passport', label: 'Passport' },
                        { value: 'Driving License', label: 'Driving License' },
                        { value: 'Resume', label: 'Resume' },
                        { value: 'H1-B', label: 'H1-B' },
                        { value: 'L1', label: 'L1' },
                        { value: 'EAD', label: 'EAD' },
                        { value: 'Green Card', label: 'Green Card' },
                        { value: 'Purchase Order', label: 'Purchase Order' },
                        { value: 'Work Order', label: 'Work Order' },
                        {
                          value: 'Onboarding documents',
                          label: 'Onboarding documents',
                        },
                        { value: 'Others', label: 'Others' },
                      ]}
                      placeholder="Document"
                      label="Document"
                      {...form.getInputProps('documents')} // old field
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <FileInput
                      label="Upload Resume"
                      placeholder="Upload Resume"
                      icon={<IconUpload size={14} />}
                      {...form.getInputProps('file')} // old field
                    />
                  </Grid.Col>
                  <Grid.Col span={4}></Grid.Col>
                </Grid> */}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Button fullWidth type="submit" mt="xl">
            Update
          </Button>
        </form>
      </Paper>
    </>
  )
}
