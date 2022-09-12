import useEditSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useEditClient'
import { TSubmission, zSubmissionEdit } from '@/types/submission-type'
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

export default function EditForm(submissionData: TSubmission) {
  const [active, setActive] = useState(0)
  const { classes } = useStyles()
  const { mutate: editSubmission, isSuccess, isError } = useEditSubmission()

  const form = useForm<TSubmission>({
    validate: zodResolver(zSubmissionEdit),
    initialValues: submissionData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TSubmission) => {
    const submissionCreateData = {
      ...values,
      status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = editSubmission(submissionCreateData)
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
                  label="Submission Id"
                  type={'text'}
                  placeholder="Submission Id"
                  {...form.getInputProps('submission_id')}
                />
                <TextInput
                  required
                  label="First Name"
                  type={'text'}
                  placeholder="First Name"
                  {...form.getInputProps('first_name')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Last Name"
                  type={'text'}
                  placeholder="Last Name"
                  {...form.getInputProps('last_name')}
                />
                <TextInput
                  required
                  label="Client"
                  type={'text'}
                  placeholder="Client"
                  {...form.getInputProps('client')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Submission Status"
                  type={'text'}
                  placeholder="Submission Status"
                  {...form.getInputProps('submission_status')}
                />
                <TextInput
                  required
                  label="Remarks"
                  type={'text'}
                  placeholder="Remarks"
                  {...form.getInputProps('remarks')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Pay Rate"
                  type={'text'}
                  placeholder="Pay Rate"
                  {...form.getInputProps('pay_rate')}
                />
                <TextInput
                  required
                  label="City"
                  type={'text'}
                  placeholder="City"
                  {...form.getInputProps('city')}
                />
              </Group>
            </Stepper.Step>
            {/* Address */}
            <Stepper.Step label="Additional" description="Additional info">
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="State"
                  type={'text'}
                  placeholder="State"
                  {...form.getInputProps('state')}
                />
                <TextInput
                  required
                  label="Submitted Date"
                  type={'date'}
                  placeholder="Submitted Date"
                  {...form.getInputProps('submitted_date')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Submitted By"
                  type={'text'}
                  placeholder="Submitted By"
                  {...form.getInputProps('submitted_by')}
                />
                <TextInput
                  required
                  label="Rejection Reason"
                  type={'text'}
                  placeholder="Rejection Reason"
                  {...form.getInputProps('rejection_reason')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Recruiters"
                  type={'text'}
                  placeholder="Recruiters"
                  {...form.getInputProps('recruiters')}
                />
                <TextInput
                  required
                  label="Recruitment Manager"
                  type={'text'}
                  placeholder="Recruitment Manager"
                  {...form.getInputProps('recruitment_manager')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Account Manager"
                  type={'text'}
                  placeholder="Account Manager"
                  {...form.getInputProps('account_manager')}
                />
                <Button fullWidth type="submit" mt="xl">
                  Edit
                </Button>
              </Group>
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
