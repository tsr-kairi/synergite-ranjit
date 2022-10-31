import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  TextInput,
  Group,
  createStyles,
  Divider,
  Box,
  Select,
  Textarea,
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

export default function Job({ form }: onboardingStepperProps) {
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
              <Box
                style={{
                  fontFamily: '-moz-initial',
                  fontSize: '16px',
                }}
                ml={5}
              >
                Hr Information
              </Box>
            </>
          }
        />
        <Group grow align="center" mt="md">
          <TextInput
            required
            label="Start Date"
            type={'date'}
            placeholder="Start Date"
            {...form.getInputProps('start_date')}
          />
          <TextInput
            required
            label="End Date"
            type={'date'}
            placeholder="End Date"
            {...form.getInputProps('end_date')}
          />
          <Select
            required
            label="Reporting to"
            placeholder="Reporting to"
            {...form.getInputProps('reporting_to')}
            data={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
          />
          <TextInput
            required
            label="Designation"
            placeholder="Designation"
            {...form.getInputProps('designation')}
            type={'text'}
          />
        </Group>
        {/* Other Information */}
        <Divider
          className={classes.hrInfo}
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
                Other Information
              </Box>
            </>
          }
        />
        <Group grow>
          <Select
            required
            label="Overtime Exemption"
            placeholder="Overtime Exemption"
            {...form.getInputProps('overtime_exemption')}
            data={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
          />
          <TextInput
            required
            label="Recruiter Contact Number"
            placeholder="Recruiter Contact Number"
            {...form.getInputProps('recruiter_contact_number')}
            type={'text'}
          />
          <TextInput
            required
            label="Recruiter Name"
            placeholder="Recruiter Name"
            {...form.getInputProps('recruiter_name')}
            type={'text'}
          />
          <TextInput
            required
            label="Others"
            placeholder="Others"
            {...form.getInputProps('others')}
            type={'text'}
          />
        </Group>
        <Group grow>
          <Textarea
            required
            mt={'30px'}
            label="Remarks"
            placeholder="Remarks"
            {...form.getInputProps('remarks')}
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
