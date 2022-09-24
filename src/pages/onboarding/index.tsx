import { Button, Group, createStyles, Stepper, Tabs } from '@mantine/core'
import { useState } from 'react'
const useStyles = createStyles((theme) => ({
  onboarding: {
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '10px',
    gap: '20px',
    width: '100%',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },
  tabs: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.35)',
    flex: 1,
    height: '88vh',
  },
  stepper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.35)',
    width: '70%',
    padding: 20,
    borderRadius: 'sm',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
}))

export default function Onboarding() {
  const [active, setActive] = useState(0)

  const { classes } = useStyles()

  // next btn
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current))
  // prev btn
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <div className={classes.onboarding}>
      {/* Onboarding details tabs */}

      {/* <Paper p={20} className={classes.tabs}> */}
      <Tabs
        // variant="outline"
        p={20}
        radius="sm"
        defaultValue="Client"
        className={classes.tabs}
      >
        <Tabs.List position="apart">
          <Tabs.Tab
            value="Client"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-circle-letter-c"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#3063A6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M14 10a2 2 0 1 0 -4 0v4a2 2 0 1 0 4 0"></path>
              </svg>
            }
          >
            Client
          </Tabs.Tab>
          <Tabs.Tab
            value="Employee"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-circle-letter-e"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#3063A6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M14 8h-4v8h4"></path>
                <path d="M10 12h2.5"></path>
              </svg>
            }
          >
            Employee
          </Tabs.Tab>
          <Tabs.Tab
            value="Vendor"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-circle-letter-v"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#3063A6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M10 8l2 8l2 -8"></path>
              </svg>
            }
          >
            Vendor
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Client" pt="xs">
          Client details form goes here...
        </Tabs.Panel>

        <Tabs.Panel value="Employee" pt="xs">
          Employee details form goes here...
        </Tabs.Panel>

        <Tabs.Panel value="Vendor" pt="xs">
          Vendor details form goes here...
        </Tabs.Panel>
      </Tabs>
      {/* </Paper> */}
      {/* Onboarding flow stepper */}
      <div className={classes.stepper}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Profile" description="Hr & Other Info...">
            Step 1 content: Profile...
          </Stepper.Step>
          <Stepper.Step label="Account" description="Client & Others Info...">
            Step 2 content: Account...
          </Stepper.Step>
          <Stepper.Step label="Immigration" description="Others Info...">
            Step 3 content: Immigration...
          </Stepper.Step>
          <Stepper.Step label="Documents" description="Others Info...">
            Step 4 content: Documents...
          </Stepper.Step>
          <Stepper.Step label="Summary" description="Others Info...">
            Step 5 content: Summary...
          </Stepper.Step>
          <Stepper.Completed>Completed, Others messages...</Stepper.Completed>
        </Stepper>

        <Group position="center" mt="65vh">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button variant="light">Save</Button>
          <Button onClick={nextStep}>Next</Button>
        </Group>
      </div>
    </div>
  )
}
