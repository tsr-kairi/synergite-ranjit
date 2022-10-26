import { TVendor } from '@/types'
import {
  Avatar,
  Text,
  createStyles,
  Group,
  Loader,
  Button,
  Drawer,
} from '@mantine/core'
import { IconArrowBackUp, IconEye } from '@tabler/icons'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useGetVendorById from '../hooks/useGetVendorById'
import VendorDetails from './details/viewMoreDetails'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
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
  const { classes } = useStyles()
  const [vendorDetailsOpened, setVendorDetailsIsOpened] = useState(false)
  const { vendorId } = useParams()

  const { data, isError, error, isLoading } = useGetVendorById(String(vendorId))

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
      <div className={classes.main}>
        <div>
          <Group position="apart">
            <Link to={`/vendor`} className={classes.userLink}>
              <Button
                className={classes.detailHead}
                rightIcon={<IconArrowBackUp />}
                variant="subtle"
              >
                Back to Vendor List
              </Button>
            </Link>
          </Group>
        </div>
        <div className={classes.personalDetailsMain}>
          <div className={classes.personalDetailsInner}>
            <div className={classes.clientUserCard}>
              <Avatar size={40} radius={120} mx="auto" color="cyan">
                V
              </Avatar>
              <Text align="center" color="blue" size="xl" weight={700} mt="sm">
                {data?.data?.first_name} {data?.data?.last_name}
              </Text>
            </div>
            {/* <Text size="lg" color="blue" weight={600} mb="xs">
              Client Details
            </Text> */}

            <div className={classes.personalDetails}>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Name :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.first_name} {data?.data?.last_name}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Email :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.primary_email}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Phone :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.primary_phone}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>City :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.city}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>State :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.state}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Country :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.country}
                </Text>
              </Group>
            </div>
          </div>
          <Button
            className={classes.detailHead}
            leftIcon={<IconEye />}
            variant="subtle"
            onClick={() => {
              setVendorDetailsIsOpened(true)
            }}
          >
            View More
          </Button>
          {/* <ActionIcon
            variant="light"
            radius="xl"
            color={'blue'}
            onClick={() => {
              setVendorDetailsIsOpened(true)
            }}
          >
            View More <IconEye size={26} />
          </ActionIcon> */}
        </div>
        {/* client details */}
        <Drawer
          opened={vendorDetailsOpened}
          onClose={() => setVendorDetailsIsOpened(false)}
          transitionDuration={700}
          transitionTimingFunction="ease"
          title="Vendor Details"
          padding="xl"
          size="1200px"
          position="right"
        >
          {/* <Divider
            className={classes.dividerText}
            my="10px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  {clName}
                </Box>
              </>
            }
          /> */}
          <VendorDetails key={vendorId} {...((data?.data || {}) as TVendor)} />
        </Drawer>
      </div>
    </>
  )
}
