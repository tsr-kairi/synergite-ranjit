import { TClient, TJobs } from '@/types'
import { useState } from 'react'
import {
  createStyles,
  Group,
  Loader,
  Button,
  Avatar,
  Text,
  Drawer,
  ActionIcon,
} from '@mantine/core'
import { IconArrowBackUp, IconEye } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetJobById from '../../../hooks/useGetJobById'
import JobDetails from './details/viewMoreDetails'
import useGetClientById from '@/pages/client/hooks/useGetClientById'

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
  const [jobDetailsOpened, setJobDetailsIsOpened] = useState(false)
  const { jobId } = useParams()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get('client_id')

  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetJobById(String(jobId))
  const { data: clientData } = useGetClientById(String(clientId))

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
            <Link
              to={`/client-details/${String(clientId)}`}
              className={classes.userLink}
            >
              <Button
                className={classes.detailHead}
                rightIcon={<IconArrowBackUp />}
                variant="subtle"
              >
                Back to Client Details
              </Button>
            </Link>
          </Group>
        </div>
        <div className={classes.personalDetailsMain}>
          <div className={classes.personalDetailsInner}>
            <div className={classes.clientUserCard}>
              <Avatar size={40} radius={120} mx="auto" color="cyan">
                C
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
                {clientData?.data?.first_name} {clientData?.data?.last_name}
              </Text>
            </div>
            {/* <Text size="lg" color="blue" weight={600} mb="xs">
              Client Details
            </Text> */}

            <div className={classes.personalDetails}>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Job Title :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.job_title}
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
                  <b>Country :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.country}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Visa Status :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.visa_status}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Job Status :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.job_status}
                </Text>
              </Group>
            </div>
          </div>
          {/* <Button
            className={classes.detailHead}
            leftIcon={<IconEye />}
            variant="subtle"
            onClick={() => {
              setJobDetailsIsOpened(true)
            }}
          >
            View More
          </Button> */}
          <ActionIcon
            variant="light"
            radius="xl"
            color={'blue'}
            onClick={() => {
              setJobDetailsIsOpened(true)
            }}
          >
            <IconEye size={26} />
          </ActionIcon>
        </div>
        {/* client details */}
        <Drawer
          opened={jobDetailsOpened}
          onClose={() => setJobDetailsIsOpened(false)}
          transitionDuration={700}
          transitionTimingFunction="ease"
          title="Job Details"
          padding="xl"
          size="1200px"
          position="right"
        >
          <JobDetails key={clientId} {...((data?.data || {}) as TJobs)} />
        </Drawer>
      </div>
    </>
  )
}
