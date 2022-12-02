import {
  Text,
  createStyles,
  Group,
  Loader,
  Avatar,
  ActionIcon,
} from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetRolesById from '../hooks/useGetRolesById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
  },
  clientUserCard: {
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
    // border: `1px solid ${theme.colors.blue[1]}`,
    // padding: '10px',
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
  const { rolesId } = useParams()
  const { classes } = useStyles()
  // console.log('Personal', rolesId)

  const { data, isError, error, isLoading } = useGetRolesById(String(rolesId))

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
      <div className={classes.personalDetailsMain}>
        <div className={classes.personalDetailsInner}>
          <Link to={`/roles`} className={classes.userLink}>
            <ActionIcon variant="light" radius="xl" color={'blue'}>
              <IconArrowBackUp />
            </ActionIcon>
          </Link>

          <div className={classes.clientUserCard}>
            <Avatar size={40} radius={120} mx="auto" color="cyan">
              R
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
              {data?.data?.name ? data?.data?.name : 'N/A'}
            </Text>
          </div>
          <div className={classes.personalDetails}>
            <Group spacing="md">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Role Name :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data?.name}
              </Text>
            </Group>
            <Group spacing="md">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Department :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.department?.name}
              </Text>
            </Group>
            <Group spacing="md">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
            <Group spacing="md">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
            <Group spacing="md">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
            <Group spacing="md">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
          </div>
        </div>
      </div>
    </div>
  )
}
