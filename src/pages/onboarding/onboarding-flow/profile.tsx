import { TProfile } from '@/types/onboarding-flow-type'
import {
  TextInput,
  Group,
  createStyles,
  Divider,
  Box,
  Select,
  Autocomplete,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconChevronsRight } from '@tabler/icons'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
  },
  hrInfo: {
    color: theme.colors.blue[9],
  },
}))

export default function Profile(clientDetailsData: TProfile) {
  const { classes } = useStyles()
  //   const { mutate: clientDetails } = useEditClient()

  const form = useForm<TProfile>({
    // validate: zodResolver(zClientEdit),
    initialValues: clientDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  //   const handleSubmit = (values: TProfile) => {
  //     const clientDetailsData = {
  //       ...values,
  //     }

  //     clientDetails(clientDetailsData)

  //     showNotification({
  //       title: 'Success!!',
  //       message: 'Client Details Fetched Successfully.',
  //     })
  //   }

  return (
    <>
      <div className={classes.paper}>
        <form>
          {/* Hr Information */}
          <Divider
            className={classes.hrInfo}
            my="20px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  Hr Information
                </Box>
              </>
            }
          />
          <Group grow align="center" mt="md">
            <TextInput
              label="Start Date"
              type={'date'}
              placeholder="Start Date"
              {...form.getInputProps('start_date')}
            />
            <TextInput
              label="End Date"
              type={'date'}
              placeholder="End Date"
              {...form.getInputProps('end_date')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Autocomplete
              label="Work State"
              placeholder="Work State"
              limit={60}
              maxDropdownHeight={200}
              nothingFound="No states found"
              {...form.getInputProps('work_state')}
              data={[
                'Alabama',
                'Alaska',
                'Arizona',
                'Arkansas',
                'California',
                'Colorado',
                'Connecticut',
                'Delaware',
                'Florida',
                'Georgia',
                'Hawaii',
                'Idaho',
                'Illinois',
                'Indiana',
                'Iowa',
                'Kansas',
                'Kentucky',
                'Louisiana',
                'Maine',
                'Maryland',
                'Massachusetts',
                'Michigan',
                'Minnesota',
                'Mississippi',
                'Missouri',
                'Montana',
                'Nebraska',
                'Nevada',
                'New Hampshire',
                'New Jersey',
                'New Mexico',
                'New York',
                'North Carolina',
                'North Dakota',
                'Ohio',
                'Oklahoma',
                'Oregon',
                'Pennsylvania',
                'Rhode Island',
                'South Carolina',
                'South Dakota',
                'Tennessee',
                'Texas',
                'Utah',
                'Vermont',
                'Virginia',
                'Washington',
                'West Virginia',
                'Wisconsin',
                'Wyoming',
              ]}
            />
            <Autocomplete
              label="Client Location"
              placeholder="Client Location"
              {...form.getInputProps('client_location')}
              limit={30}
              maxDropdownHeight={200}
              nothingFound="No location found"
              data={[
                'AT&T/IBM',
                'Commonwealth of MASS',
                'Crowley Maritime',
                'Cuna Insurance',
                'DC Water & Sewer Authority',
                'Envision Physician Services',
                'Florida Blue',
                'Fresno County SSD',
                'Grayson',
                'Horizon BCBS',
                'Jacksonville',
                'Kehe',
                'Miami',
                'Owens & Minor',
                'Raymond James',
                'SCE',
                'State of MN',
                'Stratascale Solutions Inc',
                'Synergy Technologies',
                'UHG',
                'USFDA',
                'WFH',
              ]}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              label="Experience"
              type={'text'}
              placeholder="Experience"
              {...form.getInputProps('experience')}
            />
            <Autocomplete
              label="Department"
              placeholder="Department"
              limit={10}
              maxDropdownHeight={200}
              nothingFound="No location found"
              {...form.getInputProps('department')}
              data={[
                'Contracts',
                'HR ',
                'Immigration',
                'Recruitment',
                'Operations',
                'Marketing',
                'Account',
              ]}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Autocomplete
              label="Reporting to"
              placeholder="Reporting to"
              {...form.getInputProps('reporting_to')}
              data={['A', 'B', 'C', 'D']}
            />
            <TextInput
              label="Designation"
              type={'text'}
              placeholder="Designation"
              {...form.getInputProps('designation')}
            />
          </Group>
          {/* Other Information */}
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
              label="Overtime Exemption"
              placeholder="Overtime Exemption"
              {...form.getInputProps('overtime_exemption')}
              data={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
            />
            <TextInput
              label="Remarks"
              type={'text'}
              placeholder="Remarks"
              {...form.getInputProps('remarks')}
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
