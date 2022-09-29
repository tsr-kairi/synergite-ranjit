import useEditClient from '@/pages/client/hooks/useEditClient'
import { TClient } from '@/types'
import { TextInput, Group, createStyles } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    backgroundColor: 'transparent',
  },
}))

export default function OnboardClientDetails(clientDetailsData: TClient) {
  const { classes } = useStyles()
  const { mutate: clientDetails } = useEditClient()
  console.log('[OnboardClientDetails] clientDetailsData =', clientDetailsData)

  const form = useForm<TClient>({
    // validate: zodResolver(zClientEdit),
    initialValues: clientDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TClient) => {
    const clientDetailsData = {
      ...values,
    }

    clientDetails(clientDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Client Details Fetched Successfully.',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="First Name"
              type={'text'}
              placeholder="First Name"
              {...form.getInputProps('first_name')}
            />
            <TextInput
              // readonly="true"
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              {...form.getInputProps('last_name')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Email"
              type={'text'}
              placeholder="Email"
              {...form.getInputProps('primary_email')}
            />
            <TextInput
              // readonly="true"
              label="Phone"
              type={'tel'}
              placeholder="Phone"
              {...form.getInputProps('primary_phone')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="City"
              type={'text'}
              placeholder="City"
              {...form.getInputProps('city')}
            />
            <TextInput
              // readonly="true"
              label="State"
              type={'text'}
              placeholder="State"
              {...form.getInputProps('state')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // readonly="true"
              label="Country"
              type={'text'}
              placeholder="Country"
              {...form.getInputProps('country')}
            />
          </Group>
          {/* <div>
            <Button fullWidth type="submit" mt="md" mb="lg">
              Update Now
            </Button>
          </div> */}
        </form>
      </div>
    </>
  )
}
