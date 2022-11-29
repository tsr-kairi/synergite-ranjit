import {
  departmentQueryKeys,
  recruitersQueryKeys,
  rolesQueryKeys,
} from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentFindAll } from '@/types/department-type'
import { TOnboarding } from '@/types/onboarding-flow-type'
import { TRecruitersFindAll } from '@/types/recruiters-type'
import { TRolesFindAll } from '@/types/roles-type'
import {
  TextInput,
  Group,
  createStyles,
  Divider,
  Box,
  Select,
  Textarea,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconChevronsRight } from '@tabler/icons'
import { useQuery } from 'react-query'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
  },
  hrInfo: {
    color: theme.colors.blue[9],
  },
}))

type onboardingStepperProps = {
  form: UseFormReturnType<TOnboarding>
}

export default function Job({ form }: onboardingStepperProps) {
  const { classes } = useStyles()

  // get department api function
  const finAlDepartment = async () => {
    const response = await axiosPrivate.get<TDepartmentFindAll>(`/department`)
    return response.data
  }
  const { data: department } = useQuery<TDepartmentFindAll, Error>(
    departmentQueryKeys.allDepartment,
    finAlDepartment
  )

  // get role api function
  const finAlRole = async () => {
    const response = await axiosPrivate.get<TRolesFindAll>(`/role`)
    return response.data
  }
  const { data: role } = useQuery<TRolesFindAll, Error>(
    rolesQueryKeys.allRoles,
    finAlRole
  )

  // get recruiters api function
  const findAlRecruiter = async () => {
    const response = await axiosPrivate.get<TRecruitersFindAll>(`/recruiters`)
    return response.data
  }
  const { data: recruiter } = useQuery<TRecruitersFindAll, Error>(
    recruitersQueryKeys.recruiters,
    findAlRecruiter
  )

  return (
    <>
      <div className={classes.paper}>
        {/* Hr Information */}
        <Divider
          className={classes.hrInfo}
          my="20px"
          label={
            <>
              <IconChevronsRight />
              <Box
                style={{
                  fontFamily: '-moz-initial',
                  fontSize: '16px',
                }}
                ml={5}
              >
                Hr Information
              </Box>
            </>
          }
        />
        <Group grow align="center" mt="md">
          <TextInput
            required
            withAsterisk
            label="Start Date"
            type={'date'}
            placeholder="Start Date"
            {...form.getInputProps('start_date')}
          />
          <TextInput
            label="End Date"
            type={'date'}
            placeholder="End Date"
            {...form.getInputProps('end_date')}
          />
          <Select
            required
            withAsterisk
            label="Reporting to"
            placeholder="Reporting to"
            {...form.getInputProps('reporting_to')}
            data={[{ value: 'Stephanie Hyatt', label: 'Stephanie Hyatt' }]}
          />
          <TextInput
            label="Designation"
            placeholder="Designation"
            {...form.getInputProps('designation')}
            type={'text'}
          />
        </Group>
        {/* Other Information */}
        <Divider
          className={classes.hrInfo}
          my="20px"
          label={
            <>
              <IconChevronsRight />
              <Box
                style={{
                  fontFamily: '-moz-initial',
                  fontSize: '16px',
                }}
                ml={5}
              >
                Other Information
              </Box>
            </>
          }
        />
        <Group grow>
          <Select
            required
            withAsterisk
            label="Overtime Exemption"
            placeholder="Overtime Exemption"
            {...form.getInputProps('overtime_exemption')}
            data={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
          />
          <TextInput
            label="Recruiter Contact Number"
            placeholder="Recruiter Contact Number"
            {...form.getInputProps('recruiter_contact_number')}
            type={'text'}
          />
          <Select
            data={
              recruiter?.data.map((r) => {
                return { value: r.uuid, label: r.fname }
              }) || []
            }
            label="Recruiters"
            placeholder="Recruiters"
            {...form.getInputProps('recruiter_name')}
          />
          <TextInput
            label="Others"
            placeholder="Others"
            {...form.getInputProps('others')}
            type={'text'}
          />
          
          <Select
            label="Department"
            placeholder="Department"
            data={
              department?.data.map((dept) => {
                return { value: dept.name, label: dept.name }
              }) || []
            }
            {...form.getInputProps('department')}
          />
          <Select
            label="Roles"
            placeholder="Roles"
            data={
              role?.data.map((rol) => {
                return { value: rol.name, label: rol.name }
              }) || []
            }
            {...form.getInputProps('role')}
          />
        </Group>
        <Group grow mt="md">
          <Textarea
            label="Remarks"
            placeholder="Remarks"
            {...form.getInputProps('remarks')}
          />
        </Group>
        {/* <div>
            <Button fullWidth type="submit" mt="md" mb="lg">
              Update Now
            </Button>
          </div> */}
      </div>
    </>
  )
}
