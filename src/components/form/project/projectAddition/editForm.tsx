import useEditProject from '@/pages/timesheets/project/project-addition/hooks/useEditProject'
import { TProject } from '@/types/project-type'
import {
  TextInput,
  Button,
  createStyles,
  Paper,
  Select,
  Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(projectData: TProject) {
  const { classes } = useStyles()
  const { mutate: editProject } = useEditProject()

  const form = useForm<TProject>({
    // validate: zodResolver(zProjectEdit),
    initialValues: projectData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TProject) => {
    const projectCreateData = {
      ...values,
    }

    editProject(projectCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Project Edited successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <TextInput
              mb={16}
              label="Uuid"
              placeholder="Uuid"
              {...form.getInputProps('uuid')}
            />
            <TextInput
              mb={16}
              label="Project Name"
              placeholder="Project Name"
              {...form.getInputProps('project_name')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              mb={16}
              label="Project Id"
              placeholder="Project Id"
              {...form.getInputProps('project_id')}
            />
            <TextInput
              mb={16}
              label="Is Active Status"
              placeholder="Is Active Status"
              {...form.getInputProps('is_active_status')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Select
              mb={16}
              label="Project Mgr"
              placeholder="Project Mgr"
              data={[
                { label: 'Pradeep', value: 'Pradeep' },
                { label: 'Rohit', value: 'Rohit' },
                { label: 'Vishal', value: 'Vishal' },
              ]}
              {...form.getInputProps('assigneeRole')}
            />
            <Button fullWidth type="submit" mt="md" mb="lg">
              Add New
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  )
}
