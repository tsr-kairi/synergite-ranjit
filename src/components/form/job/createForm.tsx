import useCreateJob from '@/pages/client/hooks/useCreateJob'
import { TJobCreate, zJobCreate } from '@/types'
import { TextInput, Button, Group, createStyles, Paper } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const { clientId } = useParams()
  const { classes } = useStyles()
  const { mutate: addJob, isSuccess, isError } = useCreateJob()

  const form = useForm<TJobCreate>({
    validate: zodResolver(zJobCreate),
    initialValues: {
      job_name: '',
      location: '',
      category: '',
      job_status: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TJobCreate) => {
    const jobCreateData = {
      ...values,
      status: 'published',
      clients: Number(clientId),
    }

    const data = addJob(jobCreateData)
    console.log(data)

    showNotification({
      title: 'Success!!',
      message: 'Job Created successfully.',
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

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Job Name"
              type={'text'}
              placeholder="Job Name"
              {...form.getInputProps('job_name')}
            />
            <TextInput
              required
              label="Location"
              type={'text'}
              placeholder="Location"
              {...form.getInputProps('location')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Category"
              type={'text'}
              placeholder="Category"
              {...form.getInputProps('category')}
            />
            <TextInput
              required
              label="Job Status"
              // onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              //   console.log(event)

              //   event.target.value
              //     .replace(/[^0-9.]/g, '')
              //     .replace(/(\..*)\./g, '$1')
              // }}
              type={'text'}
              placeholder="Job Status"
              {...form.getInputProps('job_status')}
            />
          </Group>

          <Button fullWidth type="submit" mt="md" mb="lg">
            Add New
          </Button>
        </form>
      </Paper>
    </>
  )
}
