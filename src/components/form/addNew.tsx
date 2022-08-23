import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  Anchor,
  Checkbox,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function AddNew() {
  const { classes } = useStyles()

  return (
    <>
      <form>
        <Paper p={20} mt={30} radius="sm" className={classes.paper}>
          <Group grow align="center" mt="md">
            <TextInput label="Name" placeholder="Name" required />
            <TextInput label="Email" placeholder="email@email.com" required />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput label="City" placeholder="City" required />
            <TextInput label="State" placeholder="State" required />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput label="Phone" placeholder="Phone" required />
            <TextInput label="Pin" placeholder="Pin" required />
          </Group>
          <Button fullWidth mt="xl" mb="xl">
            Add New
          </Button>
        </Paper>
      </form>
    </>
  )
}
