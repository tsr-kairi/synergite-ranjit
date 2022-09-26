import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  TextInput,
  Group,
  createStyles,
  Divider,
  Box,
  Select,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconChevronsRight } from '@tabler/icons'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
  },
  hrInfo: {
    color: theme.colors.blue[9],
  },
}))

type onboardingStepperProps = {
  form: UseFormReturnType<TOnboarding>
}

export default function Immigration({ form }: onboardingStepperProps) {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.paper}>
        {/* Hr Information */}
        <Divider
          className={classes.hrInfo}
          my="20px"
          label={
            <>
              <IconChevronsRight />
              <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                Other Information
              </Box>
            </>
          }
        />
        <Group grow align="center" mt="md">
          <Select
            label="Processing Type"
            placeholder="Processing Type"
            {...form.getInputProps('processing_type')}
            data={[
              { value: 'regular', label: 'Regular' },
              { value: 'premium', label: 'Premium' },
            ]}
          />
          <TextInput
            label="Who is going to pay Premium"
            type={'text'}
            placeholder="Who is going to pay Premium"
            {...form.getInputProps('end_date')}
          />
        </Group>
        <Group grow align="center" mt="md">
          <TextInput
            label="Immigration Job Title"
            type={'text'}
            placeholder="Immigration Job Title"
            {...form.getInputProps('immigration_job_title')}
          />
          <TextInput
            label="Current H1B validity"
            type={'text'}
            placeholder="Current H1B validity"
            {...form.getInputProps('current_h1b_validity')}
          />
          <TextInput
            label="Current LCA number"
            type={'text'}
            placeholder="Current LCA number"
            {...form.getInputProps('current_lac_number')}
          />
        </Group>
        {/* <div>
            <Button fullWidth type="submit" mt="md" mb="lg">
              Update Now
            </Button>
          </div> */}
      </div>
    </>
  )
}
