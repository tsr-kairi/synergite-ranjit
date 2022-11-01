import TextDivider from '@/components/elements/text-divider'
import useCreateCandidate from '@/pages/candidate/hooks/useCreateCandidate'
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
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    data={[
                      { value: 'H1', label: 'H1' },
                      { value: 'USC', label: 'USC' },
                      { value: 'Green Card', label: 'Green Card' },
                    ]}
                    placeholder="Immigration status"
                    label="Immigration status"
                  />
                  <TextInput
                    label="Work Experience"
                    type={'text'}
                    placeholder="Work Experience"
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
                  />
                  <TextInput
                    type={'date'}
                    placeholder="Created Date"
                    label="Created Date"
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    data={[
                      { value: 'W2', label: 'W2' },
                      { value: 'C2C', label: 'C2C' },
                      { value: '1099', label: '1099' },
                      {
                        value: 'Internal Employees',
                        label: 'Internal Employees',
                      },
                    ]}
                    placeholder="Employment Type"
                    label="Employment Type"
                  />
                  <TextInput
                    label="Skills"
                    type={'text'}
                    placeholder="Skills"
                  />
                  <Select
                    data={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                    placeholder="Security Clearance"
                    label="Security Clearance"
                  />
                  <Select
                    data={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                    placeholder="Willing to Relocate"
                    label="Willing to Relocate"
                  />
                </Group>

                <Group grow align="center" mt="md">
                  <TextInput
                    label="Expected Rate"
                    type={'text'}
                    placeholder="Expected Rate"
                  />
                  <TextInput
                    label="Current Rate Type"
                    type={'text'}
                    placeholder="Current Rate Type"
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
                  />
                  <TextInput
                    label="Languages Known"
                    type={'text'}
                    placeholder="Languages Known"
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
                      { value: 'Married', label: 'Married' },
                      { value: 'Single', label: 'Single' },
                    ]}
                    placeholder="Marital Status"
                    label="Marital Status"
                  />
                  <TextInput
                    type={'text'}
                    placeholder="Salary Expectation"
                    label="Salary Expectation"
                  />
                  <TextInput
                    type={'text'}
                    placeholder="Current Pay Rate"
                    label="Current Pay Rate"
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    label="Profile Summary"
                    placeholder="Profile Summary"
                    // autosize
                    // minRows={3}
                    // maxRows={4}
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
                  />
                  <TextInput
                    label="Github Url"
                    type={'text'}
                    placeholder="Github Url"
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
                    data={[
                      {
                        value: 'from_api',
                        label: 'come from api/json format...',
                      },
                    ]}
                    placeholder="State"
                    {...form.getInputProps('state')}
                  />

                  <Select
                    label="Country"
                    data={[
                      {
                        value: 'from_api',
                        label: 'come from api/json format...',
                      },
                    ]}
                    placeholder="Country"
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
                  />
                  <TextInput
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                  />
                  <TextInput
                    label="Expiry date"
                    type={'text'}
                    placeholder="Expiry date"
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
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <FileInput
                      label="Upload Resume"
                      placeholder="Upload Resume"
                      icon={<IconUpload size={14} />}
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
