import { useEffect } from 'react'
import { TClient, TVendor } from '@/types'
import { TAEmployee } from '@/types/employee-type'
import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  Button,
  Group,
  createStyles,
  Stepper,
  Tabs,
  TextInput,
  Accordion,
  Select,
  Text,
  Divider,
  Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import OnboardEmployeeDetails from './details/employee-details'
import OnboardClientDetails from './details/onboard-client-details'
import OnboardVendorDetails from './details/vendor-details'
// import useSaveOnboarding from './hooks/useSaveOnboarding'
import Account from './onboarding-flow/payment'
import Documents from './onboarding-flow/document'
import Immigration from './onboarding-flow/immigration'
import Profile from './onboarding-flow/job'

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useOnboarding } from '@/store/onboarding.store'
import Review from './onboarding-flow/review'
import {
  createOnboarding,
  getOnboardingByUUID,
} from '@/services/onboarding.services'
import { useQuery } from 'react-query'
import { getEmployeeByUUID } from '@/services/employee.services'
import { IconChevronsRight } from '@tabler/icons'
import useGetClientById from '../client/hooks/useGetClientById'
import useGetVendorById from '../vendor/hooks/useGetVendorById'
import useGetEmployeeById from '../employee/hooks/useGetEmployeeById'

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
    display: 'none',
  },
  stepperMain: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.35)',
    width: '100%',
    padding: 20,
    borderRadius: 'sm',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  stepper: {
    height: '65vh',
  },
  dividerText: {
    color: theme.colors.blue[9],
  },
}))

