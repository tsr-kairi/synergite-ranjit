import { Avatar, Text, createStyles, Group, ActionIcon } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
  },
  timesheetUserCard: {
    border: `1px solid ${theme.colors.blue[1]}`,
    borderRadius: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '13px',
    paddingBottom: '13px',
  },
  personalDetails: {
    display: 'flex',
    padding: '10px',
    gap: '40px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },
  personalDetailsInner: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    gap: '10px',
  },
  personalDetailsMain: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    gap: '10px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },
}))

const TimesheetOverviewTile: React.FC<{ onBackClick?: () => void }> = ({
  onBackClick,
}) => {
  const { classes } = useStyles()

  const week = '10/17 - 10/24'

  return (
    <>
      <div className={classes.main}>
        <div className={classes.personalDetailsMain}>
          <div className={classes.personalDetailsInner}>
            <ActionIcon
              variant="light"
              radius="xl"
              color={'blue'}
              onClick={onBackClick}
            >
              <IconArrowBackUp />
            </ActionIcon>
            <div className={classes.timesheetUserCard}>
              <Avatar size={40} radius={120} mx="auto" color="cyan">
                T
              </Avatar>
              <Text
                align="center"
                color="blue"
                size="xl"
                weight={700}
                mt="sm"
                style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: '150px',
                }}
              >
                Vishal Singh
              </Text>
            </div>

            <div className={classes.personalDetails}>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Name </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  Vishal
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Week </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {week}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Billable </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  10
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Non Billable </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  4
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Total Hours </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  14
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Status </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  Active
                </Text>
              </Group>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} // End of TimesheetOverviewTile

export default TimesheetOverviewTile
