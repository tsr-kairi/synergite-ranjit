import useCreateClient from '@/pages/client/hooks/useCreateClient'
import { TClientCreate, zClientCreate } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useSearchParams } from 'react-router-dom'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const { classes } = useStyles()
  const { mutate: addClient } = useCreateClient()

  const [searchParams] = useSearchParams()

  const canName = `${employeeData?.data?.fname || ''} ${
    employeeData?.data?.lname || ''
  }`
  const employeeUUID = searchParams.get('employee_uuid')
  const { data: employeeData } = useGetCandidateById(employeeUUID || '')

  const form = useForm<TClientCreate>({
    validate: zodResolver(zClientCreate),
    initialValues: {
      first_name: '',
      last_name: '',
      address_line2: '',
      zip: '',
      country: '',
      city: '',
      state: '',
      primary_email: '',
      primary_phone: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TClientCreate) => {
    const clientCreateData = {
      ...values,
      // status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = addClient(clientCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Client Created successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mb="lg">
            <TextInput
              readOnly={true}
              label="Candidate Name"
              type={'text'}
              placeholder="Candidate Name"
              value={canName}
              style={{ minWidth: '200px' }}
            />
            <TextInput
              readOnly={true}
              label="Email"
              type={'text'}
              placeholder="Email"
              value={employeeData?.data?.email}
              style={{ minWidth: '200px' }}
            />
            <TextInput
              readOnly={true}
              label="Phone"
              type={'text'}
              placeholder="Phone"
              value={employeeData?.data?.phone}
              style={{ minWidth: '200px' }}
            />
            <TextInput
              readOnly={true}
              label="SSN"
              type={'text'}
              placeholder="SSN"
              value={employeeData?.data?.ssn_no}
              style={{ minWidth: '200px' }}
            />
            <Link to={`/candidate-details`} className={classes.userLink}>
              <Tooltip
                label="Click to view"
                color="blue"
                withArrow
                transition="pop-top-right"
                transitionDuration={300}
              >
                <IconEyeCheck />
              </Tooltip>
            </Link>
          </Group>

          <Group grow align="center" mb="lg">
            <div style={{ minWidth: '200px' }}>
              <Select
                readOnly={true}
                label="Employment Type"
                placeholder="Employment Type"
                data={[
                  { label: 'H1', value: 'h1' },
                  {
                    label: 'Green Card/Citizen',
                    value: 'Green Card/Citizen',
                  },
                  { label: 'Green Card/USC', value: 'Green Card/USC' },
                  { label: 'NA', value: 'na' },
                ]}
                {...form.getInputProps('employee_type')}
              />
            </div>
            <TextInput
              readOnly={true}
              label="Date of birth"
              type={'date'}
              placeholder="Date of birth"
              value={employeeData?.data?.dob}
              style={{ minWidth: '100px' }}
            />
            <TextInput
              readOnly={true}
              label="City"
              type={'text'}
              placeholder="City"
              value={employeeData?.data?.city}
            />
            <TextInput
              readOnly={true}
              label="State"
              type={'text'}
              placeholder="State"
              value={employeeData?.data?.state}
            />
            <Link to={`/candidate`} className={classes.userLink}>
              <Tooltip
                label="Click to view"
                color="blue"
                withArrow
                transition="pop-top-right"
                transitionDuration={300}
              >
                <Button
                  className={classes.detailHead}
                  rightIcon={<IconEyeCheck />}
                  variant="filled"
                >
                  View More
                </Button>
              </Tooltip>
            </Link>
          </Group>
        </form>
      </Paper>
    </>
  )
}
