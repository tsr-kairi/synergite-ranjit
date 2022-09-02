import useCreateContact from '@/pages/vendor/hooks/useCreateContact'
import { TContactCreate, zContactCreate } from '@/types'
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
import { useParams } from 'react-router-dom'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
  const { vendorId } = useParams()
  const { classes } = useStyles()
  const { mutate: addContact, isSuccess, isError } = useCreateContact()

  const form = useForm<TContactCreate>({
    validate: zodResolver(zContactCreate),
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      city: '',
      country: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TContactCreate) => {
    const contactCreateData = {
      ...values,
      status: 'published',
      vendors: Number(vendorId),
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = addContact(contactCreateData)
    console.log(data)

    showNotification({
      title: 'Success!!',
      message: 'Contact Created successfully.',
    })

    // if (isError)
    //   showNotification({
    //     title: 'Filed!!',
    //     message: 'Failed to create vendor',
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

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
              type={'email'}
              placeholder="email@email.com"
              {...form.getInputProps('email')}
            />
            <TextInput
              required
              label="Phone"
              // onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              //   console.log(event)

              //   event.target.value
              //     .replace(/[^0-9.]/g, '')
              //     .replace(/(\..*)\./g, '$1')
              // }}
              type={'tel'}
              placeholder="Phone"
              {...form.getInputProps('phone')}
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
              label="Country"
              type={'text'}
              placeholder="Country"
              {...form.getInputProps('country')}
            />
          </Group>
          <div>
            <FileInput
              label="Profile Image"
              mt="md"
              {...form.getInputProps('profile_image')}
            />
            <Button fullWidth type="submit" mt="md" mb="lg">
              Add New
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}
