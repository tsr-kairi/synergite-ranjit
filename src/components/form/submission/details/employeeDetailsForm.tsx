import useEditEmployee from '@/pages/employee/hooks/useEditEmployee'
import useGetEmployeeById from '@/pages/employee/hooks/useGetEmployeeById'
import { TAEmployee } from '@/types/employee-type'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Stepper,
  Loader,
} from '@mantine/core'
// import { useForm } from '@mantine/form'
// import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))
// employeeData: TAEmployee
export default function EmployeeDetailsForm() {
  const [active, setActive] = useState(0)

  const { classes } = useStyles()
  // const { mutate: editEmployee } = useEditEmployee()
  const { employeeId } = useParams()

  // const form = useForm<TAEmployee>({
  //   // validate: zodResolver(zEmployeeEdit),
  //   initialValues: employeeData,
  //   validateInputOnChange: true,
  //   clearInputErrorOnChange: true,
  // })

  // const handleSubmit = (values: TAEmployee) => {
  //   const employeeEditData = {
  //     ...values,
  //     profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
  //   }

  //   editEmployee(employeeEditData)

  //   showNotification({
  //     title: 'Success!!',
  //     message: 'Employee Edited successfully.',
  //   })
  // }
  // next btn
  const nextStep = () =>
    setActive((current) => {
      // if (hasErrors) {
      //   return current
      // }
      return current < 2 ? current + 1 : current
    })
  // prev btn
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const {
    data: employeeData,
    isError,
    error,
    isLoading,
  } = useGetEmployeeById(
    '3A73E879:7D75:6FC1:E714:7EABE37DDF84F03F63B33E40D65AB9BCF24067E2' ||
      employeeId ||
      ''
  )

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        {/* onSubmit={form.onSubmit(handleSubmit)} */}
        <form>
          <Stepper active={active} breakpoint="sm">
            {/* Personal Information */}
            <Stepper.Step label="Info" description="Personal information">
              <Group grow align="center" mt="md">
                <FileInput
                  label="Profile Image"
                  // mt="md"
                  // {...form.getInputProps('profile_image')}
                />
                <TextInput
                  required
                  label="Employee Id"
                  type={'text'}
                  placeholder="Employee Id"
                  value={employeeData?.data?.employee_id}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="First Name"
                  type={'text'}
                  placeholder="First Name"
                  value={employeeData?.data?.fname}
                />
                <TextInput
                  required
                  label="Last Name"
                  type={'text'}
                  placeholder="Last Name"
                  value={employeeData?.data?.lname}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Email"
                  type={'text'}
                  placeholder="Email"
                  value={employeeData?.data?.email}
                />
                <TextInput
                  required
                  label="Phone"
                  type={'text'}
                  placeholder="Phone"
                  value={employeeData?.data?.phone}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="SSN"
                  type={'text'}
                  placeholder="SSN"
                  value={employeeData?.data?.ssn_no}
                />
                <TextInput
                  required
                  label="Date of birth"
                  type={'date'}
                  placeholder="Date of birth"
                  value={employeeData?.data?.dob}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Gender"
                  type={'text'}
                  placeholder="Gender"
                  value={employeeData?.data?.gender}
                />
                <TextInput
                  required
                  label="Ethnic Origin"
                  type={'text'}
                  placeholder="Ethnic Origin"
                  value={employeeData?.data?.ethnic_origin}
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
                  value={employeeData?.data?.address1}
                />
                <TextInput
                  required
                  label="Address line 2"
                  type={'text'}
                  placeholder="Address line 2"
                  value={employeeData?.data?.address2}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="City"
                  type={'text'}
                  placeholder="City"
                  value={employeeData?.data?.city}
                />
                <TextInput
                  required
                  label="State"
                  type={'text'}
                  placeholder="State"
                  value={employeeData?.data?.state}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Country"
                  type={'text'}
                  placeholder="Country"
                  value={employeeData?.data?.country}
                />
                <TextInput
                  required
                  label="Zip Code"
                  type={'text'}
                  placeholder="Zip Code"
                  value={employeeData?.data?.zip}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="County"
                  type={'text'}
                  placeholder="County"
                  value={employeeData?.data?.county}
                />
                <Button fullWidth type="submit" mt="xl">
                  Update
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
