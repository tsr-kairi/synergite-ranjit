import useEditEmployee from '@/pages/employee/hooks/useEditEmployee'
import theme from '@/theme/theme'
import { TAEmployee } from '@/types/employee-type'
import {
  TextInput,
  Group,
  createStyles,
  Select,
  Divider,
  Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconChevronsRight } from '@tabler/icons'
const useStyles = createStyles(() => ({
  paper: {
    backgroundColor: 'transparent',
  },
  dividerText: {
    color: theme.colors?.blue?.[9],
  },
}))

export default function OnboardEmployeeDetails(
  employeeDetailsData: TAEmployee
) {
  const { classes } = useStyles()
  const { mutate: employeeDetails } = useEditEmployee()

  const form = useForm<TAEmployee>({
    initialValues: employeeDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TAEmployee) => {
    const employeeEditData = {
      ...values,
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    employeeDetails(employeeEditData)

    showNotification({
      title: 'Success!!',
      message: 'Employee Details Fetched Successfully..',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <Select
              readOnly={true}
              label="County"
              placeholder="County"
              data={[
                { label: 'H1', value: 'h1' },
                {
                  label: 'Green Card/Citizen',
                  value: 'Green Card/Citizen',
                },
                { label: 'Green Card/USC', value: 'Green Card/USC' },
                { label: 'NA', value: 'na' },
              ]}
              {...form.getInputProps('county')}
            />
            <Select
              readOnly={true}
              label="Country"
              placeholder="Country"
              data={[
                { label: 'H1', value: 'h1' },
                {
                  label: 'Green Card/Citizen',
                  value: 'Green Card/Citizen',
                },
                { label: 'Green Card/USC', value: 'Green Card/USC' },
                { label: 'NA', value: 'na' },
              ]}
              {...form.getInputProps('country')}
            />
            <TextInput
              readOnly={true}
              label="FAX"
              type={'text'}
              placeholder="FAX"
              {...form.getInputProps('fax')}
            />
            <TextInput
              readOnly={true}
              label="Company Phone"
              type={'text'}
              placeholder="Company Phone"
              {...form.getInputProps('company_phone')}
            />
            <TextInput
              readOnly={true}
              label="Company Email"
              type={'text'}
              placeholder="Company Email"
              {...form.getInputProps('company_email')}
            />
            <TextInput
              readOnly={true}
              label="Company Contact"
              type={'text'}
              placeholder="Company Contact"
              {...form.getInputProps('company_contact')}
            />
          </Group>
          <Divider
            className={classes.dividerText}
            my="20px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  Additional details
                </Box>
              </>
            }
          />
          <Group grow align="center" mt="md">
            <Select
              readOnly={true}
              label="Invoicing Frequency"
              placeholder="Invoicing Frequency"
              data={[
                { label: 'H1', value: 'h1' },
                {
                  label: 'Green Card/Citizen',
                  value: 'Green Card/Citizen',
                },
                { label: 'Green Card/USC', value: 'Green Card/USC' },
                { label: 'NA', value: 'na' },
              ]}
              {...form.getInputProps('invoicing_frequency')}
            />
            <TextInput
              readOnly={true}
              label="Format of Timesheet"
              type={'text'}
              placeholder="Format of Timesheet"
              {...form.getInputProps('format_of_timesheet')}
            />
            <TextInput
              readOnly={true}
              label="Invoice Format"
              type={'text'}
              placeholder="Invoice Format"
              {...form.getInputProps('invoice_format')}
            />
            <TextInput
              readOnly={true}
              label="Remark"
              type={'text'}
              placeholder="Remark"
              {...form.getInputProps('remark')}
            />
          </Group>
        </form>
      </div>
    </>
  )
}
