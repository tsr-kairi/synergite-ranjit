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
  Tooltip,
} from '@mantine/core'
import { IconArrowBackUp, IconEye } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetClientById from '@/pages/client/hooks/useGetClientById'
import useGetJobById from '../hooks/useGetJobById'
import JobDetails from './details/viewMoreDetails'

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
        <div className={classes.personalDetailsMain}>
          <div className={classes.personalDetailsInner}>
            <Link to={`/job`} className={classes.userLink}>
              <ActionIcon variant="light" radius="xl" color={'blue'}>
                <IconArrowBackUp />
              </ActionIcon>
            </Link>
            <div className={classes.clientUserCard}>
              <Avatar size={40} radius={120} mx="auto" color="cyan">
                J
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
                {/* {clientData?.data?.first_name
                  ? clientData?.data?.first_name
                  : 'N/A'}{' '}
                {clientData?.data?.last_name
                  ? clientData?.data?.last_name
                  : 'N/A'} */}
                {data?.data?.job_title ? data?.data?.job_title : 'N/A'}
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
                  {data?.data?.job_title ? data?.data?.job_title : 'N/A'}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>City :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.city ? data?.data?.city : 'N/A'}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Country :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.country ? data?.data?.country : 'N/A'}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Status :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.status ? data?.data?.status : 'N/A'}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Immigration Status :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.immigration_status
                    ? data?.data?.immigration_status
                    : 'N/A'}
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
          <Tooltip
            label="Click to view more"
            color="blue"
            withArrow
            transition="slide-right"
            transitionDuration={500}
            onClick={() => {
              setJobDetailsIsOpened(true)
            }}
          >
            <ActionIcon variant="light" radius="xl" color={'blue'}>
              <IconEye size={26} />
            </ActionIcon>
          </Tooltip>
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
