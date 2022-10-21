import TextDivider from '@/components/elements/text-divider'
import {
  createStyles,
  Group,
  Loader,
  Paper,
  TextInput,
  Select,
  FileInput,
  ActionIcon,
  Tooltip,
  Accordion,
} from '@mantine/core'
import { IconArrowBackUp, IconBriefcase } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetJobById from '../../../hooks/useGetJobById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  clientUserCard: {
    border: `1px solid ${theme.colors.blue[1]}`,
    borderRadius: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '13px',
    paddingBottom: '13px',
  },
  personalDetails: {
    display: 'flex',
    padding: '10px',
    gap: '40px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },
  personalDetailsInner: {
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
  },
  personalDetailsMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    gap: '10px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },

  detailHead: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  detailBottom: {
    marginBottom: '5px',
    borderBottom: `1px solid transparent`,

    '&:hover': {
      borderBottom: `1px solid blue`,
    },
  },
  detailsIcon: {
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
      cursor: 'pointer',
      padding: '2px',
      borderRadius: '2px',
    },
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function Personal() {
  const { jobId } = useParams()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get('client_id')

  const { classes } = useStyles()

  const {
    data: jobDetails,
    isError,
    error,
    isLoading,
  } = useGetJobById(String(jobId))

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return (
    <Paper p={20} mt={30} radius="sm" className={classes.paper}>
      <Group position="apart">
        <Link
          to={`/client-details/${String(clientId)}`}
          className={classes.userLink}
        >
          <Tooltip
            label="Back to Client details"
            color="blue"
            withArrow
            transition="slide-left"
            transitionDuration={500}
          >
            <ActionIcon variant="light" radius="xl" color={'blue'}>
              <IconArrowBackUp size={18} />
            </ActionIcon>
          </Tooltip>
        </Link>
        <ActionIcon variant="light" radius="xl" color={'blue'}>
          <IconBriefcase size={18} />
        </ActionIcon>
      </Group>
      {/* main details */}
      <Accordion defaultValue="job_details">
        <Accordion.Item value="job_details" style={{ borderBottom: 'none' }}>
          <Accordion.Control style={{ padding: '0' }}>
            <TextDivider label="Job Details" />
          </Accordion.Control>

          {/* Job Details */}
          <Accordion.Panel>
            <Group grow align="center" mt="md">
              <TextInput
                readOnly={true}
                label="Job ID"
                type={'text'}
                placeholder="Job-001"
                // value={jobDetails?.data?.job_id}
              />
              <TextInput
                readOnly={true}
                label="Client request ID"
                type={'text'}
                placeholder="Client request ID"
                value={jobDetails?.data?.client_req_id}
              />
              <TextInput
                readOnly={true}
                label="Start Date"
                type={'date'}
                placeholder="Start Date"
                value={jobDetails?.data?.start_date}
              />
              <TextInput
                readOnly={true}
                label="City"
                type={'text'}
                placeholder="City"
                value={jobDetails?.data?.city}
              />
            </Group>
            <Group grow align="center" mt="md">
              <TextInput
                readOnly={true}
                label="State"
                type={'text'}
                placeholder="State"
                value={jobDetails?.data?.state}
              />
              <TextInput
                readOnly={true}
                label="Country"
                type={'text'}
                placeholder="Country"
                value={jobDetails?.data?.country}
              />
              <TextInput
                readOnly={true}
                label="Job Title"
                type={'text'}
                placeholder="Job Title"
                value={jobDetails?.data?.title}
              />
              <TextInput
                readOnly={true}
                label="No of Positions"
                type={'text'}
                placeholder="No of Positions"
                // value={jobDetails?.data?.no_positions}
              />
            </Group>
            <Group grow align="center" mt="md">
              <TextInput
                readOnly={true}
                label="Priority"
                type={'text'}
                placeholder="Priority"
                // value={jobDetails?.data?.priority}
              />
              <TextInput
                readOnly={true}
                label="Priority reason"
                type={'text'}
                placeholder="Priority reason"
                // value={jobDetails?.data?.priority_reason}
              />
              <TextInput
                readOnly={true}
                label="Status"
                type={'text'}
                placeholder="Status"
                // value={jobDetails?.data?.job_status}
              />
              <TextInput
                readOnly={true}
                label="Employee Type"
                type={'text'}
                placeholder="Employee Type"
                // value={jobDetails?.data?.employee_type}
              />
            </Group>
            <Group grow align="center" mt="md">
              <TextInput
                readOnly={true}
                label="Work Experience"
                type={'text'}
                placeholder="Work Experience"
                // value={jobDetails?.data?.work_experience}
              />
              <TextInput
                readOnly={true}
                label="Primary Skills"
                type={'text'}
                placeholder="Primary Skills"
                value={jobDetails?.data?.primary_skills}
              />
              <TextInput
                readOnly={true}
                label="Secondary Skills"
                type={'text'}
                placeholder="Secondary Skills"
                value={jobDetails?.data?.secondary_skills}
              />
              <TextInput
                readOnly={true}
                label="Visa Status"
                type={'text'}
                placeholder="Visa Status"
                value={jobDetails?.data?.visa_status}
              />
            </Group>
            <Group grow align="center" mt="md">
              <TextInput
                readOnly={true}
                label="Languages"
                type={'text'}
                placeholder="Languages"
                // value={jobDetails?.data?.languages}
              />
              <TextInput
                readOnly={true}
                label="Industry"
                type={'text'}
                placeholder="Industry"
                // value={jobDetails?.data?.industry}
              />
              <TextInput
                readOnly={true}
                label="Client Contact Email"
                type={'text'}
                placeholder="Client Contact Email"
                // value={jobDetails?.data?.client_contact_email}
              />
              <TextInput
                readOnly={true}
                label="Client Contact Phone"
                type={'text'}
                placeholder="Client Contact Phone"
                // value={jobDetails?.data?.client_contact_phone}
              />
            </Group>
            <Group grow align="center" mt="md">
              <TextInput
                readOnly={true}
                label="Created By"
                type={'text'}
                placeholder="Created By"
                value={jobDetails?.data?.created_by}
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
              <TextInput
                readOnly={true}
                label="Recruitment Manager"
                type={'text'}
                placeholder="Recruitment Manager"
                // value={jobDetails?.data?.recruitment_manager}
              />
              <TextInput
                readOnly={true}
                label="Account Manager"
                type={'text'}
                placeholder="Account Manager"
                // value={jobDetails?.data?.account_manager}
              />
              <TextInput
                readOnly={true}
                label="Recruiters"
                type={'text'}
                placeholder="Recruiters"
                // value={jobDetails?.data?.recruiters}
              />
              <TextInput
                readOnly={true}
                label="Source"
                type={'text'}
                placeholder="Source"
                // value={jobDetails?.data?.source}
              />
            </Group>
            <Group grow align="center" mt="md">
              <TextInput
                readOnly={true}
                label="Additional Recruiters"
                type={'text'}
                placeholder="Additional Recruiters"
                // value={jobDetails?.data?.additional_recruiters}
              />
              <TextInput
                readOnly={true}
                label="Maximum Submissions"
                type={'text'}
                placeholder="Maximum Submissions"
                // value={jobDetails?.data?.maximum_submissions}
              />
              <TextInput
                readOnly={true}
                label="Interview Panel"
                type={'text'}
                placeholder="Interview Panel"
                // value={jobDetails?.data?.interview_panel}
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
                readOnly={true}
                label="Client Contract Period"
                type={'text'}
                placeholder="Client Contract Period"
                // value={jobDetails?.data?.client_contract_period}
              />
              <TextInput
                readOnly={true}
                label="Job Type"
                type={'text'}
                placeholder="Job Type"
                value={jobDetails?.data?.job_type}
              />
              <TextInput
                readOnly={true}
                label="W2 Pay Rate"
                type={'text'}
                placeholder="W2 Pay Rate"
                // value={jobDetails?.data?.w2_ray_rate}
              />
              <TextInput
                readOnly={true}
                label="Contract Period"
                type={'text'}
                placeholder="Contract Period"
                // value={jobDetails?.data?.contract_period}
              />
              <TextInput
                readOnly={true}
                label="Contract Period"
                type={'text'}
                placeholder="Contract Period"
                // value={jobDetails?.data?.contract_period}
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
              <TextInput
                readOnly={true}
                label="Job Domain"
                type={'text'}
                placeholder="Job Domain"
                // value={jobDetails?.data?.job_domain}
              />
              <TextInput
                readOnly={true}
                label="Job Description"
                type={'text'}
                placeholder="Job Description"
                // value={jobDetails?.data?.job_description}
              />
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="attachments" style={{ borderBottom: 'none' }}>
          <Accordion.Control style={{ padding: '0' }}>
            <TextDivider label="Attachments" />
          </Accordion.Control>
          <Accordion.Panel>
            <Group grow align="center" mt="md">
              <FileInput
                label="Attachments"
                placeholder="Attachments"
                // value={jobDetails?.data?.attachments}

                // accept="image/png,image/jpeg, "
              />
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  )
}
