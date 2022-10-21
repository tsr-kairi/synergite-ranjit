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

export default function Payment({ form }: onboardingStepperProps) {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.paper}>
        <Group grow align="center" mt="lg">
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
          <Select
            label="Payment frequency"
            placeholder="Payment frequency"
            {...form.getInputProps('payment_frequency')}
            data={[
              { value: 'NET_0', label: 'Net 0' },
              { value: 'NET_3', label: 'Net 3' },
              {
                value: 'NET_5',
                label: 'Net 5',
              },
              { value: 'NET_10', label: 'Net 10' },
              { value: 'NET_30', label: 'Net 30' },
              { value: 'NET_45', label: 'Net 45' },
            ]}
          />
        </Group>
        <Group grow align="center" mt="lg">
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
          <TextInput
            label="Recruitment Commission"
            type={'text'}
            placeholder="Recruitment Commission"
            {...form.getInputProps('recruitment_commission')}
          />
        </Group>
        <Group grow align="center" mt="lg">
          <TextInput
            label="Additional Commission"
            type={'text'}
            placeholder="Additional Commission"
            {...form.getInputProps('additional_commission')}
          />
          <TextInput
            label="Additional Information"
            type={'text'}
            placeholder="Additional Information"
            {...form.getInputProps('additional_information')}
          />
        </Group>
      </div>
    </>
  )
}
