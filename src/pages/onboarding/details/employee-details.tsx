import useEditEmployee from '@/pages/employee/hooks/useEditEmployee'
import { TAEmployee } from '@/types/employee-type'
import { TextInput, Group, createStyles } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    backgroundColor: 'transparent',
  },
}))

export default function OnboardEmployeeDetails(
  employeeDetailsData: TAEmployee
) {
  const { classes } = useStyles()
  const { mutate: employeeDetails } = useEditEmployee()

  const form = useForm<TAEmployee>({
    // validate: zodResolver(zEmployeeEdit),
    initialValues: employeeDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TAEmployee) => {
    const employeeEditData = {
      ...values,
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    employeeDetails(employeeEditData)

    showNotification({
      title: 'Success!!',
      message: 'Employee Details Fetched Successfully..',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Employee Id"
              type={'text'}
              placeholder="Employee Id"
              {...form.getInputProps('id')}
            />
            <TextInput
              // readonly="true"
              label="First Name"
              type={'text'}
              placeholder="First Name"
              {...form.getInputProps('fname')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              {...form.getInputProps('lname')}
            />
            <TextInput
              // readonly="true"
              label="Email"
              type={'text'}
              placeholder="Email"
              {...form.getInputProps('email')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Phone"
              type={'text'}
              placeholder="Phone"
              {...form.getInputProps('phone')}
            />
            <TextInput
              // readonly="true"
              label="SSN"
              type={'text'}
              placeholder="SSN"
              {...form.getInputProps('ssn_no')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Date of birth"
              type={'date'}
              placeholder="Date of birth"
              {...form.getInputProps('dob')}
            />
            <TextInput
              // readonly="true"
              label="Gender"
              type={'text'}
              placeholder="Gender"
              {...form.getInputProps('gender')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Ethnic Origin"
              type={'text'}
              placeholder="Ethnic Origin"
              {...form.getInputProps('ethnic_origin')}
            />
            <TextInput
              // readonly="true"
              label="Address line 1"
              type={'text'}
              placeholder="Address line 1"
              {...form.getInputProps('address1')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Address line 2"
              type={'text'}
              placeholder="Address line 2"
              {...form.getInputProps('address2')}
            />
            <TextInput
              // readonly="true"
              label="City"
              type={'text'}
              placeholder="City"
              {...form.getInputProps('city')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="State"
              type={'text'}
              placeholder="State"
              {...form.getInputProps('state')}
            />
            <TextInput
              // readonly="true"
              label="Country"
              type={'text'}
              placeholder="Country"
              {...form.getInputProps('country')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Zip Code"
              type={'text'}
              placeholder="Zip Code"
              {...form.getInputProps('zip')}
            />
            <TextInput
              // readonly="true"
              label="County"
              type={'text'}
              placeholder="County"
              {...form.getInputProps('county')}
            />
          </Group>
          {/* <Group grow align="center" mt="md">
            <Button fullWidth type="submit" mt="xl">
              Update
            </Button>
          </Group> */}
        </form>
      </div>
    </>
  )
}
