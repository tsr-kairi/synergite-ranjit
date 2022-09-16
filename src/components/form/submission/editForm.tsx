import useEditSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useEditSubmission'
import { TSubmission } from '@/types/submission-type'
import {
  Button,
  createStyles,
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
          <TextInput
            required
            label="Clients Id"
            type={'number'}
            placeholder="Clients Id"
            {...form.getInputProps('client_id')}
          />
          <TextInput
            required
            label="Vendors Id"
            type={'number'}
            placeholder="Vendors Id"
            {...form.getInputProps('vendor_id')}
          />
          <TextInput
            required
            label="Employees Id"
            type={'number'}
            placeholder="Employees Id"
            {...form.getInputProps('employee_id')}
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
