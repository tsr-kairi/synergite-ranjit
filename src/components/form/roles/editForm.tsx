import useEditRoles from '@/pages/roles/hooks/useEditRoles'
import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentFindAll } from '@/types/department-type'
import { TRoles } from '@/types/roles-type'
import { TextInput, Button, createStyles, Paper, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useQuery } from 'react-query'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(rolesData: TRoles) {
  const { classes } = useStyles()
  const { mutate: editRoles } = useEditRoles()

  const form = useForm<TRoles>({
    // validate: zodResolver(zRolesEdit),
    initialValues: rolesData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  // get department api function
  const finAlDepartment = async () => {
    const response = await axiosPrivate.get<TDepartmentFindAll>(`/department`)
    return response.data
  }
  const { data: department } = useQuery<TDepartmentFindAll, Error>(
    departmentQueryKeys.allDepartment,
    finAlDepartment
  )

  const handleSubmit = (values: TRoles) => {
    const rolesCreateData = {
      ...values,
    }

    editRoles(rolesCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Roles Edited successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            mb={16}
            label="Department"
            placeholder="Department"
            data={
              department?.data.map((dept) => {
                return { value: dept.uuid, label: dept.name }
              }) || []
            }
            {...form.getInputProps('department_uuid')}
          />
          <TextInput
            mb={16}
            label="Role Name"
            placeholder="Role Name"
            {...form.getInputProps('name')}
          />
          {/* <Select
            mb={16}
            label="Assignee Role"
            placeholder="Assignee Role"
            data={[
              { label: 'Supervisor', value: 'Supervisor' },
              { label: 'Department', value: 'Department' },
              { label: 'Contracts', value: 'Contracts' },
            ]}
            {...form.getInputProps('assigneeRole')}
          /> */}
          <Button fullWidth type="submit" mt="md" mb="lg">
            Edit Now
          </Button>
        </form>
      </Paper>
    </>
  )
}
