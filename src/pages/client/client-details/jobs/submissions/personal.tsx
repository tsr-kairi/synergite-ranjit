import { Avatar, Text, createStyles, Group, Loader } from '@mantine/core'
import { IconArrowBackUp, IconListDetails } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetJobById from '../../../hooks/useGetJobById'

const useStyles = createStyles((theme) => ({
  SubmissionUserCard: {
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
  submissionInnerProfile: {
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
  const { jobId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetJobById(Number(jobId))

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
  console.log(data)

  return (
    <div className={classes.submissionInnerProfile}>
      {/* back to Client table list */}
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Back to Client Details
        </Text>
        <Link to={`/client`} className={classes.userLink}>
          <Text align="right">
            <IconArrowBackUp
              size={24}
              color="blue"
              className={classes.detailsIcon}
            />
          </Text>
        </Link>
      </Group>
      <div className={classes.SubmissionUserCard}>
        <div className={classes.UserCardInner}>
          <Avatar size={120} radius={120} mx="auto" />
          <Text align="center" color="blue" size="xl" weight={700} mt="md">
            {data?.data?.job_name}
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {data?.data?.location}
          </Text>
        </div>
      </div>
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Job Details
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
            <b>Job Name :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data?.job_name}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Location :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data?.location}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Category :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data?.category}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Job Status :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data?.job_status}
          </Text>
        </Group>
      </div>
    </div>
  )
}
