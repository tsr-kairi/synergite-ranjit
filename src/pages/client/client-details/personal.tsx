import EditForm from '@/components/form/client/editForm'
import { TClient } from '@/types'
import {
  Avatar,
  Text,
  createStyles,
  Group,
  Loader,
  Drawer,
  ActionIcon,
  Tooltip,
} from '@mantine/core'
import { IconAddressBook, IconArrowBackUp, IconEye } from '@tabler/icons'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useGetClientById from '../hooks/useGetClientById'
import Contacts from './contacts'
import ClientDetails from './details/viewMoreDetails'

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
  const [opened, setOpened] = useState(false)
  const [clientDetailsOpened, setClientDetailsIsOpened] = useState(false)
  // const [clientEditData, setClientEditData] = useState({} as TClient)
  const { clientId } = useParams()
  // console.log('cliId', clientId)
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
      <div className={classes.main}>
        <div className={classes.personalDetailsMain}>
          <div className={classes.personalDetailsInner}>
            <Link to={`/client`} className={classes.userLink}>
              <ActionIcon variant="light" radius="xl" color={'blue'}>
                <IconArrowBackUp />
              </ActionIcon>
            </Link>

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
                {data?.data?.first_name ? data?.data?.first_name : 'N/A'}{' '}
                {data?.data?.last_name ? data?.data?.last_name : 'N/A'}
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
                  {data?.data?.first_name ? data?.data?.first_name : 'N/A'}{' '}
                  {data?.data?.last_name ? data?.data?.last_name : 'N/A'}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Email :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.primary_email
                    ? data?.data?.primary_email
                    : 'N/A'}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Phone :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.primary_phone
                    ? data?.data?.primary_phone
                    : 'N/A'}
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
                  <b>State :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.state ? data?.data?.state : 'N/A'}
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
            </div>
          </div>
          <Group>
            <Tooltip
              label="Click to view Contacts"
              color="blue"
              withArrow
              transition="slide-right"
              transitionDuration={500}
              onClick={() => setOpened(true)}
            >
              <ActionIcon variant="light" radius="xl" color={'blue'}>
                <IconAddressBook size={26} />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Click to view more"
              color="blue"
              withArrow
              transition="slide-right"
              transitionDuration={500}
              onClick={() => {
                setClientDetailsIsOpened(true)
                // setClientEditData({ ...((data?.data || {}) as TClient) })
              }}
            >
              <ActionIcon variant="light" radius="xl" color={'blue'}>
                <IconEye size={26} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </div>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="md"
          size="600px"
          position="right"
        >
          <Contacts client_id={String(clientId)} />
        </Drawer>

        {/* client details */}
        <Drawer
          opened={clientDetailsOpened}
          onClose={() => setClientDetailsIsOpened(false)}
          transitionDuration={700}
          transitionTimingFunction="ease"
          title="Client Details"
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
          <ClientDetails key={clientId} {...((data?.data || {}) as TClient)} />
        </Drawer>
      </div>
    </>
  )
}
