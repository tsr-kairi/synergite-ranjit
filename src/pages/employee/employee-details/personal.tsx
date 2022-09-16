import { Text, createStyles, Group, Loader } from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetEmployeeById from '../hooks/useGetEmployeeById'

const useStyles = createStyles((theme) => ({
  employeeUserCard: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.blue[1]}`,
    borderRadius: '5px',
  },
  UserCardInner: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  employeeInnerProfile: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px',
  },
  personalDetails: {
    display: 'flex',
    // flexDirection: 'column',
    padding: '20px',
    gap: '50px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },

  leftDT: {
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
  const { employeeId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetEmployeeById(
    String(employeeId)
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
    <div className={classes.employeeInnerProfile}>
      {/* back to Employ table list */}
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Back to Employee List
        </Text>
        <Link to={`/employee`} className={classes.userLink}>
          <Text align="right">
            <IconArrowBackUp
              size={24}
              color="blue"
              className={classes.detailsIcon}
            />
          </Text>
        </Link>
      </Group>
      <div className={classes.employeeUserCard}>
        <div className={classes.UserCardInner}>
          {/* <Avatar
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src={`https://gokv9osl.directus.app/assets/${data?.data.profile_image}/${data?.data.first_name}.png?access_token=Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE`}
            size={120}
            radius={120}
            mx="auto"
          /> */}
          <Text align="center" color="blue" size="xl" weight={700} mt="md">
            {data?.data[0]?.fname} {data?.data[0]?.lname}
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {data?.data[0]?.id}
          </Text>
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
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
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
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Name :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.fname} {data?.data[0]?.lname}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Email :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.email}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Phone :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.phone}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Ssn :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.ssn_no}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Date of Birth :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.dob}
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              <b>Gender :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400} transform="capitalize">
              {data?.data[0]?.gender}
            </Text>
          </Group>
          {/* <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400}>
              <b>Ethnic Origin :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400}>
              {data?.data[0]?.ethnic_origin}
            </Text>
          </Group> */}
          {/* 2nd phase */}
          <Text
            size="md"
            color="blue"
            mt={'5px'}
            weight={600}
            className={classes.detailBottom}
          >
            Address Details
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
