import { Avatar, Text, createStyles, Group, Box } from '@mantine/core'
import { IconArrowBackUp, IconListDetails } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  ClientUserCard: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.blue[0]}`,
    borderRadius: '5px',
  },
  UserCardInner: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  clientInnerProfile: {
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: '15px',
  },
  personalDetails: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '1px 1px 12px rgba(122, 211, 299, 0.40)',
    padding: '20px',
    gap: '5px',
    backgroundColor: theme.colors.blue[0],
    borderRadius: '5px',
  },
  detailHead: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.20)',
    border: `1px solid ${theme.colors.blue[0]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  detailsIcon: {
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
      cursor: 'pointer',
      padding: '2px',
      borderRadius: '2px',
    },
  },
}))

export default function Personal() {
  const { classes } = useStyles()
  return (
    <div className={classes.clientInnerProfile}>
      {/* back to Client table list */}
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Back to Client List
        </Text>
        <Text align="right">
          <IconArrowBackUp
            size={24}
            color="blue"
            className={classes.detailsIcon}
          />
        </Text>
      </Group>
      <div className={classes.ClientUserCard}>
        <div className={classes.UserCardInner}>
          <Avatar
            src="https://static.foxbusiness.com/foxbusiness.com/content/uploads/2022/04/thumbnail_elon-musk-twitter-.jpg"
            size={120}
            radius={120}
            mx="auto"
          />
          <Text align="center" color="blue" size="xl" weight={700} mt="md">
            Elon Musk
          </Text>
          <Text align="center" color="dimmed" size="sm">
            elon.musk@yahoo.com
          </Text>
        </div>
      </div>
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Personal Details
        </Text>
        <Text align="right">
          <IconListDetails
            size={24}
            color="blue"
            className={classes.detailsIcon}
          />
        </Text>
      </Group>
      <div className={classes.personalDetails}>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Name :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            Elon Musk
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Email :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            elon.musk@yahoo.com
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            City :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            Amsterdam
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            State :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            New York
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Country :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            USA
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Company :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            Spice X
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Contacts :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            Five
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Jobs :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            Nine
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Title :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            Soyinka
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Label :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            Joint
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Origin :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            America
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            Phone :
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            +1 6583 383 823
          </Text>
        </Group>
      </div>
    </div>
  )
}
