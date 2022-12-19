import { useEffect } from 'react'
import { TClient, TVendor } from '@/types'
import { TCandidate } from '@/types/candidate-type'
import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  Button,
  Group,
  createStyles,
  Stepper,
  TextInput,
  Accordion,
  Text,
  Divider,
  Box,
  Tooltip,
  Drawer,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import Payment from './onboarding-flow/payment'
import Documents from './onboarding-flow/document'
import Immigration from './onboarding-flow/immigration'
import Job from './onboarding-flow/job'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Review from './onboarding-flow/review'

import {
  updateOnboarding,
  createOnboarding,
  getOnboardingByUUID,
} from '@/services/onboarding.services'

import {
  IconBriefcase,
  IconChevronsRight,
  IconExternalLink,
  IconFileDots,
  IconShieldCheck,
  IconWallet,
  IconWorldUpload,
} from '@tabler/icons'

import useGetClientById from '../client/hooks/useGetClientById'
import useGetVendorById from '../vendor/hooks/useGetVendorById'
import useGetCandidateById from '../candidate/hooks/useGetCandidateById'

import { openConfirmModal } from '@mantine/modals'

import CandidateDetails from '@/components/form/details/candidate-details/candidateDetails'
import ClientDetails from '@/components/form/details/client-details/clientDetails'
import VendorDetails from '@/components/form/details/vendor-details/vendorDetails'
import { TSubmission } from '@/types/submission-type'
import ClientIdList from '@/components/form/submission/clientIdList'
import EmployeeIdList from '@/components/form/submission/employeeIdList'
import VendorIdList from '@/components/form/submission/vendorIdList'
import EmployeeDetailsForm from '@/components/form/submission/details/employeeDetailsForm'
import ClientDetailsForm from '@/components/form/submission/details/clientDetailsForm'
import VendorDetailsForm from '@/components/form/submission/details/vendorDetailsForm'

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
  detailHead: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  iconCheck: {
    cursor: 'pointer',
  },
}))

