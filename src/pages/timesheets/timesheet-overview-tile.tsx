import {
  Avatar,
  Text,
  createStyles,
  Group,
  Loader,
  Button,
  Drawer,
} from '@mantine/core'
import { IconArrowBackUp, IconView360 } from '@tabler/icons'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useGetClientById from '../client/hooks/useGetClientById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '16px',
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
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
  },
  personalDetailsMain: {
    display: 'flex',
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

const TimesheetOverviewTile: React.FC<{ onBackClick?: () => void }> = ({
  onBackClick,
}) => {
  const { classes } = useStyles()

  const week = '10/17 - 10/24'

  return (
    <>
      <div className={classes.main}>
        <div>
          <Button
            className={classes.detailHead}
            rightIcon={<IconArrowBackUp />}
            onClick={onBackClick}
            variant="subtle"
          >
            Back to Timesheet List
          </Button>
        </div>

        <div className={classes.personalDetailsMain}>
          <div className={classes.clientUserCard}>
            <Avatar size={40} radius={120} mx="auto" color="cyan">
              T
            </Avatar>
            <Text align="center" color="blue" size="xl" weight={700} mt="sm">
              Vishal
            </Text>
          </div>

          <div className={classes.personalDetailsInner}>
            <Text size="lg" color="blue" weight={600} mb="xs">
              Timesheet Details
            </Text>

            <div className={classes.personalDetails}>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Name </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  Vishal
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Week </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {week}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Billable </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  10
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Non Billable </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  4
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Total Hours </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  14
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Status </b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  Active
                </Text>
              </Group>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} // End of TimesheetOverviewTile

export default TimesheetOverviewTile
