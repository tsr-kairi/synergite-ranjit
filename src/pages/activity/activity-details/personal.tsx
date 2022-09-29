import { Text, createStyles, Group, Loader, Avatar } from '@mantine/core'
import { IconArrowBackUp, IconListDetails } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetDefaultActivityById from '../hooks/useGetDefaultActivityById'

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
  activityInnerProfile: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px',
  },
  personalDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '5px',
    borderRadius: '5px',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.20)',
    border: `1px solid ${theme.colors.blue[0]}`,
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
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))

export default function Personal() {
  const { activityId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetDefaultActivityById(
    Number(activityId)
  )

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return (
    <div className={classes.activityInnerProfile}>
      {/* back to Client table list */}
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Back to Activity List
        </Text>
        <Link to={`/activity`} className={classes.userLink}>
          <Text align="right">
            <IconArrowBackUp
              size={24}
              color="blue"
              className={classes.detailsIcon}
            />
          </Text>
        </Link>
      </Group>
      <div className={classes.ClientUserCard}>
        <div className={classes.UserCardInner}>
          <Avatar size={80} radius={120} mx="auto" color="cyan">
            A
          </Avatar>
          <Text align="center" color="blue" size="xl" weight={700} mt="md">
            {data?.data[0]?.immigration_status}
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {data?.data[0]?.employee_type}
          </Text>
        </div>
      </div>
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Activity Details
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
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Immigration Status :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data[0]?.immigration_status}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Type of Employee :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.employee_type}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>New Client :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data[0]?.new_client}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>New Subvendor :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data[0]?.new_subvendor}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Default Activity :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data[0]?.default_activity}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Department :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data[0]?.department_uuid}
          </Text>
        </Group>
      </div>
    </div>
  )
}
