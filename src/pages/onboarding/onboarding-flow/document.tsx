import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  Group,
  createStyles,
  Divider,
  Box,
  Select,
  FileInput,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconChevronsRight, IconUpload } from '@tabler/icons'
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

export default function Documents({ form }: onboardingStepperProps) {
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
            label="Document Type"
            placeholder="Document Type"
            {...form.getInputProps('document_type')}
            data={[
              { value: 'regular', label: 'Regular' },
              { value: 'premium', label: 'Premium' },
            ]}
          />
          <FileInput
            label="Choose File"
            type={'file'}
            placeholder="Choose File"
            icon={<IconUpload size={14} />}
            {...form.getInputProps('choose_file')}
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
