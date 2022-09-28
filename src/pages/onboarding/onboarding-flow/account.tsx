import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  TextInput,
  Group,
  createStyles,
  Divider,
  Box,
  Select,
  Autocomplete,
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

export default function Account({ form }: onboardingStepperProps) {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.paper}>
        {/* Client Information */}
        <Divider
          className={classes.hrInfo}
          my="20px"
          label={
            <>
              <IconChevronsRight />
              <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                Client Information
              </Box>
            </>
          }
        />
        <Group grow align="center" mt="md">
          <TextInput
            label="Name of Recruiter"
            type={'text'}
            placeholder="Name of Recruiter"
            {...form.getInputProps('name_of_recruiter')}
          />
          <TextInput
            label="Contact Number of Recruiter"
            type={'number'}
            placeholder="Contact Number of Recruiter"
            {...form.getInputProps('contact_number_of_recruiter')}
          />
        </Group>
        {/* Pay Info */}
        <Divider
          className={classes.hrInfo}
          my="20px"
          label={
            <>
              <IconChevronsRight />
              <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                Pay Information
              </Box>
            </>
          }
        />
        <Group grow align="center" mt="md">
          <TextInput
            label="Bill rate"
            type={'text'}
            placeholder="Bill rate"
            {...form.getInputProps('bill_rate')}
          />
          <TextInput
            label="Pay rate"
            type={'text'}
            placeholder="Pay rate"
            {...form.getInputProps('pay_rate')}
          />
          <Autocomplete
            label="Payment frequency"
            placeholder="Payment frequency"
            {...form.getInputProps('payment_frequency')}
            limit={30}
            maxDropdownHeight={200}
            nothingFound="No Payment Frequency found"
            data={['Net o', 'Net 3', 'Net 5', 'Nil 45', 'Net 15', 'Nil 30']}
          />
        </Group>
        {/* Commission Info */}
        <Divider
          className={classes.hrInfo}
          my="20px"
          label={
            <>
              <IconChevronsRight />
              <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                Commissions Information
              </Box>
            </>
          }
        />
        <Group grow align="center">
          <TextInput
            label="Account Manager Commission"
            type={'text'}
            placeholder="Account Manager Commission"
            {...form.getInputProps('account_manager_commission')}
          />
          <TextInput
            label="Recruitment Manager Commission"
            type={'text'}
            placeholder="Recruitment Manager Commission"
            {...form.getInputProps('recruitment_manager_commission')}
          />
        </Group>
        <Group grow align="center" mt="md">
          <TextInput
            label="Recruitment Commission"
            type={'text'}
            placeholder="Recruitment Commission"
            {...form.getInputProps('recruitment_commission')}
          />
          <TextInput
            label="Additional Information"
            type={'text'}
            placeholder="Additional Information"
            {...form.getInputProps('additional_information')}
          />
        </Group>
        {/* Other and Vendor Information */}
        <Group grow align="center" mt="xl">
          <Divider
            className={classes.hrInfo}
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  Other Information
                </Box>
              </>
            }
          />
          <Divider className={classes.hrInfo} />
          <Divider
            className={classes.hrInfo}
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  Vendor Information
                </Box>
              </>
            }
          />
        </Group>
        <Group grow align="center" mt="md">
          <TextInput
            label="Additional Commission"
            type={'text'}
            placeholder="Additional Commission"
            {...form.getInputProps('additional_commission')}
          />
          <TextInput
            label="Remarks"
            type={'text'}
            placeholder="Remarks"
            {...form.getInputProps('remarks')}
          />
          <Select
            label="Vendor"
            placeholder="Vendor"
            {...form.getInputProps('vendor')}
            data={[
              {
                value: 'Only Applicable for C2C employee type',
                label: 'Only Applicable for C2C employee type',
              },
            ]}
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