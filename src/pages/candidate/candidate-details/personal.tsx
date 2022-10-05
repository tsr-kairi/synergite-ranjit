import {
  Text,
  createStyles,
  Group,
  Loader,
  Avatar,
  Button,
} from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetCandidateById from '../hooks/useGetCandidateById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    gap: '20px',
  },
  leftSide: {
    // width: '20%',
  },
  candidateUserCard: {
    display: 'flex',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.blue[1]}`,
    borderRadius: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '10px',
  },
  UserCardInner: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  personalDetails: {
    display: 'flex',
    padding: '10px',
    gap: '50px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },

  leftDT: {
    // display: 'flex',
    // flexDirection: 'column',
    gap: '5px',
  },
  detailHead: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  detailBottom: {
    marginBottom: '5px',
    borderBottom: `1px solid transparent`,

    '&:hover': {
      borderBottom: `1px solid blue`,
    },
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
  const { candidateId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetCandidateById(
    String(candidateId)
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
    <div className={classes.main}>
      {/* back to Employ table list */}
      <div className={classes.leftSide}>
        <Link to={`/candidate`} className={classes.userLink}>
          <Button
            className={classes.detailHead}
            rightIcon={<IconArrowBackUp />}
            variant="subtle"
          >
            Back to Candidate List
          </Button>
        </Link>
        <div className={classes.candidateUserCard}>
          <div className={classes.UserCardInner}>
            <Avatar size={80} radius={120} mx="auto" color="cyan">
              C
            </Avatar>
            <Text align="center" color="blue" size="xl" weight={700} mt="md">
              {data?.data[0]?.fname} {data?.data[0]?.lname}
            </Text>
            <Text align="center" color="dimmed" size="sm">
              {data?.data[0]?.id}
            </Text>
          </div>
        </div>
      </div>
      <div className={classes.personalDetails}>
        <div className={classes.leftDT}>
          <Text
            size="md"
            color="blue"
            weight={600}
            className={classes.detailBottom}
          >
            Personal Information
          </Text>
          <div className={classes.leftDT}>
            <Group spacing="xl">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Employee Id :</b>
              </Text>
              <Text
                align="center"
                color="dimmed"
                size="sm"
                transform="capitalize"
              >
                {data?.data[0]?.id}
              </Text>
            </Group>
            <Group spacing="xl">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Name :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data[0]?.fname} {data?.data[0]?.lname}
              </Text>
            </Group>
            <Group spacing="xl">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Email :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data[0]?.email}
              </Text>
            </Group>
            <Group spacing="xl">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Phone :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data[0]?.phone}
              </Text>
            </Group>
            <Group spacing="xl">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Ssn :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data[0]?.ssn_no}
              </Text>
            </Group>
            <Group spacing="xl">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Date of Birth :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data[0]?.dob}
              </Text>
            </Group>
            <Group spacing="xl">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Gender :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data[0]?.gender}
              </Text>
            </Group>
          </div>
        </div>
        <div className={classes.leftDT}>
          <Text
            size="md"
            color="blue"
            weight={600}
            className={classes.detailBottom}
          >
            Address Information
          </Text>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Address Line 1 :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.address1}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Address line 2 :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.address2}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>City :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.city}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>State :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.state}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>County :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.county}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Country :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.country}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Zip Code :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.zip}
            </Text>
          </Group>
        </div>
      </div>
    </div>
  )
}
