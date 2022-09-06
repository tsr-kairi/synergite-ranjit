import useEditEmployee from '@/pages/employee/hooks/useEditEmployee'
import { TAEmployee, zEmployeeEdit } from '@/types/employee-type'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Stepper,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(employeeData: TAEmployee) {
  const [active, setActive] = useState(0)

  const { classes } = useStyles()
  const { mutate: editEmployee, isSuccess, isError } = useEditEmployee()

  const form = useForm<TAEmployee>({
    validate: zodResolver(zEmployeeEdit),
    initialValues: employeeData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TAEmployee) => {
    const employeeEditData = {
      ...values,
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = editEmployee(employeeEditData)
    console.log(data)

    showNotification({
      title: 'Success!!',
      message: 'Employee Edited successfully.',
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
  // next btn
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current
      }
      return current < 2 ? current + 1 : current
    })
  // prev btn
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))
  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stepper active={active} breakpoint="sm">
            {/* Personal Information */}
            <Stepper.Step label="Info" description="Personal information">
              <Group grow align="center" mt="md">
                <FileInput
                  label="Profile Image"
                  // mt="md"
                  {...form.getInputProps('profile_image')}
                />
                <TextInput
                  required
                  label="Employee Id"
                  type={'text'}
                  placeholder="Employee Id"
                  {...form.getInputProps('employee_id')}
                />
              </Group>
              <Group grow align="center" mt="md">
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
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Email"
                  type={'text'}
                  placeholder="Email"
                  {...form.getInputProps('email')}
                />
                <TextInput
                  required
                  label="Phone"
                  type={'text'}
                  placeholder="Phone"
                  {...form.getInputProps('phone')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Ssn"
                  type={'text'}
                  placeholder="Ssn"
                  {...form.getInputProps('ssn')}
                />
                <TextInput
                  required
                  label="Date of birth"
                  type={'date'}
                  placeholder="Date of birth"
                  {...form.getInputProps('dob')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Gender"
                  type={'text'}
                  placeholder="Gender"
                  {...form.getInputProps('gender')}
                />
                <TextInput
                  required
                  label="Ethnic Origin"
                  type={'text'}
                  placeholder="Ethnic Origin"
                  {...form.getInputProps('ethnic_origin')}
                />
              </Group>
            </Stepper.Step>
            {/* Address */}
            <Stepper.Step label="Address" description="Employee address">
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Address line 1"
                  type={'text'}
                  placeholder="Address line 1"
                  {...form.getInputProps('address_line_1')}
                />
                <TextInput
                  required
                  label="Address line 2"
                  type={'text'}
                  placeholder="Address line 2"
                  {...form.getInputProps('address_line_2')}
                />
              </Group>
              <Group grow align="center" mt="md">
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
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Country"
                  type={'text'}
                  placeholder="Country"
                  {...form.getInputProps('country')}
                />
                <TextInput
                  required
                  label="Zip Code"
                  type={'text'}
                  placeholder="Zip Code"
                  {...form.getInputProps('zip_code')}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="County"
                  type={'text'}
                  placeholder="County"
                  {...form.getInputProps('county')}
                />
                <Button fullWidth type="submit" mt="xl">
                  Edit
                </Button>
              </Group>
            </Stepper.Step>
          </Stepper>
          {/* prev and next button */}
          <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Prev
              </Button>
            )}
            {active !== 1 && <Button onClick={nextStep}>Next</Button>}
          </Group>
        </form>
      </Paper>
    </>
  )
}
