import useCreateClient from '@/pages/client/hooks/useCreateClient'
import { TClientCreate } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { FormEvent } from 'react'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function AddNew() {
  const { classes } = useStyles()
  const { mutate: addClient } = useCreateClient()

  const form = useForm<TClientCreate>({
    initialValues: {
      // profile_image: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // console.log(event)
    // console.log(form.values)

    const clientCreateData = {
      ...form.values,
      status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = addClient(clientCreateData)

    console.log({ data })

    form.reset()

    // const res = axios.post(
    //   'https://gokv9osl.directus.app/items/clients',
    //   clientCreateData,
    //   {
    //     headers: {
    //       'Content-type': 'application/json',
    //       Authorization: 'Bearer Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE',
    //     },
    //   }
    // )

    // console.log(res)
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Group grow align="center" mt="md">
            <TextInput
              label="First Name"
              placeholder="First Name"
              required
              {...form.getInputProps('first_name')}
            />
            <TextInput
              label="Last Name"
              placeholder="Last Name"
              required
              {...form.getInputProps('last_name')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              label="Email"
              placeholder="email@email.com"
              required
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Phone"
              placeholder="Phone"
              required
              {...form.getInputProps('phone')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              label="City"
              placeholder="City"
              required
              {...form.getInputProps('city')}
            />
            <TextInput
              label="State"
              placeholder="State"
              required
              {...form.getInputProps('state')}
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
