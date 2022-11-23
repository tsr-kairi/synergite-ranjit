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
      <div
        className={classes.paper}
        style={{
          padding: '10px',
          height: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
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
                    value={
                      candidateDetailsData.candidate_id
                        ? candidateDetailsData.candidate_id
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="First Name"
                    type={'text'}
                    placeholder="First Name"
                    value={
                      candidateDetailsData.first_name
                        ? candidateDetailsData.first_name
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Middle Name"
                    type={'text'}
                    placeholder="Middle Name"
                    value={
                      candidateDetailsData.middle_name
                        ? candidateDetailsData.middle_name
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Last Name"
                    type={'text'}
                    placeholder="Last Name"
                    value={
                      candidateDetailsData.last_name
                        ? candidateDetailsData.last_name
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Email"
                    type={'text'}
                    placeholder="Email"
                    value={
                      candidateDetailsData.email
                        ? candidateDetailsData.email
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Phone"
                    type={'text'}
                    placeholder="Phone"
                    value={
                      candidateDetailsData.phone
                        ? candidateDetailsData.phone
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Date of birth"
                    type={'date'}
                    placeholder="Date of birth"
                    value={
                      candidateDetailsData.dob
                        ? candidateDetailsData.dob
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Candidate Ownership"
                    type={'text'}
                    placeholder="Candidate Ownership"
                    value={
                      candidateDetailsData.candidate_ownership_uuid
                        ? candidateDetailsData.candidate_ownership_uuid
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Job Title"
                    type={'text'}
                    placeholder="Job Title"
                    // value={candidateDetailsData.job_title ? data?.data?.state : 'N/A'} // not added in backend
                  />
                  <TextInput
                    readOnly={true}
                    label="Immigration Status"
                    type={'text'}
                    placeholder="Immigration Status"
                    value={
                      candidateDetailsData.immigration_status
                        ? candidateDetailsData.immigration_status
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Work Experience"
                    type={'text'}
                    placeholder="Work Experience"
                    value={
                      candidateDetailsData.work_experience
                        ? candidateDetailsData.work_experience
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Source"
                    type={'text'}
                    placeholder="Source"
                    value={
                      candidateDetailsData.source
                        ? candidateDetailsData.source
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    type={'date'}
                    placeholder="Created Date"
                    label="Created Date"
                    // value={candidateDetailsData.created_date ? data?.data?.state : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Employment Type"
                    type={'text'}
                    placeholder="Employment Type"
                    value={
                      candidateDetailsData.employment_type
                        ? candidateDetailsData.employment_type
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Skills"
                    type={'text'}
                    placeholder="Skills"
                    value={
                      candidateDetailsData.skills
                        ? candidateDetailsData.skills
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Security Clearance"
                    type={'text'}
                    placeholder="Security Clearance"
                    value={
                      candidateDetailsData.security_clearance
                        ? candidateDetailsData.security_clearance
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Willing to Relocate"
                    type={'text'}
                    placeholder="Willing to Relocate"
                    value={
                      candidateDetailsData.willing_to_reallocate
                        ? candidateDetailsData.willing_to_reallocate
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    placeholder="Payment Type"
                    label="Payment Type"
                    value={
                      candidateDetailsData.payment_type
                        ? candidateDetailsData.payment_type
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Expected Rate Type"
                    type={'text'}
                    placeholder="Expected Rate Type"
                    value={
                      candidateDetailsData.expected_rate_type
                        ? candidateDetailsData.expected_rate_type
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Current Rate Type"
                    type={'text'}
                    placeholder="Current Rate Type"
                    value={
                      candidateDetailsData.current_rate_type
                        ? candidateDetailsData.current_rate_type
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Current Pay Rate"
                    type={'text'}
                    placeholder="Current Pay Rate"
                    value={
                      candidateDetailsData.current_rate
                        ? candidateDetailsData.current_rate
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Languages Known"
                    type={'text'}
                    placeholder="Languages Known"
                    value={
                      candidateDetailsData.language_known
                        ? candidateDetailsData.language_known
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Gender"
                    type={'text'}
                    placeholder="Gender"
                    value={
                      candidateDetailsData.gender
                        ? candidateDetailsData.gender
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Marital Status"
                    type={'text'}
                    placeholder="Marital Status"
                    value={
                      candidateDetailsData.marital_status
                        ? candidateDetailsData.marital_status
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    type={'text'}
                    placeholder="Salary Expectation"
                    label="Salary Expectation"
                    value={
                      candidateDetailsData.salary_expectation
                        ? candidateDetailsData.salary_expectation
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                    value={
                      candidateDetailsData.candidate_status
                        ? candidateDetailsData.candidate_status
                        : 'N/A'
                    }
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
                    value={
                      candidateDetailsData.profile_summary
                        ? candidateDetailsData.profile_summary
                        : 'N/A'
                    }
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
                    value={
                      candidateDetailsData.linkedin_url
                        ? candidateDetailsData.linkedin_url
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Github Url"
                    type={'text'}
                    placeholder="Github Url"
                    value={
                      candidateDetailsData.github_url
                        ? candidateDetailsData.github_url
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Address"
                    type={'text'}
                    placeholder="Address"
                    value={
                      candidateDetailsData.address1
                        ? candidateDetailsData.address1
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={
                      candidateDetailsData.city
                        ? candidateDetailsData.city
                        : 'N/A'
                    }
                  />
                </Group>

                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={
                      candidateDetailsData.state
                        ? candidateDetailsData.state
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Country"
                    type={'text'}
                    placeholder="Country"
                    value={
                      candidateDetailsData.country
                        ? candidateDetailsData.country
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Zip Code"
                    type={'text'}
                    placeholder="Zip Code"
                    value={
                      candidateDetailsData.zip
                        ? candidateDetailsData.zip
                        : 'N/A'
                    }
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
                    value={
                      candidateDetailsData.institution
                        ? candidateDetailsData.institution
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Degree"
                    type={'text'}
                    placeholder="Degree"
                    value={
                      candidateDetailsData.degree
                        ? candidateDetailsData.degree
                        : 'N/A'
                    }
                  />
                  <FileInput
                    label="Attachment"
                    placeholder="Attachment"
                    icon={<IconUpload size={14} />}
                    // value={candidateDetailsData.attachments ? data?.data?.state : 'N/A'} // old field
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
                    value={
                      candidateDetailsData.current_employer_name
                        ? candidateDetailsData.current_employer_name
                        : 'N/A'
                    }
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
                      // value={candidateDetailsData.zip ? data?.data?.state : 'N/A'}
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
                    // value={candidateDetailsData.zip ? data?.data?.state : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Expiry date"
                    type={'text'}
                    placeholder="Expiry date"
                    // value={candidateDetailsData.zip ? data?.data?.state : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Document"
                    type={'text'}
                    placeholder="Document"
                    // value={candidateDetailsData.zip ? data?.data?.state : 'N/A'}
                  />
                </Group>
                {/* <Grid mt="md">
                  <Grid.Col span={4}>
                    <TextInput
                      readOnly={true}
                      label="Document"
                      type={'text'}
                      placeholder="Document"
                      // value={candidateDetailsData.zip ? data?.data?.state : 'N/A'}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <FileInput
                      label="Upload Resume"
                      placeholder="Upload Resume"
                      icon={<IconUpload size={14} />}
                      // value={candidateDetailsData.zip ? data?.data?.state : 'N/A'}
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
