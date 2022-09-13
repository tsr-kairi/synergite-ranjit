import useCreateSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useCreateClient'
import { TSubmissionCreate, zSubmissionCreate } from '@/types/submission-type'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Stepper,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const [active, setActive] = useState(0)
  const { classes } = useStyles()
  const { mutate: addSubmission, isSuccess, isError } = useCreateSubmission()

  const form = useForm<TSubmissionCreate>({
    validate: zodResolver(zSubmissionCreate),
    initialValues: {
      submission_id: '',
      first_name: '',
      last_name: '',
      client: '',
      submission_status: '',
      remarks: '',
      pay_rate: '',
      city: '',
      state: '',
      submitted_date: '',
      submitted_by: '',
      rejection_reason: '',
      recruiters: '',
      recruitment_manager: '',
      account_manager: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TSubmissionCreate) => {
    const submissionCreateData = {
      ...values,
      status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = addSubmission(submissionCreateData)
    console.log(data)

    showNotification({
      title: 'Success!!',
      message: 'Submission Created successfully.',
    })

    // if (isError)
    //   showNotification({
    //     title: 'Filed!!',
    //     message: 'Failed to create client',
    //   })

    // if (isSuccess) {
    //   form.reset()
    //   showNotification({
    //     title: 'Success!!',
    //     message: 'Client Created successfully.',
    //   })
    // }

    console.log(isError, isSuccess)
  }
  // next btn
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current
      }
      return current < 2 ? current + 1 : current
    })
  // prev btn
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))
  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stepper active={active} breakpoint="sm">
            {/* Personal Information */}
            <Stepper.Step label="Info" description="Basic info">
              <Group grow align="center" mt="md">
                <FileInput
                  label="Profile Image"
                  // mt="md"
                  {...form.getInputProps('profile_image')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="First Name"
                  type={'text'}
                  placeholder="First Name"
                  {...form.getInputProps('first_name')}
                />
                <TextInput
                  required
                  label="Last Name"
                  type={'text'}
                  placeholder="Last Name"
                  {...form.getInputProps('last_name')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Client"
                  type={'text'}
                  placeholder="Client"
                  {...form.getInputProps('client')}
                />
                <TextInput
                  required
                  label="Submission Status"
                  type={'text'}
                  placeholder="Submission Status"
                  {...form.getInputProps('submission_status')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Remarks"
                  type={'text'}
                  placeholder="Remarks"
                  {...form.getInputProps('remarks')}
                />
                <TextInput
                  required
                  label="Pay Rate"
                  type={'text'}
                  placeholder="Pay Rate"
                  {...form.getInputProps('pay_rate')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="City"
                  type={'text'}
                  placeholder="City"
                  {...form.getInputProps('city')}
                />
                <TextInput
                  required
                  label="State"
                  type={'text'}
                  placeholder="State"
                  {...form.getInputProps('state')}
                />
              </Group>
            </Stepper.Step>
            {/* Address */}
            <Stepper.Step label="Additional" description="Additional info">
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Submitted Date"
                  type={'date'}
                  placeholder="Submitted Date"
                  {...form.getInputProps('submitted_date')}
                />
                <TextInput
                  required
                  label="Submitted By"
                  type={'text'}
                  placeholder="Submitted By"
                  {...form.getInputProps('submitted_by')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Rejection Reason"
                  type={'text'}
                  placeholder="Rejection Reason"
                  {...form.getInputProps('rejection_reason')}
                />
                <TextInput
                  required
                  label="Recruiters"
                  type={'text'}
                  placeholder="Recruiters"
                  {...form.getInputProps('recruiters')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Recruitment Manager"
                  type={'text'}
                  placeholder="Recruitment Manager"
                  {...form.getInputProps('recruitment_manager')}
                />
                <TextInput
                  required
                  label="Account Manager"
                  type={'text'}
                  placeholder="Account Manager"
                  {...form.getInputProps('account_manager')}
                />
              </Group>
              <Button fullWidth type="submit" mt="xl">
                Edit
              </Button>
            </Stepper.Step>
          </Stepper>
          {/* prev and next button */}
          <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Prev
              </Button>
            )}
            {active !== 1 && <Button onClick={nextStep}>Next</Button>}
          </Group>
        </form>
      </Paper>
    </>
  )
}