export default function Onboarding() {
  const { classes } = useStyles()

  // details states
  const [active, setActive] = useState(0)
  const [clientDetailsData, setClientDetailsData] = useState({} as TClient)
  const [vendorDetailsData, setVendorDetailsData] = useState({} as TVendor)

  const draft_onboarding_uuid =
    localStorage.getItem('draft_onboarding_uuid') || ''
  const { data: onboardingData } = useQuery(
    `/onboarding/${draft_onboarding_uuid}`,
    () =>
      draft_onboarding_uuid ? getOnboardingByUUID(draft_onboarding_uuid) : null
  )

  const [onboardingStepperData, setOnboardingStepperData] =
    useState<TOnboarding>({} as TOnboarding)

  const [isOnboardingInitiated, setIsOnboardingInitiated] =
    useState<boolean>(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const clientId = searchParams.get('client_id')
  const vendorId = searchParams.get('vendor_id')
  const employeeId = searchParams.get('employee_id')

  const { data: clientData } = useGetClientById(clientId || '')
  const { data: vendorData } = useGetVendorById(vendorId || '')
  const { data: employeeData } = useGetEmployeeById(
    '5AF30301:443B:A578:5869:97232E7CC958642245153ED8B5B3158441F92734' ||
      employeeId ||
      ''
  )

  const { client, vendor } = useOnboarding()
  console.log('vendor =', vendor, vendorData)

  useEffect(() => {
    console.log('client =', client)
    if (client) {
      setClientDetailsData(client)
    }
    if (vendor) {
      setVendorDetailsData(vendor)
    }
  }, [client, vendor])

  useEffect(() => {
    if (active === 4) {
      setOnboardingStepperData(form.values)
    }
  }, [])

  useEffect(() => {
    if (onboardingData) {
      setOnboardingStepperData(onboardingData || {})
    }
  }, [onboardingData])

  // onboarding flow states
  const form = useForm<TOnboarding>({
    initialValues: onboardingStepperData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSave = (values: TOnboarding) => {
    const onboardingData = {
      ...clientDetailsData,
      ...vendorDetailsData,
      ...values,
      employee_uuid: employeeData?.data?.uuid,
      vendor_uuid: vendorDetailsData.uuid,
      client_uuid: clientDetailsData.uuid,
      submission_uuid: '',
    }

    if (draft_onboarding_uuid) {
      onboardingData.uuid = draft_onboarding_uuid
    }

    // void onboardingFlow(onboardingStepperData)
    // calling API

    setIsOnboardingInitiated(true)
    createOnboarding(onboardingData)
      .then((data) => {
        if (active >= 4) {
          localStorage.removeItem('draft_onboarding_uuid')
        } else {
          localStorage.setItem(
            'draft_onboarding_uuid',
            data?.uuid ? data.uuid : ''
          )
        }

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
    <>
      <div className={classes.onboarding}>
        {/* Onboarding details tabs */}
        <Tabs
          // variant="outline"
          p={20}
          radius="sm"
          defaultValue="Client"
          className={classes.tabs}
          style={{ display: 'none' }}
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
            <OnboardEmployeeDetails {...((employeeData || {}) as TAEmployee)} />
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
            {/* Employee */}
            <div>
              <Text mb="md">Employee Details</Text>
              <Group grow align="center" mb="lg">
                <TextInput
                  readOnly={true}
                  label="First Name"
                  type={'text'}
                  placeholder="First Name"
                  value={employeeData?.data?.fname}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Last Name"
                  type={'text'}
                  placeholder="Last Name"
                  value={employeeData?.data?.lname}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Email"
                  type={'text'}
                  placeholder="Email"
                  value={employeeData?.data?.email}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Phone"
                  type={'text'}
                  placeholder="Phone"
                  value={employeeData?.data?.phone}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="SSN"
                  type={'text'}
                  placeholder="SSN"
                  value={employeeData?.data?.ssn_no}
                  style={{ minWidth: '200px' }}
                />
              </Group>

              <Group grow align="center" mb="lg">
                <div style={{ minWidth: '200px' }}>
                  <Select
                    readOnly={true}
                    label="Employment Type"
                    placeholder="Employment Type"
                    data={[
                      { label: 'H1', value: 'h1' },
                      {
                        label: 'Green Card/Citizen',
                        value: 'Green Card/Citizen',
                      },
                      { label: 'Green Card/USC', value: 'Green Card/USC' },
                      { label: 'NA', value: 'na' },
                    ]}
                    {...form.getInputProps('employee_type')}
                  />
                </div>
                <TextInput
                  readOnly={true}
                  label="Date of birth"
                  type={'date'}
                  placeholder="Date of birth"
                  value={employeeData?.data?.dob}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="City"
                  type={'text'}
                  placeholder="City"
                  value={employeeData?.data?.city}
                />
                <TextInput
                  readOnly={true}
                  label="State"
                  type={'text'}
                  placeholder="State"
                  value={employeeData?.data?.state}
                />
              </Group>
            </div>

            <Stepper
              active={active}
              onStepClick={setActive}
              breakpoint="sm"
              className={classes.stepper}
            >
              <Stepper.Step label="Job" description="Job Info...">
                {/* client and vendor */}
                <Accordion defaultValue="">
                  {/* Client */}
                  <Accordion.Item value="client">
                    <Accordion.Control style={{ padding: '0' }}>
                      <Divider
                        className={classes.dividerText}
                        my="20px"
                        label={
                          <>
                            <IconChevronsRight />
                            <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                              Client
                            </Box>
                          </>
                        }
                      />
                    </Accordion.Control>
                    <Accordion.Panel>
                      <OnboardClientDetails
                        key={clientDetailsData.id}
                        {...clientDetailsData}
                      />
                    </Accordion.Panel>
                  </Accordion.Item>

                  {/* Vendor */}
                  <Accordion.Item value="vendor">
                    <Accordion.Control style={{ padding: '0' }}>
                      <Divider
                        className={classes.dividerText}
                        my="20px"
                        label={
                          <>
                            <IconChevronsRight />
                            <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                              Vendor
                            </Box>
                          </>
                        }
                      />
                    </Accordion.Control>
                    <Accordion.Panel>
                      <OnboardEmployeeDetails
                        {...((employeeData?.data || {}) as TAEmployee)}
                      />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
                <Profile form={form} />
              </Stepper.Step>
              <Stepper.Step label="Payments" description="Payment Info...">
                <Account form={form} />
              </Stepper.Step>
              <Stepper.Step
                label="Immigration"
                description="Immigration Info..."
              >
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
              <Stepper.Completed>
                Completed, Others messages...
              </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="5rem">
              <Button
                variant="default"
                disabled={active <= 0}
                onClick={prevStep}
              >
                Previous
              </Button>
              <Button variant="light" type="submit">
                {isOnboardingInitiated ? 'Onboarding Initiated' : 'Save'}
              </Button>
              {active <= 3 && <Button onClick={nextStep}>Next</Button>}
            </Group>
          </form>
        </div>
      </div>
    </>
  )
}
