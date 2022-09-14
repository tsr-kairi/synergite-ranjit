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

  const { data, isError, error, isLoading } = useGetJobById(String(jobId))

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
  console.log('job', data?.data[0])

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
            {data?.data[0]?.title}
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {data?.data[0]?.city},{data?.data[0]?.state},
            {data?.data[0]?.country}
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
            <b>Job Title :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.title}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>City :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.city}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>State :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.state}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Country :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.country}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Primary Skills :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.primary_skills}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Secondary Skills :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.secondary_skills}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Visa Status :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.visa_status}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Start Date :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.start_date}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Pay Rate :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.pay_rate}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Status :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.job_status}
          </Text>
        </Group>
      </div>
    </div>
  )
}
