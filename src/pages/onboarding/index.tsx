import { useEffect } from 'react'
import { TClient, TVendor } from '@/types'
import { TAEmployee } from '@/types/employee-type'
import { TOnboarding } from '@/types/onboarding-flow-type'
import { Button, Group, createStyles, Stepper, Tabs } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import OnboardEmployeeDetails from './details/employee-details'
import OnboardClientDetails from './details/onboard-client-details'
import OnboardVendorDetails from './details/vendor-details'
// import useSaveOnboarding from './hooks/useSaveOnboarding'
import Account from './onboarding-flow/account'
import Documents from './onboarding-flow/document'
import Immigration from './onboarding-flow/immigration'
import Profile from './onboarding-flow/profile'

import { useLocation, useNavigate } from 'react-router-dom'
import { useOnboarding } from '@/store/onboarding.store'
import Review from './onboarding-flow/review'
import { createOnboarding } from '@/services/onboarding.services'

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
  stepperMain: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.35)',
    width: '70%',
    padding: 20,
    borderRadius: 'sm',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  stepper: {
    height: '65vh',
  },
}))

export default function Onboarding() {
  const { classes } = useStyles()
  // const { mutate: onboardingFlow } = useSaveOnboarding()
  // details states
  const [active, setActive] = useState(0)
  const [clientDetailsData, setClientDetailsData] = useState({} as TClient)
  const [employeeDetailsData, setEmployeeDetailsData] = useState(
    {} as TAEmployee
  )
  const [vendorDetailsData, setVendorDetailsData] = useState({} as TVendor)
  const [onboardingStepperData, setOnboardingStepperData] =
    useState<TOnboarding>({} as TOnboarding)

  const [isOnboardingInitiated, setIsOnboardingInitiated] =
    useState<boolean>(false)

  const { state } = useLocation()
  const navigate = useNavigate()
  console.log('state =', state)

  // const { client, vendor, job, employee, submission } = useOnboarding()
  const { client, vendor } = useOnboarding()
  // console.log({ client, vendor, job, employee, submission })

  useEffect(() => {
    console.log('client =', client)
    if (client) {
      setClientDetailsData(client)
    }
    if (vendor) {
      setVendorDetailsData(vendor)
    }
  }, [client])

  useEffect(() => {
    if (active === 4) {
      setOnboardingStepperData(form.values)
    }
  }, [active])

  // onboarding flow states

  const form = useForm<TOnboarding>({
    initialValues: onboardingStepperData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSave = (values: TOnboarding) => {
    const onboardingData = {
      ...clientDetailsData,
      ...employeeDetailsData,
      ...vendorDetailsData,
      ...values,
    }

    // void onboardingFlow(onboardingStepperData)
    // calling API

    setIsOnboardingInitiated(true)
    createOnboarding(onboardingData)
      .then(() => {
        showNotification({
          title: 'Success!!',
          message: 'Onboarding save called successfully.',
        })
        navigate('/onboarding-list')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsOnboardingInitiated(false))
  } // End of handleSave function

  // next btn
  const nextStep = () => {
    setActive((current) => (current < 5 ? current + 1 : current))
  }

  // prev btn
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current))
  }

  return (
    <div className={classes.onboarding}>
      {/* Onboarding details tabs */}
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
          <OnboardClientDetails
            key={clientDetailsData.id}
            {...clientDetailsData}
          />
        </Tabs.Panel>

        <Tabs.Panel value="Employee" pt="xs">
          <OnboardEmployeeDetails {...employeeDetailsData} />
        </Tabs.Panel>

        <Tabs.Panel value="Vendor" pt="xs">
          <OnboardVendorDetails
            key={vendorDetailsData.id}
            {...vendorDetailsData}
          />
        </Tabs.Panel>
      </Tabs>

      {/* Onboarding flow stepper */}
      <div className={classes.stepperMain}>
        <form onSubmit={form.onSubmit(handleSave)}>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            className={classes.stepper}
          >
            <Stepper.Step label="Profile" description="Profile Info...">
              <Profile form={form} />
            </Stepper.Step>
            <Stepper.Step label="Account" description="Account Info...">
              <Account form={form} />
            </Stepper.Step>
            <Stepper.Step label="Immigration" description="Immigration Info...">
              <Immigration form={form} />
            </Stepper.Step>
            <Stepper.Step label="Documents" description="Immigration Info...">
              <Documents form={form} />
            </Stepper.Step>
            <Stepper.Step label="Summary" description="Immigration Info...">
              <Review
                onboardingData={onboardingStepperData}
                onReviewTileClick={(id) => setActive(+id)}
              />
            </Stepper.Step>
            <Stepper.Completed>Completed, Others messages...</Stepper.Completed>
          </Stepper>

          <Group position="center" mt="5rem">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            {active === 4 && (
              <Button variant="light" type="submit">
                {isOnboardingInitiated ? 'Onboarding Initiated' : 'Save'}
              </Button>
            )}
            {active <= 3 && <Button onClick={nextStep}>Next</Button>}
          </Group>
        </form>
      </div>
    </div>
  )
}
