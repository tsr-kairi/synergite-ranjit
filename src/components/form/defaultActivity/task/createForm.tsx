import useCreateTask from '@/pages/activity/hooks/useCreateTask'
import { TTaskCreate, zTaskCreate } from '@/types/activity-type'
import { TextInput, Button, createStyles, Paper } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const id = params.get('id')
  const { classes } = useStyles()
  const { mutate: addContact } = useCreateTask()

  const form = useForm<TTaskCreate>({
    validate: zodResolver(zTaskCreate),
    initialValues: {
      default_task: '',
      status: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TTaskCreate) => {
    const taskCreateData = {
      ...values,
      onboarding_activity_id: Number(id),
    }

    addContact(taskCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Contact Created successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="Default Task"
            type={'text'}
            placeholder="Default Task"
            mt="md"
            {...form.getInputProps('default_task')}
          />
          <TextInput
            required
            label="Status"
            type={'text'}
            placeholder="Status"
            mt="md"
            {...form.getInputProps('status')}
          />
          <div>
            <Button fullWidth type="submit" mt="md" mb="lg">
              Add New
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}
