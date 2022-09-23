import { TDocuments } from '@/types/onboarding-flow-type'
import {
  Group,
  createStyles,
  Divider,
  Box,
  Select,
  FileInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconChevronsRight, IconUpload } from '@tabler/icons'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
  },
  hrInfo: {
    color: theme.colors.blue[9],
  },
}))

export default function Documents(clientDetailsData: TDocuments) {
  const { classes } = useStyles()
  //   const { mutate: clientDetails } = useEditClient()

  const form = useForm<TDocuments>({
    // validate: zodResolver(zClientEdit),
    initialValues: clientDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  //   const handleSubmit = (values: TDocuments) => {
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
        </form>
      </div>
    </>
  )
}
