import TextDivider from '@/components/elements/text-divider'
import theme from '@/theme/theme'
import { TCandidate } from '@/types/candidate-type'
import {
  createStyles,
  Group,
  Accordion,
  TextInput,
  Textarea,
  Grid,
  FileInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconUpload } from '@tabler/icons'
import useEditCandidate from '../../hooks/useEditCandidate'
const useStyles = createStyles(() => ({
  paper: {
    backgroundColor: 'transparent',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  dividerText: {
    color: theme.colors?.blue?.[9],
  },
}))

export default function CandidateDetails(candidateDetailsData: TCandidate) {
  const { classes } = useStyles()
  const { mutate: candidateDetails } = useEditCandidate()

  const form = useForm<TCandidate>({
    initialValues: candidateDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TCandidate) => {
    const candidateDetailsData = {
      ...values,
    }

    candidateDetails(candidateDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Candidate Details Fetched Successfully.',
    })
  }
  // value={clientDetailsData.first_name}
  return (
    <>
      <div className={classes.paper}>
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
                    readOnly={true}
                    label="Candidate ID"
                    type={'text'}
                    placeholder="Auto Generated number"
                    {...form.getInputProps('candidate_id')}
                  />
                  <TextInput
                    readOnly={true}
                    label="First Name"
                    type={'text'}
                    placeholder="First Name"
                    value={candidateDetailsData.first_name}
                  />
                  <TextInput
                    readOnly={true}
                    label="Middle Name"
                    type={'text'}
                    placeholder="Middle Name"
                    value={candidateDetailsData.middle_name}
                  />
                  <TextInput
                    readOnly={true}
                    label="Last Name"
                    type={'text'}
                    placeholder="Last Name"
                    value={candidateDetailsData.last_name}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Email"
                    type={'text'}
                    placeholder="Email"
                    value={candidateDetailsData.email}
                  />
                  <TextInput
                    readOnly={true}
                    label="Phone"
                    type={'text'}
                    placeholder="Phone"
                    value={candidateDetailsData.phone}
                  />
                  <TextInput
                    readOnly={true}
                    label="Date of birth"
                    type={'date'}
                    placeholder="Date of birth"
                    value={candidateDetailsData.dob}
                  />
                  <TextInput
                    readOnly={true}
                    label="Candidate Ownership"
                    type={'text'}
                    placeholder="Candidate Ownership"
                    value={candidateDetailsData.candidate_ownership_uuid}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Job Title"
                    type={'text'}
                    placeholder="Job Title"
                    // value={candidateDetailsData.job_title} // not added in backend
                  />
                  <TextInput
                    readOnly={true}
                    label="Immigration Status"
                    type={'text'}
                    placeholder="Immigration Status"
                    value={candidateDetailsData.immigration_status}
                  />
                  <TextInput
                    readOnly={true}
                    label="Work Experience"
                    type={'text'}
                    placeholder="Work Experience"
                    value={candidateDetailsData.work_experience}
                  />
                  <TextInput
                    readOnly={true}
                    label="Source"
                    type={'text'}
                    placeholder="Source"
                    value={candidateDetailsData.source}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    type={'date'}
                    placeholder="Created Date"
                    label="Created Date"
                    // value={candidateDetailsData.created_date}
                  />
                  <TextInput
                    readOnly={true}
                    label="Employment Type"
                    type={'text'}
                    placeholder="Employment Type"
                    value={candidateDetailsData.employment_type}
                  />
                  <TextInput
                    readOnly={true}
                    label="Skills"
                    type={'text'}
                    placeholder="Skills"
                    value={candidateDetailsData.skills}
                  />
                  <TextInput
                    readOnly={true}
                    label="Security Clearance"
                    type={'text'}
                    placeholder="Security Clearance"
                    value={candidateDetailsData.security_clearance}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Willing to Relocate"
                    type={'text'}
                    placeholder="Willing to Relocate"
                    value={candidateDetailsData.willing_to_reallocate}
                  />
                  <TextInput
                    readOnly={true}
                    placeholder="Payment Type"
                    label="Payment Type"
                    value={candidateDetailsData.payment_type}
                  />
                  <TextInput
                    readOnly={true}
                    label="Expected Rate Type"
                    type={'text'}
                    placeholder="Expected Rate Type"
                    value={candidateDetailsData.expected_rate_type}
                  />
                  <TextInput
                    readOnly={true}
                    label="Current Rate Type"
                    type={'text'}
                    placeholder="Current Rate Type"
                    value={candidateDetailsData.current_rate_type}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Current Pay Rate"
                    type={'text'}
                    placeholder="Current Pay Rate"
                    value={candidateDetailsData.current_rate}
                  />
                  <TextInput
                    readOnly={true}
                    label="Languages Known"
                    type={'text'}
                    placeholder="Languages Known"
                    value={candidateDetailsData.language_known}
                  />
                  <TextInput
                    readOnly={true}
                    label="Gender"
                    type={'text'}
                    placeholder="Gender"
                    value={candidateDetailsData.gender}
                  />
                  <TextInput
                    readOnly={true}
                    label="Marital Status"
                    type={'text'}
                    placeholder="Marital Status"
                    value={candidateDetailsData.marital_status}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    type={'text'}
                    placeholder="Salary Expectation"
                    label="Salary Expectation"
                    value={candidateDetailsData.salary_expectation}
                  />
                  <TextInput
                    readOnly={true}
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                    value={candidateDetailsData.candidate_status}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Textarea
                    readOnly={true}
                    label="Profile Summary"
                    placeholder="Profile Summary"
                    // autosize
                    // minRows={3}
                    // maxRows={4}
                    value={candidateDetailsData.profile_summary}
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
                    readOnly={true}
                    label="Linkedin Url"
                    type={'text'}
                    placeholder="Linkedin Url"
                    value={candidateDetailsData.linkedin_url}
                  />
                  <TextInput
                    readOnly={true}
                    label="Github Url"
                    type={'text'}
                    placeholder="Github Url"
                    value={candidateDetailsData.github_url}
                  />
                  <TextInput
                    readOnly={true}
                    label="Address"
                    type={'text'}
                    placeholder="Address"
                    value={candidateDetailsData.address1}
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={candidateDetailsData.city}
                  />
                </Group>

                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={candidateDetailsData.state}
                  />
                  <TextInput
                    readOnly={true}
                    label="Country"
                    type={'text'}
                    placeholder="Country"
                    value={candidateDetailsData.country}
                  />
                  <TextInput
                    readOnly={true}
                    label="Zip Code"
                    type={'text'}
                    placeholder="Zip Code"
                    value={candidateDetailsData.zip}
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
                    readOnly={true}
                    label="Institution"
                    type={'text'}
                    placeholder="Institution"
                    value={candidateDetailsData.institution}
                  />
                  <TextInput
                    readOnly={true}
                    label="Degree"
                    type={'text'}
                    placeholder="Degree"
                    value={candidateDetailsData.degree}
                  />
                  <FileInput
                    label="Attachment"
                    placeholder="Attachment"
                    icon={<IconUpload size={14} />}
                    // value={candidateDetailsData.attachments} // old field
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
                    readOnly={true}
                    label="Current Employer name"
                    type={'text'}
                    placeholder="Current Employer name"
                    value={candidateDetailsData.current_employer_name}
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
                      // value={candidateDetailsData.zip}
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
                    readOnly={true}
                    label="Document Name"
                    type={'text'}
                    placeholder="Document Name"
                    // value={candidateDetailsData.zip}
                  />
                  <TextInput
                    readOnly={true}
                    label="Expiry date"
                    type={'text'}
                    placeholder="Expiry date"
                    // value={candidateDetailsData.zip}
                  />
                  <TextInput
                    readOnly={true}
                    label="Document"
                    type={'text'}
                    placeholder="Document"
                    // value={candidateDetailsData.zip}
                  />
                </Group>
                {/* <Grid mt="md">
                  <Grid.Col span={4}>
                    <TextInput
                      readOnly={true}
                      label="Document"
                      type={'text'}
                      placeholder="Document"
                      // value={candidateDetailsData.zip}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <FileInput
                      label="Upload Resume"
                      placeholder="Upload Resume"
                      icon={<IconUpload size={14} />}
                      // value={candidateDetailsData.zip}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}></Grid.Col>
                </Grid> */}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </form>
      </div>
    </>
  )
}