export default function Onboarding() {
  const { classes } = useStyles()
  // details open
  const [candidateDetailsOpened, setCandidateDetailsIsOpened] = useState(false)
  const [clientDetailsOpened, setClientDetailsIsOpened] = useState(false)
  const [vendorDetailsOpened, setVendorDetailsIsOpened] = useState(false)

  // list open
  const [clientListIsOpened, setClientListIsOpened] = useState(false)
  const [candidateListIsOpened, setCandidateListIsOpened] = useState(false)
  const [vendorListIsOpened, setVendorListIsOpened] = useState(false)

  // details data
  const [candidateDetails, setCandidateDetails] = useState({} as TCandidate)

  // activeStep states
  const [activeStepNumber, setActiveStepNumber] = useState(0)

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
  const clientUUID = searchParams.get('client_uuid')
  const vendorUUID = searchParams.get('vendor_uuid')
  const employeeUUID = searchParams.get('employee_uuid')
  const submissionUUID = searchParams.get('submission_uuid')
  // console.log('canId', employeeUUID)

  //
  const completionPercentage = searchParams.get('completion_percentage')
  // console.log('submissionUUID', submissionUUID)
  // const [subData, setSubData] = useState({} as TSubmission)

  const { data: clientData } = useGetClientById(clientUUID || '')
  const { data: vendorData } = useGetVendorById(vendorUUID || '')
  const { data: employeeData } = useGetCandidateById(employeeUUID || '')
  // console.log('canId', employeeData)

  // const { onboarding_uuid } = useParams()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const onboardingUuid = params.get('onboarding_uuid')
  // console.log('onboardingUuid', onboardingUuid)

  // requiredMsg errorNMsg
  const requiredMsg = 'This field is required'
  const errorNMsg = 'Please fill required fields'

  // use form
  const form = useForm<TOnboarding>({
    initialValues: {
      ...onboardingStepperData,
    },

    // ? functions will be used to validate values at corresponding key
    validate: {
      //  in job form validation
      reporting_to: (value) => (value?.length > 1 ? null : requiredMsg),
      overtime_exemption: (value) => (value?.length > 1 ? null : requiredMsg),

      // ! in payment form validation
      // bill_rate: (value) => (value?.length > 1 ? null : requiredMsg),
      // pay_rate: (value) => (value?.length > 1 ? null : requiredMsg),
      // payment_frequency: (value) => (value?.length > 1 ? null : requiredMsg),

      // ! in immigration form validation
      // processing_type: (value) => (value?.length > 1 ? null : requiredMsg),
      // who_is_going_to_pay_premium: (value) =>
      //   value?.length > 1 ? null : requiredMsg,
      // current_h1b_validity: (value) => (value?.length > 1 ? null : requiredMsg),
      // current_lac_number: (value) => (value?.length > 1 ? null : requiredMsg),
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  // ?  handleError function for form validation
  const handleError = (errors: typeof form.errors) => {
    if (errors.reporting_to) {
      showNotification({
        message: errorNMsg,
        color: 'red',
      })
    } else if (errors.overtime_exemption) {
      showNotification({
        message: errorNMsg,
        color: 'red',
      })
    }
    // ! Payment form validate notify
    // else if (errors.bill_rate) {
    //   showNotification({
    //     message: errorNMsg,
    //     color: 'red',
    //   })
    // } else if (errors.pay_rate) {
    //   showNotification({
    //     message: errorNMsg,
    //     color: 'red',
    //   })
    // } else if (errors.payment_frequency) {
    //   showNotification({
    //     message: errorNMsg,
    //     color: 'red',
    //   })
    // } else if (errors.processing_type) {
    //   showNotification({
    //     message: errorNMsg,
    //     color: 'red',
    //   })
    // } else if (errors.who_is_going_to_pay_premium) {
    //   showNotification({
    //     message: errorNMsg,
    //     color: 'red',
    //   })
    // } else if (errors.current_h1b_validity) {
    //   showNotification({
    //     message: errorNMsg,
    //     color: 'red',
    //   })
    // } else if (errors.current_lac_number) {
    //   showNotification({
    //     message: errorNMsg,
    //     color: 'red',
    //   })
    // }
  }

  useEffect(() => {
    if (completionPercentage) {
      if (completionPercentage === '25') {
        setActiveStepNumber(1)
      } else if (completionPercentage === '50') {
        setActiveStepNumber(2)
      } else if (completionPercentage === '75') {
        setActiveStepNumber(3)
      } else if (completionPercentage === '100') {
        setActiveStepNumber(4)
      }
    }
  }, [completionPercentage])

  useEffect(() => {
    if (onboardingData) {
      setOnboardingStepperData(onboardingData || {})
    }
  }, [onboardingData])

  useEffect(() => {
    if (activeStepNumber === 4) {
      setOnboardingStepperData(form.values)
    }
  }, [activeStepNumber, form.values])

  // onConfirm Save Onboarding
  const onConfirmUpdateOnboarding = (values: TOnboarding) => {
    // let onboardStatus = 'PREONBOARD_IN_PROGRESS'
    let completion_percentage
    if (activeStepNumber === 0) {
      completion_percentage = 25
    } else if (activeStepNumber === 1) {
      completion_percentage = 50
    } else if (activeStepNumber === 2) {
      completion_percentage = 75
    } else if (activeStepNumber === 3) {
      completion_percentage = 100
    }

    const d = new Date(values.start_date)
    d.setHours(0, 0, 0, 0)
    const onboardingData = {
      ...values,
      employee_uuid: employeeUUID,
      vendor_uuid: vendorUUID,
      client_uuid: clientUUID,
      submission_uuid: submissionUUID,
      onboard_status: 'PRE_INPROGRESS',
      completion_percentage,
    }

    console.log(onboardingData)

    if (draft_onboarding_uuid) {
      onboardingData.uuid = draft_onboarding_uuid
    }

    setIsOnboardingInitiated(true)
    updateOnboarding(onboardingData as TOnboarding, String(onboardingUuid))
      .then((data) => {
        if (activeStepNumber >= 4) {
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
        // if (active === 4) {
        //   navigate('/onboarding-list')
        // }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsOnboardingInitiated(false))
  }

  // onConfirm create onboarding
  const onConfirmSaveOnboarding = (values: TOnboarding) => {
    const onboardingData = {
      ...values,
      employee_uuid: employeeUUID || undefined,
      vendor_uuid: vendorUUID || undefined,
      client_uuid: clientUUID || undefined,
      submission_uuid: submissionUUID || undefined,
      uuid: String(onboardingUuid) || undefined,
    }
    createOnboarding(onboardingData)
      .then(() => {
        // if (active >= 4) {
        //   localStorage.removeItem('draft_onboarding_uuid')
        // } else {
        //   localStorage.setItem(
        //     'draft_onboarding_uuid',
        //     data?.uuid ? data.uuid : ''
        //   )
        // }

        showNotification({
          title: 'Success!!',
          message: 'Onboarding save called successfully.',
        })
        if (activeStepNumber === 4) {
          navigate('/onboarding-list')
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsOnboardingInitiated(false))
  }

  // handleSave function
  const handleSave = (values: TOnboarding) => {
    console.log(values)
    if (activeStepNumber >= 4) {
      openConfirmModal({
        title: 'Are you sure you want to submit the details?',
        children: (
          <Text size="sm">
            After submit the details, You cannot edit them back. So, Please take
            your Action Carefully.
          </Text>
        ),
        labels: { confirm: 'Yes', cancel: 'No' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
          // onConfirmUpdateOnboarding(values)
          onConfirmSaveOnboarding(values)
        },
      })
    } else {
      onConfirmUpdateOnboarding(values)
      // onConfirmSaveOnboarding(values)
    }
  } // End of handleSave function

  const canName2 = `${candidateDetails?.first_name || ''} ${
    candidateDetails?.last_name || ''
  }`
  const canName = `${employeeData?.data?.first_name || ''} ${
    employeeData?.data?.last_name || ''
  }`

  const clName = `${clientData?.data?.first_name || ''} ${
    clientData?.data?.last_name || ''
  }`

  const venName = `${vendorData?.data?.first_name || ''} ${
    vendorData?.data?.last_name || ''
  }`

  // next btn
  const nextStep = () => {
    setActiveStepNumber((current) => (current < 5 ? current + 1 : current))
  }

  // prev btn
  const prevStep = () => {
    setActiveStepNumber((current) => (current > 0 ? current - 1 : current))
  }

  console.log('onboardingStepperData =', onboardingStepperData);

  return (
    <>
      <div className={classes.onboarding}>
        {/* Onboarding flow stepper */}
        <div className={classes.stepperMain}>
          <form onSubmit={form.onSubmit(handleSave, handleError)}>
            {/* Candidate */}
            <Accordion defaultValue="">
              <Accordion.Item
                value="employee_details"
                style={{ borderBottom: 'none' }}
              >
                <Accordion.Control style={{ padding: '0' }}>
                  <Divider
                    className={classes.dividerText}
                    my="20px"
                    label={
                      <>
                        <IconChevronsRight />
                        <Box
                          style={{
                            fontFamily: '-moz-initial',
                            fontSize: '16px',
                          }}
                          ml={5}
                        >
                          Candidate : {canName}
                        </Box>
                      </>
                    }
                  />
                </Accordion.Control>
                {/* candidate */}
                <Accordion.Panel>
                  <Group grow align="center" mb="lg">
                    {/* <Tooltip
                      label="Change here to candidate"
                      color="blue"
                      withArrow
                      transition="pop-top-right"
                      transitionDuration={300}
                    > */}
                    <TextInput
                      readOnly={true}
                      label="Candidate Name"
                      type={'text'}
                      placeholder="Candidate Names"
                      value={canName}
                      // onClick={() => setCandidateListIsOpened(true)}
                      style={{ minWidth: '200px' }}
                      rightSection={
                        <IconExternalLink
                          size="20"
                          color="grey"
                          cursor="pointer"
                          onClick={() => {
                            setCandidateDetailsIsOpened(true)
                          }}
                        />
                      }
                    />
                    {/* </Tooltip> */}
                    <TextInput
                      readOnly={true}
                      label="Email"
                      type={'email'}
                      placeholder="Email"
                      value={employeeData?.data?.email}
                      style={{ minWidth: '200px' }}
                    />
                    <TextInput
                      readOnly={true}
                      label="Phone"
                      type={'number'}
                      placeholder="Phone"
                      value={employeeData?.data?.phone}
                      style={{ minWidth: '200px' }}
                    />
                    {/* <TextInput
                      readOnly={true}
                      label="SSN"
                      type={'text'}
                      placeholder="SSN"
                      value={employeeData?.data?.ssn_no}
                      style={{ minWidth: '200px' }}
                    /> */}
                    <TextInput
                      readOnly={true}
                      label="Date of birth"
                      type={'date'}
                      placeholder="Date of birth"
                      value={employeeData?.data?.dob}
                      style={{ minWidth: '100px' }}
                    />
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>

            <Stepper
              color="green"
              size="sm"
              active={activeStepNumber}
              onStepClick={setActiveStepNumber}
              breakpoint="sm"
            >
              <Stepper.Step
                icon={<IconBriefcase size={18} />}
                label="Job"
                description="Job Information..."
              >
                {/* client and vendor */}
                <Accordion defaultValue="">
                  {/* Client */}
                  {employeeData?.data.employment_type === 'Internal' ? null : (
                    <Accordion.Item
                      value="client"
                      style={{ borderBottom: 'none' }}
                      // onChange={() => {
                      //   setSubData
                      // }}
                    >
                      <Accordion.Control style={{ padding: '0' }}>
                        <Divider
                          className={classes.dividerText}
                          my="20px"
                          label={
                            <>
                              <IconChevronsRight />
                              <Box
                                ml={5}
                                style={{
                                  fontFamily: '-moz-initial',
                                  fontSize: '16px',
                                }}
                              >
                                Client : {clName}
                              </Box>
                            </>
                          }
                        />
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Group grow align="center" mt="md">
                          {/* <Tooltip
                            label="Click to view"
                            color="blue"
                            withArrow
                            transition="pop-top-right"
                            transitionDuration={300}
                            onClick={() => {
                              setClientDetailsIsOpened(true)
                            }}
                          > */}
                          <TextInput
                            readOnly={true}
                            label="Account Name"
                            type={'text'}
                            placeholder="Account Name"
                            value={clName}
                            // onClick={() => {
                            //   setClientDetailsIsOpened(true)
                            // }}
                            rightSection={
                              <IconExternalLink
                                size="20"
                                color="grey"
                                cursor="pointer"
                                onClick={() => {
                                  setClientDetailsIsOpened(true)
                                }}
                              />
                            }
                          />
                          {/* </Tooltip> */}
                          <TextInput
                            readOnly={true}
                            label="Address line 1"
                            type={'text'}
                            placeholder="Address line 1"
                            value={clientData?.data?.address_line1}
                          />
                          <TextInput
                            readOnly={true}
                            label="Address line 2"
                            type={'text'}
                            placeholder="Address line 2"
                            value={clientData?.data?.address_line2}
                          />
                          <TextInput
                            readOnly={true}
                            label="City"
                            type={'text'}
                            placeholder="City"
                            value={clientData?.data?.city}
                          />
                          <TextInput
                            readOnly={true}
                            label="State"
                            type={'text'}
                            placeholder="State"
                            value={clientData?.data?.state}
                          />
                        </Group>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )}

                  {/* Vendor */}
                  {employeeData?.data.employment_type === 'Internal' ? null : (
                    <Accordion.Item
                      value="vendor"
                      style={{ borderBottom: 'none' }}
                      // onChange={() => {
                      //   setSubData
                      // }}
                    >
                      <Accordion.Control style={{ padding: '0' }}>
                        <Divider
                          className={classes.dividerText}
                          my="20px"
                          label={
                            <>
                              <IconChevronsRight />
                              <Box
                                style={{
                                  fontFamily: '-moz-initial',
                                  fontSize: '16px',
                                }}
                                ml={5}
                              >
                                Vendor : {venName}
                              </Box>
                            </>
                          }
                        />
                      </Accordion.Control>
                      <Accordion.Panel>
                        {/* <OnboardVendorDetails
                        key={((vendorData?.data || {}) as TVendor)?.uuid}
                        {...((vendorData?.data || {}) as TVendor)}
                      /> */}
                        <Group grow align="center" mt="md">
                          {/* <Tooltip
                            label="Click to view"
                            color="blue"
                            withArrow
                            transition="pop-top-right"
                            transitionDuration={300}
                            onClick={() => setVendorDetailsIsOpened(true)}
                          > */}
                          <TextInput
                            readOnly={true}
                            label="Vendor Name"
                            type={'text'}
                            placeholder="Vendor Name"
                            value={venName}
                            // onClick={() => {
                            //   setVendorDetailsIsOpened(true)
                            // }}
                            rightSection={
                              <IconExternalLink
                                size="20"
                                color="grey"
                                cursor="pointer"
                                onClick={() => {
                                  setVendorDetailsIsOpened(true)
                                }}
                              />
                            }
                          />
                          {/* </Tooltip> */}
                          <TextInput
                            readOnly={true}
                            label="Email"
                            type={'email'}
                            placeholder="email@email.com"
                            value={vendorData?.data?.primary_email}
                          />
                          <TextInput
                            readOnly={true}
                            label="Phone"
                            type={'tel'}
                            placeholder="Phone"
                            value={vendorData?.data?.primary_phone}
                          />
                          <TextInput
                            readOnly={true}
                            label="City"
                            type={'text'}
                            placeholder="City"
                            value={vendorData?.data?.city}
                          />
                          <TextInput
                            readOnly={true}
                            label="State"
                            type={'text'}
                            placeholder="State"
                            value={vendorData?.data?.state}
                          />
                        </Group>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )}
                </Accordion>
                <Job form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconWallet size={18} />}
                label="Payments"
                description="Payment Information..."
              >
                <Payment form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconWorldUpload size={18} />}
                label="Immigration"
                description="Immigration Information..."
              >
                <Immigration form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconFileDots size={18} />}
                label="Documents"
                description="Documents Information..."
              >
                <Documents form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconShieldCheck size={18} />}
                label="Summary"
                description="Summary Information..."
              >
                <Review
                  onboardingData={onboardingStepperData}
                  onReviewTileClick={(id) => setActiveStepNumber(+id)}
                />
              </Stepper.Step>
            </Stepper>
            <Group position="center" mt="5rem">
              <Button
                variant="default"
                disabled={activeStepNumber <= 0}
                onClick={prevStep}
                hidden={activeStepNumber <= 0}
              >
                Previous
              </Button>
              {activeStepNumber < 4 ? (
                <Button variant="light" type="submit">
                  Save
                </Button>
              ) : (
                <Button variant="light" type="submit">
                  {isOnboardingInitiated
                    ? 'Onboarding Initiated'
                    : 'Initiate Onboarding'}
                </Button>
              )}
              {activeStepNumber <= 3 && (
                <Button type="submit" onClick={nextStep}>
                  Next
                </Button>
              )}
            </Group>
          </form>
        </div>
        {/* Showing Candidate List */}
        <Drawer
          opened={candidateListIsOpened}
          onClose={() => setCandidateListIsOpened(false)}
          title="Candidates"
          padding="xl"
          size="xl"
          position="right"
        >
          <EmployeeIdList
            selectedEmployee={candidateDetails}
            setEmployee={(candidate) => {
              setCandidateDetails(candidate)
              setCandidateListIsOpened(false)
            }}
          />
        </Drawer>
        {/* Showing Client List */}
        <Drawer
          opened={clientListIsOpened}
          onClose={() => setClientListIsOpened(false)}
          title="Clients"
          padding="xl"
          size="xl"
          position="right"
        >
          <ClientIdList
            // selectedClient={clientDetails}
            setClient={() => {
              // setClientDetails(client)
              setClientListIsOpened(false)
            }}
          />
        </Drawer>
        {/* Showing Vendor List */}
        <Drawer
          opened={vendorListIsOpened}
          onClose={() => setVendorListIsOpened(false)}
          title="Vendors"
          padding="xl"
          size="xl"
          position="right"
        >
          <VendorIdList
            // selectedVendor={vendorDetails}
            setVendor={() => {
              // setVendorDetails(vendor)
              setVendorListIsOpened(false)
            }}
          />
        </Drawer>
        {/* candidate details */}
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
          {/* <Divider
            className={classes.dividerText}
            my="10px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  {canName}
                </Box>
              </>
            }
          /> */}
          <EmployeeDetailsForm
            key={employeeUUID}
            {...((employeeData?.data || {}) as TCandidate)}
            {...candidateDetails}
          />
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
          <ClientDetailsForm
            key={clientUUID}
            {...((clientData?.data || {}) as TClient)}
          />
        </Drawer>
        {/* vendor details */}
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
                  {venName}
                </Box>
              </>
            }
          /> */}
          <VendorDetailsForm
            key={vendorUUID}
            {...((vendorData?.data || {}) as TVendor)}
          />
        </Drawer>
      </div>
    </>
  )
}
