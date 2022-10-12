import useEditSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useEditSubmission'
import { TSubmission } from '@/types/submission-type'
import {
  Button,
  createStyles,
  Group,
  Paper,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(submissionData: TSubmission) {
  const { classes } = useStyles()
  const { mutate: editSubmission } = useEditSubmission()

  const form = useForm<TSubmission>({
    // validate: zodResolver(zSubmissionEdit),
    initialValues: submissionData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TSubmission) => {
    const submissionCreateData = {
      ...values,
    }

    editSubmission(submissionCreateData)

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
  }

  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group position="apart">
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
          <TextInput
            required
            label="Vendor Name"
            type={'text'}
            placeholder="Vendor Name"
            {...form.getInputProps('vendor_id')}
            readOnly
          />
          <TextInput
            required
            label="Employees Name"
            type={'text'}
            placeholder="Employees Name"
            {...form.getInputProps('employee_id')}
            readOnly
          />
          <Select
            data={[
              { value: 'Unknown', label: 'Unknown' },
              { value: 'Selected', label: 'Selected' },
              { value: 'Rejected', label: 'Rejected' },
              { value: 'On Hold', label: 'On Hold' },
            ]}
            placeholder="Submission Status"
            label="Submission Status"
            mt="md"
            {...form.getInputProps('submission_status')}
          />
          <Group position="apart" mt="md">
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
          <Group position="apart" mt="md">
            <TextInput
              required
              label="Recruiters"
              type={'text'}
              placeholder="Recruiters"
              {...form.getInputProps('recruiters')}
            />
            <TextInput
              required
              label="Rejection Reason"
              type={'text'}
              placeholder="Rejection Reason"
              {...form.getInputProps('rejection_reason')}
            />
          </Group>
          <Textarea
            required
            label="Remarks"
            type={'text'}
            placeholder="Remarks"
            mt="md"
            {...form.getInputProps('remarks')}
          />
          <Button fullWidth type="submit" mt="xl">
            Update Now
          </Button>
        </form>
      </Paper>
    </>
  )
}
