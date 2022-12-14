import useCreateRoles from '@/pages/roles/hooks/useCreateRoles'
import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartment, TDepartmentFindAll } from '@/types/department-type'
import { TRolesCreate, zRolesCreate } from '@/types/roles-type'
import { TextInput, Button, createStyles, Paper, Select } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { useQuery } from 'react-query'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const { classes } = useStyles()
  const { mutate: addRoles } = useCreateRoles()

  const form = useForm<TRolesCreate>({
    validate: zodResolver(zRolesCreate),
    initialValues: {
      name: '',
      department_uuid: '',
      // immigration_status: '',
      // employee_type: '',
      // new_client: '',
      // new_subvendor: '',
      // default_activity: '',
    },
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

  const handleSubmit = (values: TRolesCreate) => {
    console.log('values', values)
    const rolesCreateData = {
      ...values,
    }

    addRoles(rolesCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Roles Created successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* <Select
            mb={16}
            label="Immigration Status*"
            placeholder="Immigration Status"
            data={[
              { label: 'H1', value: 'h1' },
              { label: 'Green Card/Citizen', value: 'Green Card/Citizen' },
              { label: 'Green Card/USC', value: 'Green Card/USC' },
              { label: 'NA', value: 'na' },
            ]}
            {...form.getInputProps('immigration_status')}
          />
          <Select
            mb={16}
            label="Type of Employee*"
            placeholder="Type of Employee"
            data={[
              { label: 'W2', value: 'W2' },
              { label: 'C2C', value: 'C2C' },
              { label: 'Green Card/USC', value: 'Green Card/USC' },
              { label: '1099', value: '1099' },
              { label: 'Internal Employee', value: 'Internal Employee' },
            ]}
            {...form.getInputProps('employee_type')}
          />
          <Select
            mb={16}
            label="New Client*"
            placeholder="New Client"
            data={[
              { label: 'Yes', value: 'Yes' },
              { label: 'NO', value: 'NO' },
              { label: 'NA', value: 'NA' },
            ]}
            {...form.getInputProps('new_client')}
          />
          <Select
            mb={16}
            label="New Sub Vendor*"
            placeholder="New Sub Vendor"
            data={[
              { label: 'Yes', value: 'Yes' },
              { label: 'NO', value: 'NO' },
              { label: 'NA', value: 'NA' },
            ]}
            {...form.getInputProps('new_subvendor')}
          />
          <TextInput
            mb={16}
            label="Default Activity"
            placeholder="Default Activity"
            {...form.getInputProps('default_activity')}
          /> */}
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
            Add New
          </Button>
        </form>
      </Paper>
    </>
  )
}
