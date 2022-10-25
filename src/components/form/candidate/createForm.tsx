import useCreateCandidate from '@/pages/candidate/hooks/useCreateCandidate'
import { TCandidateCreate, zCandidateCreate } from '@/types/candidate-type'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Stepper,
  Avatar,
  Select,
  Accordion,
  Divider,
  Box,
  Textarea,
  Grid,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconChevronsRight, IconUpload } from '@tabler/icons'
import { useState } from 'react'
const useStyles = createStyles((theme) => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
  dividerText: {
    color: theme.colors.blue[9],
  },
}))

export default function CreateForm() {
  const [active, setActive] = useState(0)
  const { classes } = useStyles()
  const { mutate: addCandidate } = useCreateCandidate()

  const form = useForm<TCandidateCreate>({
    validate: zodResolver(zCandidateCreate),
    initialValues: {
      employee_id: '',
      fname: '',
      lname: '',
      email: '',
      phone: '',
      ssn_no: '',
      dob: '',
      gender: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      county: '',
      country: '',
      ethnic_origin: '',
      zip: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TCandidateCreate) => {
    const candidateCreateData = {
      ...values,
      // status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    addCandidate(candidateCreateData)

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
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stepper active={active} breakpoint="sm">
            {/* Personal Information */}
            <Stepper.Step label="Info" description="Personal information">
              <Accordion defaultValue="">
                <Accordion.Item
                  value="personal_details"
                  style={{ borderBottom: 'none' }}
                >
                  <Accordion.Control style={{ padding: '0' }}>
                    <Divider
                      className={classes.dividerText}
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
                            Personal Details
                          </Box>
                        </>
                      }
                    />
                  </Accordion.Control>
                  {/* candidate */}
                  <Accordion.Panel>
                    <Group grow align="center" mt="md">
                      <FileInput
                        label="Profile Image"
                        // mt="md"
                        {...form.getInputProps('profile_image')}
                      />
                      {/* <Avatar
                  variant="outline"
                  radius="xl"
                  size="xl"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                /> */}
                    </Group>
                    <Group grow align="center" mt="md">
                      <TextInput
                        required
                        label="First Name"
                        type={'text'}
                        placeholder="First Name"
                        {...form.getInputProps('fname')}
                      />
                      <TextInput
                        label="Middle Name"
                        type={'text'}
                        placeholder="Middle Name"
                        {...form.getInputProps('lname')}
                      />
                      <TextInput
                        required
                        label="Last Name"
                        type={'text'}
                        placeholder="Last Name"
                        {...form.getInputProps('lname')}
                      />
                      <TextInput
                        required
                        label="Email"
                        type={'text'}
                        placeholder="Email"
                        {...form.getInputProps('email')}
                      />
                    </Group>
                    <Group grow align="center" mt="md">
                      <TextInput
                        required
                        label="Mobile Number"
                        type={'text'}
                        placeholder="Mobile Number"
                        {...form.getInputProps('phone')}
                      />
                      <TextInput
                        required
                        label="Date of birth"
                        type={'date'}
                        placeholder="Date of birth"
                        {...form.getInputProps('dob')}
                      />
                      <Select
                        data={[
                          { value: 'Available', label: 'Available' },
                          { value: 'Not Available', label: 'Not Available' },
                          { value: 'Do not Call', label: 'Do not Call' },
                          { value: 'Inactive', label: 'Inactive' },
                          { value: 'Placed', label: 'Placed' },
                        ]}
                        placeholder="Candidate Status"
                        label="Candidate Status"
                      />
                      <Select
                        data={[{ value: 'Pradeep', label: 'Pradeep' }]}
                        placeholder="Account Owner"
                        label="Account Owner"
                      />
                    </Group>
                    <Group grow align="center" mt="md">
                      <Select
                        data={[
                          { value: 'None Selected', label: 'None Selected' },
                          {
                            value: 'Application Packaging Engineer',
                            label: 'Application Packaging Engineer',
                          },
                          {
                            value: 'Architect',
                            label: 'Architect',
                          },
                          {
                            value: 'Assoc Business Analyst',
                            label: 'Assoc Business Analyst',
                          },
                          {
                            value: 'Assoc Developer',
                            label: 'Assoc Developer',
                          },
                          {
                            value: 'Assoc QA Analyst',
                            label: 'Assoc QA Analyst',
                          },
                          {
                            value: 'Associate Java Developer',
                            label: 'Associate Java Developer',
                          },
                          {
                            value: 'BI Developer',
                            label: 'BI Developer',
                          },
                          {
                            value: 'Business Intelligence Analyst',
                            label: 'Business Intelligence Analyst',
                          },
                          {
                            value: 'Business Systems Analyst',
                            label: 'Business Systems Analyst',
                          },
                          {
                            value: 'Chief Strategy Officer',
                            label: 'Chief Strategy Officer',
                          },
                          {
                            value: 'Client Relations Director',
                            label: 'Client Relations Director',
                          },
                          {
                            value: 'Cloud Data Solutions Developer',
                            label: 'Cloud Data Solutions Developer',
                          },
                          {
                            value: 'Cloud Data Solutions Developer',
                            label: 'Cloud Data Solutions Developer',
                          },
                        ]}
                        placeholder="Job Title"
                        label="Job Title"
                      />
                      <Select
                        data={[
                          { value: 'H1', label: 'H1' },
                          { value: 'USC', label: 'USC' },
                          { value: 'Green Card', label: 'Green Card' },
                        ]}
                        placeholder="Visa Status"
                        label="Visa Status"
                      />
                      <TextInput
                        required
                        label="Work Experience"
                        type={'text'}
                        placeholder="Work Experience"
                      />
                      <Select
                        data={[
                          { value: 'Facebook', label: 'Facebook' },
                          { value: 'Twitter', label: 'Twitter' },
                          { value: 'Linked In', label: 'Linked In' },
                          { value: 'Others', label: 'Others' },
                        ]}
                        placeholder="Source"
                        label="Source"
                      />
                      {/* <TextInput
                  required
                  label="SSN"
                  type={'text'}
                  placeholder="SSN"
                  {...form.getInputProps('ssn_no')}
                /> */}
                    </Group>
                    <Group grow align="center" mt="md">
                      <Select
                        data={[
                          { value: 'W2', label: 'W2' },
                          { value: 'C2C', label: 'C2C' },
                          { value: '1099', label: '1099' },
                          {
                            value: 'Internal Employees',
                            label: 'Internal Employees',
                          },
                        ]}
                        placeholder="Employment Type"
                        label="Employment Type"
                      />
                      <TextInput
                        required
                        label="Skills"
                        type={'text'}
                        placeholder="Skills"
                      />
                      <TextInput
                        required
                        label="Soft Skills"
                        type={'text'}
                        placeholder="Soft Skills"
                      />
                      <Textarea
                        label="Profile Summary"
                        placeholder="Profile Summary"
                        autosize
                        minRows={3}
                        maxRows={4}
                      />
                    </Group>
                    <Group grow align="center" mt="md">
                      <TextInput
                        required
                        label="Expected Rate"
                        type={'text'}
                        placeholder="Expected Rate"
                      />
                      <Select
                        data={[
                          { value: 'Hourly', label: 'Hourly' },
                          { value: 'Daily', label: 'Daily' },
                          { value: 'Weekly', label: 'Weekly' },
                          {
                            value: 'Monthly',
                            label: 'Monthly',
                          },
                        ]}
                        placeholder="Expected Rate Type"
                        label="Expected Rate Type"
                      />
                      <TextInput
                        required
                        label="Languages Known"
                        type={'text'}
                        placeholder="Languages Known"
                      />
                      <TextInput
                        required
                        label="Gender"
                        type={'text'}
                        placeholder="Gender"
                        {...form.getInputProps('gender')}
                      />
                    </Group>
                    <Group grow align="center" mt="md">
                      <Select
                        data={[
                          { value: 'Married', label: 'Married' },
                          { value: 'Single', label: 'Single' },
                        ]}
                        placeholder="Marital Status"
                        label="Marital Status"
                      />
                      <Select
                        data={[
                          { value: 'Florida Blue', label: 'Florida Blue' },
                          { value: 'Synergy', label: 'Synergy' },
                        ]}
                        placeholder="Vendor"
                        label="Vendor"
                      />
                      <Select
                        data={[
                          {
                            value: 'Recruitment Manager',
                            label: 'Recruitment Manager',
                          },
                        ]}
                        placeholder="Vendor Contact"
                        label="Vendor Contact"
                      />
                    </Group>

                    {/* <Group grow align="center" mt="md">
                     
                      <TextInput
                        required
                        label="Ethnic Origin"
                        type={'text'}
                        placeholder="Ethnic Origin"
                        {...form.getInputProps('ethnic_origin')}
                      />
                    </Group> */}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultValue="">
                <Accordion.Item
                  value="address_details"
                  style={{ borderBottom: 'none' }}
                >
                  <Accordion.Control style={{ padding: '0' }}>
                    <Divider
                      className={classes.dividerText}
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
                            Address Details
                          </Box>
                        </>
                      }
                    />
                  </Accordion.Control>
                  {/* candidate */}
                  <Accordion.Panel>
                    <Group grow align="center" mt="md">
                      <TextInput
                        required
                        label="Address line 1"
                        type={'text'}
                        placeholder="Address line 1"
                        {...form.getInputProps('address1')}
                      />
                      <TextInput
                        required
                        label="Address line 2"
                        type={'text'}
                        placeholder="Address line 2"
                        {...form.getInputProps('address2')}
                      />
                      <TextInput
                        label="Address line 3"
                        type={'text'}
                        placeholder="Address line 3"
                      />
                      <TextInput
                        required
                        label="City"
                        type={'text'}
                        placeholder="City"
                        {...form.getInputProps('city')}
                      />
                    </Group>

                    <Group grow align="center" mt="md">
                      <TextInput
                        required
                        label="State"
                        type={'text'}
                        placeholder="State"
                        {...form.getInputProps('state')}
                      />
                      <TextInput
                        required
                        label="County"
                        type={'text'}
                        placeholder="County"
                        {...form.getInputProps('county')}
                      />
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
                        {...form.getInputProps('zip')}
                      />
                    </Group>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultValue="">
                <Accordion.Item
                  value="resume_details"
                  style={{ borderBottom: 'none' }}
                >
                  <Accordion.Control style={{ padding: '0' }}>
                    <Divider
                      className={classes.dividerText}
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
                            Upload Resume
                          </Box>
                        </>
                      }
                    />
                  </Accordion.Control>
                  {/* candidate */}
                  <Accordion.Panel>
                    <Grid>
                      <Grid.Col span={4}>
                        <FileInput
                          label="Upload Resume"
                          placeholder="Upload Resume"
                          icon={<IconUpload size={14} />}
                        />
                      </Grid.Col>
                      <Grid.Col span={4}></Grid.Col>
                      <Grid.Col span={4}></Grid.Col>
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Stepper.Step>
            {/* Address */}

            <Stepper.Step
              label="Education Details"
              description="Candidate Education Details"
            ></Stepper.Step>
            <Stepper.Step
              label="Documents"
              description="Candidate Documents"
            ></Stepper.Step>
          </Stepper>
          {/* prev and next button */}
          <Group position="center" mt="xl">
            {/* {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Prev
              </Button>
            )}
            {active !== 1 && <Button onClick={nextStep}>Next</Button>} */}
            <Button fullWidth type="submit" mt="xl">
              Save
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  )
}
