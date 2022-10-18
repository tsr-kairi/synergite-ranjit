import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  Group,
  createStyles,
  Select,
  FileInput,
  ActionIcon,
  Text,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconPlus, IconTrash, IconUpload } from '@tabler/icons'
import { randomId } from '@mantine/hooks'

const useStyles = createStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
}))

type onboardingStepperProps = {
  form: UseFormReturnType<TOnboarding>
}

export default function Documents({ form }: onboardingStepperProps) {
  const { classes } = useStyles()
  console.log('docValue', form.values)

  return (
    <>
      <div className={classes.paper}>
        {form.values.documents?.length > 0 ? (
          <></>
        ) : (
          <Text color="dimmed" align="center">
            No document here...
          </Text>
        )}
        {form.values.documents ? (
          form.values.documents?.map((item, index) => (
            <Group key={item.key} align="center" grow>
              <Select
                label="Document Type"
                placeholder="Document Type"
                {...form.getInputProps(item.key + index.toString())}
                data={[
                  { value: 'regular', label: 'Regular' },
                  { value: 'premium', label: 'Premium' },
                ]}
              />
              <FileInput
                label="Choose File"
                type={'file'}
                accept="image/*"
                placeholder="Choose File"
                icon={<IconUpload size={14} />}
                {...form.getInputProps(item.key)}
              />

              <div
                style={{
                  position: 'absolute',
                  right: '46px',
                }}
              >
                <ActionIcon
                  color="red"
                  mt={'xl'}
                  onClick={() => form.removeListItem('documents', index)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </div>
            </Group>
          ))
        ) : (
          <div></div>
        )}
        <ActionIcon
          style={{
            position: 'absolute',
            right: '46px',
          }}
          color="blue"
          onClick={() =>
            form.insertListItem('documents', {
              document_type: '',
              choose_file: '',
              key: randomId(),
            })
          }
        >
          <IconPlus size={16} />
        </ActionIcon>
      </div>
    </>
  )
}
