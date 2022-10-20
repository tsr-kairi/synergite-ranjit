import { ActionIcon, Button, createStyles, Drawer, Group, Tooltip } from '@mantine/core'
import {
  IconArrowAutofitDown,
  IconArrowBackUp,
  IconBriefcase,
} from '@tabler/icons'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Personal from './personal'
import Submission from './submission'

const useStyles = createStyles((theme) => ({
  submissionDetails: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '100%',
  },
  submissionInner: {
    width: '100%',
    // boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    borderRadius: '10px',
    padding: '10px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  submission: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  detailHead: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))

export const SubmissionMain = () => {
  const [opened, setOpened] = useState(false)

  const [searchParams] = useSearchParams()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get('client_id')

  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.submissionDetails}>
        <div className={classes.submissionInner}>
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
            <Tooltip
              label="Click to view Job Details"
              color="blue"
              withArrow
              transition="slide-right"
              transitionDuration={500}
              onClick={() => setOpened(true)}
            >
              {/* <Button
                className={classes.detailHead}
                // rightIcon={<IconBriefcase />}
                // variant="subtle"
              > */}
              <ActionIcon variant="light" radius="xl" color={'blue'}>
                <IconBriefcase size={20} />
              </ActionIcon>
              {/* </Button> */}
            </Tooltip>
          </Group>
        </div>
      </div>
      <div className={classes.submissionDetails}>
        <div className={classes.submission}>
          <Submission
            client_id={searchParams.get('client_id') || ''}
            job_id={searchParams.get('job_id') || ''}
          />
        </div>
      </div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Job Details"
        padding="xl"
        size="1200px"
        position="right"
      >
        <Personal />
      </Drawer>
    </div>
  )
}

export default SubmissionMain
