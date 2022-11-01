import TextDivider from '@/components/elements/text-divider'
import useEditJob from '@/pages/client/hooks/useEditJob'
import { TJobs } from '@/types'
import {
  createStyles,
  Group,
  Accordion,
  TextInput,
  FileInput,
  ActionIcon,
  Tooltip,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconArrowBackUp } from '@tabler/icons'
import { Link } from 'react-router-dom'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  dividerText: {
    color: theme.colors?.blue?.[9],
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))
export default function JobDetails(jobDetailsData: TJobs) {
  const { classes } = useStyles()
  const { mutate: jobDetails } = useEditJob()

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get('client_id')

  const form = useForm<TJobs>({
    initialValues: jobDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TJobs) => {
    const jobDetailsData = {
      ...values,
    }

    jobDetails(jobDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Job Details Fetched Successfully.',
    })
  }
  // value={clientDetailsData.first_name}
  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group position="apart">
            <Link
              to={`/client-details/${String(clientId)}`}
              className={classes.userLink}
            >
              <Tooltip
                label="Back to Client List"
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
          </Group>
          {/* main details */}
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
                  {/* <TextInput
                    readOnly={true}
                    label="Job ID"
                    type={'text'}
                    placeholder="Job-001"
                    // value={jobDetails.job_id}
                  /> */}
                  <TextInput
                    readOnly={true}
                    label="Client request ID"
                    type={'text'}
                    placeholder="Client request ID"
                    value={jobDetailsData.client_request_id}
                  />
                  <TextInput
                    readOnly={true}
                    label="Start Date"
                    type={'date'}
                    placeholder="Start Date"
                    value={jobDetailsData.start_date}
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={jobDetailsData.city}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="State"
                    type={'text'}
                    placeholder="State"
                    value={jobDetailsData.state}
                  />
                  <TextInput
                    readOnly={true}
                    label="Country Code"
                    type={'text'}
                    placeholder="Country Code"
                    value={jobDetailsData.country_code}
                  />
                  <TextInput
                    readOnly={true}
                    label="Job Title"
                    type={'text'}
                    placeholder="Job Title"
                    value={jobDetailsData.job_title}
                  />
                  <TextInput
                    readOnly={true}
                    label="No of Positions"
                    type={'text'}
                    placeholder="No of Positions"
                    value={jobDetailsData.number_of_position}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Priority"
                    type={'text'}
                    placeholder="Priority"
                    value={jobDetailsData.priority}
                  />
                  <TextInput
                    readOnly={true}
                    label="Priority reason"
                    type={'text'}
                    placeholder="Priority reason"
                    value={jobDetailsData.priority_reason}
                  />
                  <TextInput
                    readOnly={true}
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                    value={jobDetailsData.job_status}
                  />
                  <TextInput
                    readOnly={true}
                    label="Employee Type"
                    type={'text'}
                    placeholder="Employee Type"
                    value={jobDetailsData.employee_type}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Work Experience"
                    type={'text'}
                    placeholder="Work Experience"
                    value={jobDetailsData.work_experience_in_years}
                  />
                  <TextInput
                    readOnly={true}
                    label="Primary Skills"
                    type={'text'}
                    placeholder="Primary Skills"
                    value={jobDetailsData.primary_skills}
                  />
                  <TextInput
                    readOnly={true}
                    label="Secondary Skills"
                    type={'text'}
                    placeholder="Secondary Skills"
                    value={jobDetailsData.secondary_skills}
                  />
                  <TextInput
                    readOnly={true}
                    label="Visa Status"
                    type={'text'}
                    placeholder="Visa Status"
                    value={jobDetailsData.visa_status}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  {/* <TextInput
                    readOnly={true}
                    label="Languages"
                    type={'text'}
                    placeholder="Languages"
                    value={jobDetailsData.languages}
                  /> */}
                  <TextInput
                    readOnly={true}
                    label="Industry"
                    type={'text'}
                    placeholder="Industry"
                    value={jobDetailsData.industry}
                  />
                  <TextInput
                    readOnly={true}
                    label="Client Contact Email"
                    type={'text'}
                    placeholder="Client Contact Email"
                    value={jobDetailsData.client_contact_email}
                  />
                  <TextInput
                    readOnly={true}
                    label="Client Contact Phone"
                    type={'text'}
                    placeholder="Client Contact Phone"
                    value={jobDetailsData.client_contact_phone}
                  />
                </Group>
                {/* <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Created By"
                    type={'text'}
                    placeholder="Created By"
                    value={jobDetailsData.created_by}
                  />
                </Group> */}
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
                    value={jobDetailsData.recruitment_manager_uuid}
                  />
                  <TextInput
                    readOnly={true}
                    label="Account Manager"
                    type={'text'}
                    placeholder="Account Manager"
                    value={jobDetailsData.account_manager_uuid}
                  />
                  <TextInput
                    readOnly={true}
                    label="Recruiters"
                    type={'text'}
                    placeholder="Recruiters"
                    value={jobDetailsData.recruiter_uuid}
                  />
                  <TextInput
                    readOnly={true}
                    label="Sourcer"
                    type={'text'}
                    placeholder="sourcer"
                    value={jobDetailsData.sourcer_uuid}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Additional Recruiters"
                    type={'text'}
                    placeholder="Additional Recruiters"
                    value={jobDetailsData.additional_recruiter_uuid}
                  />
                  <TextInput
                    readOnly={true}
                    label="Maximum Submissions"
                    type={'text'}
                    placeholder="Maximum Submissions"
                    value={jobDetailsData.maximum_submission}
                  />
                  <TextInput
                    readOnly={true}
                    label="Interview Panel"
                    type={'text'}
                    placeholder="Interview Panel"
                    value={jobDetailsData.interview_panel_uuid}
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
                    value={jobDetailsData.client_contract_period}
                  />
                  <TextInput
                    readOnly={true}
                    label="Job Type"
                    type={'text'}
                    placeholder="Job Type"
                    value={jobDetailsData.job_type}
                  />
                  <TextInput
                    readOnly={true}
                    label="W2 Pay Rate"
                    type={'text'}
                    placeholder="W2 Pay Rate"
                    value={jobDetailsData.w2_pay_rate}
                  />
                  <TextInput
                    readOnly={true}
                    label="Contract Period"
                    type={'text'}
                    placeholder="Contract Period"
                    value={jobDetailsData.contract_period}
                  />
                  {/* <TextInput
                    readOnly={true}
                    label="Contract Period"
                    type={'text'}
                    placeholder="Contract Period"
                    value={jobDetailsData.contract_period}
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
                  <TextInput
                    readOnly={true}
                    label="Job Domain"
                    type={'text'}
                    placeholder="Job Domain"
                    value={jobDetailsData.job_domain}
                  />
                  <TextInput
                    readOnly={true}
                    label="Job Description"
                    type={'text'}
                    placeholder="Job Description"
                    value={jobDetailsData.job_description}
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
                    // value={jobDetailsData.attachments}

                    // accept="image/png,image/jpeg, "
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </form>
      </div>
    </>
  )
}
