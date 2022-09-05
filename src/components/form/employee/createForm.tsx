import useCreateEmployee from '@/pages/employee/hooks/useCreateEmployee'
import { TAEmployeeCreate, zAEmployeeCreate } from '@/types/employee-type'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  // Stepper,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
// import { useState } from 'react'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  // const [active, setActive] = useState(0)
  const { classes } = useStyles()
  const { mutate: addEmployee, isSuccess, isError } = useCreateEmployee()

  const form = useForm<TAEmployeeCreate>({
    validate: zodResolver(zAEmployeeCreate),
    initialValues: {
      employee_id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      ssn: '',
      dob: '',
      gender: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      country: '',
      ethnic_origin: '',
      zip_code: '',
      type_of_employee: '',
      sde: '',
      account: '',
      contact: '',
      pay_rate: '',
      job_title: '',
      visa_status: '',
      work_state: '',
      work_location: '',
      client_location: '',
      home_location: '',
      candidate_status: '',
      skills: '',
      experience: '',
      department: '',
      reporting_to: '',
      designation: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TAEmployeeCreate) => {
    const employeeCreateData = {
      ...values,
      status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = addEmployee(employeeCreateData)
    console.log(data)

    showNotification({
      title: 'Success!!',
      message: 'Employee Created successfully.',
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
  // // next btn
  // const nextStep = () =>
  //   setActive((current) => {
  //     if (form.validate().hasErrors) {
  //       return current
  //     }
  //     return current < 2 ? current + 1 : current
  //   })
  // // prev btn
  // const prevStep = () =>
  //   setActive((current) => (current > 0 ? current - 1 : current))
  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* <Stepper active={active} breakpoint="sm"> */}
          {/* Personal Information */}
          {/* <Stepper.Step label="Info" description="Personal information"> */}
          <Group grow align="center" mt="md">
            <FileInput
              label="Profile Image"
              size="xs"
              // mt="md"
              {...form.getInputProps('profile_image')}
            />
            <TextInput
              size="xs"
              required
              label="Employee Id"
              type={'text'}
              placeholder="Employee Id"
              {...form.getInputProps('employee_id')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="First Name"
              type={'text'}
              placeholder="First Name"
              {...form.getInputProps('first_name')}
            />
            <TextInput
              size="xs"
              required
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              {...form.getInputProps('last_name')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Email"
              type={'text'}
              placeholder="Email"
              {...form.getInputProps('email')}
            />
            <TextInput
              size="xs"
              required
              label="Phone"
              type={'text'}
              placeholder="Phone"
              {...form.getInputProps('phone')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Ssn"
              type={'text'}
              placeholder="Ssn"
              {...form.getInputProps('ssn')}
            />
            <TextInput
              size="xs"
              required
              label="Date of birth"
              type={'date'}
              placeholder="Date of birth"
              {...form.getInputProps('dob')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Gender"
              type={'text'}
              placeholder="Gender"
              {...form.getInputProps('gender')}
            />
            <TextInput
              size="xs"
              required
              label="Ethnic Origin"
              type={'text'}
              placeholder="Ethnic Origin"
              {...form.getInputProps('ethnic_origin')}
            />
          </Group>
          {/* </Stepper.Step> */}
          {/* Address */}
          {/* <Stepper.Step label="Address" description="Employee address"> */}
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Address line 1"
              type={'text'}
              placeholder="Address line 1"
              {...form.getInputProps('address_line_1')}
            />
            <TextInput
              size="xs"
              required
              label="Address line 2"
              type={'text'}
              placeholder="Address line 2"
              {...form.getInputProps('address_line_2')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="City"
              type={'text'}
              placeholder="City"
              {...form.getInputProps('city')}
            />
            <TextInput
              size="xs"
              required
              label="State"
              type={'text'}
              placeholder="State"
              {...form.getInputProps('state')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Country"
              type={'text'}
              placeholder="Country"
              {...form.getInputProps('country')}
            />
            <TextInput
              size="xs"
              required
              label="Zip Code"
              type={'text'}
              placeholder="Zip Code"
              {...form.getInputProps('zip_code')}
            />
          </Group>
          {/* </Stepper.Step> */}
          {/* Employment details */}
          {/* <Stepper.Step label="Details" description="Employment details"> */}
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Type of employee"
              type={'text'}
              placeholder="Type of employee"
              {...form.getInputProps('type_of_employee')}
            />
            <TextInput
              size="xs"
              required
              label="Start date of employment"
              type={'date'}
              placeholder="Start date of employment"
              {...form.getInputProps('sde')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Account"
              type={'text'}
              placeholder="Account"
              {...form.getInputProps('account')}
            />
            <TextInput
              size="xs"
              required
              label="Contact"
              type={'text'}
              placeholder="Contact"
              {...form.getInputProps('contact')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Pay Rate"
              type={'text'}
              placeholder="Pay Rate"
              {...form.getInputProps('pay_rate')}
            />
            <TextInput
              size="xs"
              required
              label="Job Title"
              type={'text'}
              placeholder="Job Title"
              {...form.getInputProps('job_title')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Visa Status"
              type={'text'}
              placeholder="Visa Status"
              {...form.getInputProps('visa_status')}
            />
            <TextInput
              size="xs"
              required
              label="Work State"
              type={'text'}
              placeholder="Work State"
              {...form.getInputProps('work_state')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Work Location"
              type={'text'}
              placeholder="Work Location"
              {...form.getInputProps('work_location')}
            />
            <TextInput
              size="xs"
              required
              label="Client Location"
              type={'text'}
              placeholder="Client Location"
              {...form.getInputProps('client_location')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Home Location"
              type={'text'}
              placeholder="Home Location"
              {...form.getInputProps('home_location')}
            />
            <TextInput
              size="xs"
              required
              label="Candidate Status"
              type={'text'}
              placeholder="Candidate Status"
              {...form.getInputProps('candidate_status')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Skills"
              type={'text'}
              placeholder="Skills"
              {...form.getInputProps('skills')}
            />
            <TextInput
              size="xs"
              required
              label="Experience"
              type={'text'}
              placeholder="Experience"
              {...form.getInputProps('experience')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Department"
              type={'text'}
              placeholder="Department"
              {...form.getInputProps('department')}
            />
            <TextInput
              size="xs"
              required
              label="Reporting to"
              type={'text'}
              placeholder="Reporting to"
              {...form.getInputProps('reporting_to')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              size="xs"
              required
              label="Designation"
              type={'text'}
              placeholder="Designation"
              {...form.getInputProps('designation')}
            />
            <Button fullWidth type="submit" mt="xl" size="xs">
              Add New
            </Button>
          </Group>
          {/* </Stepper.Step> */}
          {/* </Stepper> */}
          {/* prev and next button */}
          {/* <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
          </Group> */}
        </form>
      </Paper>
    </>
  )
}
