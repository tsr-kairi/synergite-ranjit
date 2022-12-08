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
          <Group position="apart">
            <Link to={`/job`} className={classes.userLink}>
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
                    value={
                      jobDetailsData.client_request_id
                        ? jobDetailsData.client_request_id
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Status"
                    type={'text'}
                    placeholder="Status"
                    value={
                      jobDetailsData.status ? jobDetailsData.status : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="City"
                    type={'text'}
                    placeholder="City"
                    value={jobDetailsData.city ? jobDetailsData.city : 'N/A'}
                  />
                  <TextInput
                    readOnly={true}
                    label="Country"
                    type={'text'}
                    placeholder="Country"
                    value={
                      jobDetailsData.country ? jobDetailsData.country : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Job Title"
                    type={'text'}
                    placeholder="Job Title"
                    value={
                      jobDetailsData.job_title
                        ? jobDetailsData.job_title
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="No of Positions"
                    type={'text'}
                    placeholder="No of Positions"
                    value={
                      jobDetailsData.number_of_position
                        ? jobDetailsData.number_of_position
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Priority"
                    type={'text'}
                    placeholder="Priority"
                    value={
                      jobDetailsData.priority ? jobDetailsData.priority : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Priority reason"
                    type={'text'}
                    placeholder="Priority reason"
                    value={
                      jobDetailsData.priority_reason
                        ? jobDetailsData.priority_reason
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Customer Type"
                    type={'text'}
                    placeholder="Customer Type"
                    value={
                      jobDetailsData.customer_type
                        ? jobDetailsData.customer_type
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Employment Type"
                    type={'text'}
                    placeholder="Employment Type"
                    value={
                      jobDetailsData.employment_type
                        ? jobDetailsData.employment_type
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Bill Rate"
                    type={'text'}
                    placeholder="Bill Rate"
                    value={
                      jobDetailsData.bill_rate
                        ? jobDetailsData.bill_rate
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Pay Rate"
                    type={'text'}
                    placeholder="Pay Rate"
                    value={
                      jobDetailsData.pay_rate ? jobDetailsData.pay_rate : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Work Experience"
                    type={'text'}
                    placeholder="Work Experience"
                    value={
                      jobDetailsData.work_experience_in_years
                        ? jobDetailsData.work_experience_in_years
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Primary Skills"
                    type={'text'}
                    placeholder="Primary Skills"
                    value={
                      jobDetailsData.primary_skills
                        ? jobDetailsData.primary_skills
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Secondary Skills"
                    type={'text'}
                    placeholder="Secondary Skills"
                    value={
                      jobDetailsData.secondary_skills
                        ? jobDetailsData.secondary_skills
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Remote Status"
                    type={'text'}
                    placeholder="Remote Status"
                    value={
                      jobDetailsData.remote_status
                        ? jobDetailsData.remote_status
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Immigration Status"
                    type={'text'}
                    placeholder="Immigration Status"
                    value={
                      jobDetailsData.immigration_status
                        ? jobDetailsData.immigration_status
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Client Contact Email"
                    type={'text'}
                    placeholder="Client Contact Email"
                    value={
                      jobDetailsData.client_contact_email
                        ? jobDetailsData.client_contact_email
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Client Contact Phone"
                    type={'text'}
                    placeholder="Client Contact Phone"
                    value={
                      jobDetailsData.client_contact_phone
                        ? jobDetailsData.client_contact_phone
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Maximum Submission"
                    type={'text'}
                    placeholder="Maximum Submission"
                    value={
                      jobDetailsData.maximum_submission
                        ? jobDetailsData.maximum_submission
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Created By"
                    type={'text'}
                    placeholder="Created By"
                    value={
                      jobDetailsData.created_by
                        ? jobDetailsData.created_by
                        : 'N/A'
                    }
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
                    value={
                      jobDetailsData.recruitment_manager_uuid
                        ? jobDetailsData.recruitment_manager_uuid
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Account Manager"
                    type={'text'}
                    placeholder="Account Manager"
                    value={
                      jobDetailsData.account_manager_uuid
                        ? jobDetailsData.account_manager_uuid
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Recruiters"
                    type={'text'}
                    placeholder="Recruiters"
                    value={
                      jobDetailsData.recruiter_uuid
                        ? jobDetailsData.recruiter_uuid
                        : 'N/A'
                    }
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    readOnly={true}
                    label="Primary Recruiters"
                    type={'text'}
                    placeholder="Primary Recruiters"
                    value={
                      jobDetailsData.primary_recruiter
                        ? jobDetailsData.primary_recruiter
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Additional Recruiters"
                    type={'text'}
                    placeholder="Additional Recruiters"
                    value={
                      jobDetailsData.additional_recruiter_uuid
                        ? jobDetailsData.additional_recruiter_uuid
                        : 'N/A'
                    }
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
                  <TextInput
                    readOnly={true}
                    label="Recruiter Instructions"
                    type={'text'}
                    placeholder="Recruiter Instructions"
                    value={
                      jobDetailsData.recruiter_instructions
                        ? jobDetailsData.recruiter_instructions
                        : 'N/A'
                    }
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
                    value={
                      jobDetailsData.client_contract_period
                        ? jobDetailsData.client_contract_period
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Job Type"
                    type={'text'}
                    placeholder="Job Type"
                    value={
                      jobDetailsData.job_type ? jobDetailsData.job_type : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Pay Type"
                    type={'text'}
                    placeholder="Pay Type"
                    value={
                      jobDetailsData.pay_type ? jobDetailsData.pay_type : 'N/A'
                    }
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
                    value={
                      jobDetailsData.job_domain
                        ? jobDetailsData.job_domain
                        : 'N/A'
                    }
                  />
                  <TextInput
                    readOnly={true}
                    label="Job Description"
                    type={'text'}
                    placeholder="Job Description"
                    value={
                      jobDetailsData.job_description
                        ? jobDetailsData.job_description
                        : 'N/A'
                    }
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            {/* Docs Details */}
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
                    // value={jobDetailsData.attachments ? jobDetailsData.attachments : 'N/A'}

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
