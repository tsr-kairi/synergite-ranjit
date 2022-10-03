import {
  Avatar,
  Text,
  createStyles,
  Group,
  Loader,
  Grid,
  Button,
} from '@mantine/core'
import {
  IconArrowBackUp,
  IconListDetails,
  IconPlus,
  IconView360,
} from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetClientById from '../hooks/useGetClientById'

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
    // display: 'flex',
    // flexDirection: 'column',
    // flexDirection: 'row',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.20)',
    border: `1px solid ${theme.colors.blue[0]}`,
    // width: '100%',
    // gap: '15px',
  },
  heading: {
    paddingLeft: '20px',
    paddingTop: '20px',
  },
  colalign: {
    paddingTop: '20px',
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
    width: '25%',
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
  const { clientId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetClientById(String(clientId))

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
    <>
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Back to Client List
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
      <div className={classes.clientInnerProfile}>
        <Grid>
          <Grid.Col span={4}>
            <Group grow className={classes.heading}>
              <Text size="lg" color="blue" weight={600}>
                Client Details
              </Text>
            </Group>
            <Avatar
              src={`https://cdn4.vectorstock.com/i/1000x1000/17/28/color-letter-c-logo-icon-design-vector-22731728.jpg`}
              size={120}
              radius={120}
              mx="auto"
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <div className={classes.colalign}>
              <Grid>
                <Grid.Col span={4}>
                  <Text size="lg" color="#686969" weight={400}>
                    <b>Client Name :</b>
                  </Text>
                  <Text size="lg" color="#686969" weight={400}>
                    {data?.data?.first_name} {data?.data?.last_name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="lg" color="#686969" weight={400}>
                    <b>Email :</b>
                  </Text>
                  <Text size="lg" color="#686969" weight={400}>
                    {data?.data?.primary_email}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="lg" color="#686969" weight={400}>
                    <b>Phone :</b>
                  </Text>
                  <Text size="lg" color="#686969" weight={400}>
                    {data?.data?.primary_phone}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="lg" color="#686969" weight={400}>
                    <b>City :</b>
                  </Text>
                  <Text size="lg" color="#686969" weight={400}>
                    {data?.data?.city}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="lg" color="#686969" weight={400}>
                    <b>State :</b>
                  </Text>
                  <Text size="lg" color="#686969" weight={400}>
                    {data?.data?.state}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="lg" color="#686969" weight={400}>
                    <b>Country :</b>
                  </Text>
                  <Text size="lg" color="#686969" weight={400}>
                    {data?.data?.country}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}></Grid.Col>
                <Grid.Col span={4}>
                  <Button>
                    <Group spacing="sm" align="center">
                      <IconView360 color="white" />
                      <Text weight={400}>View Contacts</Text>
                    </Group>
                  </Button>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button>
                    <Group spacing="sm" align="center">
                      <IconPlus color="white" />
                      <Text weight={400}>Add New Contact</Text>
                    </Group>
                  </Button>
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>
        </Grid>
        {/* back to Client table list */}
        {/* <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Back to Client List
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
      </Group> */}
        {/* <div className={classes.ClientUserCard}>
        <div className={classes.UserCardInner}>
          <Avatar
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src={`https://cdn4.vectorstock.com/i/1000x1000/17/28/color-letter-c-logo-icon-design-vector-22731728.jpg`}
            size={120}
            radius={120}
            mx="auto"
          />
          <Text align="center" color="blue" size="xl" weight={700} mt="md">
            {data?.data[0]?.first_name} {data?.data[0]?.last_name}
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {data?.data[0]?.primary_email}
          </Text>
        </div>
      </div>
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Client Details
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
            <b>Name :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.first_name} {data?.data[0]?.last_name}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Email :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.primary_email}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400}>
            <b>Phone :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data[0]?.primary_phone}
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
      </div> */}
      </div>
    </>
  )
}
