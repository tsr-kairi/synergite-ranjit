import useEditTask from '@/pages/activity/hooks/useEditTask'
import { TTasks } from '@/types/activity-type'
import { TextInput, Button, createStyles, Paper } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(taskData: TTasks) {
  const { classes } = useStyles()
  const { mutate: editTask } = useEditTask()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const id = params.get('id')

  const form = useForm<TTasks>({
    // validate: zodResolver(zContactEdit),
    initialValues: taskData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TTasks) => {
    const taskEditData = {
      ...values,
      // status: 'published',
      onboarding_activity_id: Number(id),
    }

    editTask(taskEditData)

    showNotification({
      title: 'Success!!',
      message: 'Task Edited successfully.',
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
              Edit
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}
