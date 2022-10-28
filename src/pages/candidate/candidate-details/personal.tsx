import {
  Text,
  createStyles,
  Group,
  Loader,
  Avatar,
  Button,
  Drawer,
  ActionIcon,
  Tooltip,
} from '@mantine/core'
import { IconArrowBackUp, IconEye } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetCandidateById from '../hooks/useGetCandidateById'
import { useState } from 'react'
import { TCandidate } from '@/types/candidate-type'
import CandidateDetails from './details/viewMoreDetails'

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
  const [candidateDetailsOpened, setCandidateDetailsIsOpened] = useState(false)

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
    <>
      <div className={classes.main}>
        <div>
          <Group position="apart">
            <Link to={`/candidate`} className={classes.userLink}>
              <Button
                className={classes.detailHead}
                rightIcon={<IconArrowBackUp />}
                variant="subtle"
              >
                Back to Candidate List
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
                {data?.data?.fname} {data?.data?.lname}
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
                  {data?.data?.fname} {data?.data?.lname}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Email :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.email}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Phone :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.phone}
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
            </div>
          </div>
          {/* <Button
            className={classes.detailHead}
            leftIcon={<IconEye />}
            variant="subtle"
            onClick={() => {
              setCandidateDetailsIsOpened(true)
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
              setCandidateDetailsIsOpened(true)
            }}
          >
            <ActionIcon variant="light" radius="xl" color={'blue'}>
              <IconEye size={26} />
            </ActionIcon>
          </Tooltip>
        </div>
        {/* client details */}
        <Drawer
          opened={candidateDetailsOpened}
          onClose={() => setCandidateDetailsIsOpened(false)}
          transitionDuration={700}
          transitionTimingFunction="ease"
          title="Candidate Details"
          padding="xl"
          size="1200px"
          position="right"
        >
          <CandidateDetails
            key={candidateId}
            {...((data?.data || {}) as TCandidate)}
          />
        </Drawer>
      </div>
    </>
  )
}
