import TextDivider from '@/components/elements/text-divider'
import useCreateCandidate from '@/pages/candidate/hooks/useCreateCandidate'
import { WLanguages } from '@/pages/data/languages'
import { UsState } from '@/pages/data/usState'
import { WCountry } from '@/pages/data/wCountry'
import { TCandidateCreate, zCandidateCreate } from '@/types/candidate-type'
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
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconUpload } from '@tabler/icons'
import { useState } from 'react'
const useStyles = createStyles((theme) => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
  dividerText: {
    color: theme.colors.blue[9],
  },
}))

export default function CreateForm() {
  const { classes } = useStyles()
  const { mutate: addCandidate } = useCreateCandidate()
  const [searchValue, onSearchChange] = useState('')

  const form = useForm<TCandidateCreate>({
    validate: zodResolver(zCandidateCreate),
    initialValues: {
      employee_id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      ssn_no: '',
      dob: '',
      gender: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      county: '',
      country: '',
      ethnic_origin: '',
      zip: '',

      // new added field
      candidate_ownership_uuid: '',
      candidate_status: '',
      current_employer_name: '',
      current_rate: 0,
      current_rate_type: '',
      degree: '',
      employment_type: '',
      expected_rate_type: '',
      github_url: '',
      linkedin_url: '',
      immigration_status: '',
      institution: '',
      language_known: '',
      marital_status: '',
      payment_type: '',
      profile_summary: '',
      salary_expectation: 0,
      security_clearance: Boolean(),
      skills: '',
      source: '',
      willing_to_reallocate: Boolean(),
      work_experience: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TCandidateCreate) => {
    const candidateCreateData = {
      ...values,
    }

    addCandidate(candidateCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Employee Created successfully.',
    })
  }

  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* candidate_details */}
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
                  <TextInput
                    label="Email"
                    type={'text'}
                    placeholder="Email"
                    {...form.getInputProps('email')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    label="Phone"
                    type={'text'}
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
                </Group>
                <Group grow align="center" mt="md">
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
                      { value: 'Others', label: 'Others' },
                    ]}
                    placeholder="Source"
                    label="Source"
                    {...form.getInputProps('source')}
                  />
                  <TextInput
                    type={'date'}
                    placeholder="Created Date"
                    label="Created Date"
                    {...form.getInputProps('created_date')}
                  />
                </Group>
                <Group grow align="center" mt="md">
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
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                    placeholder="Security Clearance"
                    label="Security Clearance"
                    {...form.getInputProps('security_clearance')}
                  />
                  <Select
                    data={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                    placeholder="Willing to Relocate"
                    label="Willing to Relocate"
                    {...form.getInputProps('willing_to_reallocate')}
                  />
                </Group>

                <Group grow align="center" mt="md">
                  <TextInput
                    label="Expected Rate"
                    type={'text'}
                    placeholder="Expected Rate"
                    {...form.getInputProps('current_rate')}
                  />
                  <TextInput
                    label="Current Rate Type"
                    type={'text'}
                    placeholder="Current Rate Type"
                    {...form.getInputProps('current_rate_type')}
                  />
                  <Select
                    data={[
                      { value: 'Hourly', label: 'Hourly' },
                      { value: 'Daily', label: 'Daily' },
                      { value: 'Weekly', label: 'Weekly' },
                      {
                        value: 'Monthly',
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
                      return { value: l.code, label: l.language }
                    })}
                    {...form.getInputProps('language_known')}
                  />
                </Group>
                <Group grow align="center" mt="md">
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
                    type={'url'}
                    placeholder="Linkedin Url"
                    {...form.getInputProps('linkedin_url')}
                  />
                  <TextInput
                    label="Github Url"
                    type={'url'}
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
                      return { value: s.code, label: s.state }
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
                      return { value: c.code, label: c.country }
                    })}
                    {...form.getInputProps('country')}
                  />
                  <TextInput
                    label="Zip Code"
                    type={'text'}
                    placeholder="Zip Code"
                    {...form.getInputProps('zip')}
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
                    label="Candidate Status"
                    type={'text'}
                    placeholder="Candidate Status"
                    data={[
                      { value: 'AVAILABLE', label: 'Available' },
                      { value: 'INACTIVE', label: 'Inactive' },
                      { value: 'PLACED', label: 'Placed' },
                      { value: 'DO_NOT_CALL', label: 'Do not call' },
                      { value: 'NOT_AVAILABLE', label: 'Not available' },
                    ]}
                    {...form.getInputProps('candidate_status')}
                  />
                  <TextInput
                    label="Expiry date"
                    type={'text'}
                    placeholder="Expiry date"
                    {...form.getInputProps('expiry_date')} // old field
                  />
                </Group>
                <Grid mt="md">
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
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Button fullWidth type="submit" mt="xl">
            Save
          </Button>
        </form>
      </Paper>
    </>
  )
}
