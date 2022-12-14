import ClientIdList from '@/components/form/submission/clientIdList'
import ClientDetailsForm from '@/components/form/submission/details/clientDetailsForm'
import EmployeeDetailsForm from '@/components/form/submission/details/employeeDetailsForm'
import VendorDetailsForm from '@/components/form/submission/details/vendorDetailsForm'
import EmployeeIdList from '@/components/form/submission/employeeIdList'
import VendorIdList from '@/components/form/submission/vendorIdList'
import { TClient, TVendor } from '@/types'
import { TCandidate } from '@/types/candidate-type'
import { TDirectOnboard } from '@/types/direct-onboard-type'
import {
  Button,
  createStyles,
  Drawer,
  Group,
  Loader,
  MantineProvider,
  Select,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconExternalLink } from '@tabler/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateDirectOnboard from './createDirectOnboarding'

const useStyles = createStyles((theme) => ({
  formMain: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.40)',
  },
  logo: {
    color: theme.colors.cyan,
    height: '50px',
  },
}))

type IOnboardingQuestionnaireProps = {
  employment_type: string
  payment_type: string
}

// interface ISubmissionProps {
//   data: TSubmission
// }

const Questionnaire = () => {
  const { classes } = useStyles()
  // Initiate Onboarding state
  const [isInitiating, setIsInitiating] = useState(false)
  const { mutate: createDirectOnboard } = useCreateDirectOnboard()

  // Candidate, Client and Vendor : Details state
  const [candidateDetails, setCandidateDetails] = useState({} as TCandidate)
  const [clientDetails, setClientDetails] = useState({} as TClient)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)

  // Candidate, Client and Vendor : List Open/Close state
  const [candidateListIsOpened, setCandidateListIsOpened] = useState(false)
  const [clientListIsOpened, setClientListIsOpened] = useState(false)
  const [vendorListIsOpened, setVendorListIsOpened] = useState(false)

  // Candidate, Client and Vendor : Details Open/Close state
  const [candidateDetailsOpened, setCandidateDetailsOpened] = useState(false)
  const [clientDetailsOpened, setClientDetailsOpened] = useState(false)
  const [vendorDetailsOpened, setVendorDetailsOpened] = useState(false)

  //  redirect to onboarding
  const navigate = useNavigate()
  // const { state } = useLocation()
  // console.log('[Questionnaire] state =', state)

  // requiredMsg errorNMsg
  const requiredMsg = 'This field is required'
  const errorNMsg = 'Please fill required fields'

  //  useForm var
  const form = useForm<IOnboardingQuestionnaireProps>({
    initialValues: {
      employment_type: '',
      payment_type: '',
    },

    // ? functions will be used to validate values at corresponding key
    validate: {
      // Questionnaire form validation
      employment_type: (value) => (value?.length > 1 ? null : requiredMsg),
      payment_type: (value) => (value?.length > 1 ? null : requiredMsg),
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  // ?  handleError function for form validation
  const handleError = (errors: typeof form.errors) => {
    if (errors.employment_type) {
      showNotification({
        message: errorNMsg,
        color: 'red',
      })
    } else if (errors.payment_type) {
      showNotification({
        message: errorNMsg,
        color: 'red',
      })
    }
  }

  //  name addition var of : candidate, Client and vendor
  const candidateName = `${candidateDetails?.first_name || ''} ${
    candidateDetails?.last_name || ''
  }`

  const clientName = `${clientDetails?.first_name || ''} ${
    clientDetails?.last_name || ''
  }`

  const vendorName = `${vendorDetails?.first_name || ''} ${
    vendorDetails?.last_name || ''
  }`

  //  Initiate onboarding handler function
  const handleDirectOnboarding = () => {
    const preDirectOnboardPayload: TDirectOnboard = {
      client_uuid: clientDetails?.uuid,
      employee_uuid: candidateDetails?.uuid,
      vendor_uuid: vendorDetails?.uuid,
      employment_type: candidateDetails?.employment_type,
    }
    try {
      form.reset()
      // delete submissionData.uuid
      createDirectOnboard(preDirectOnboardPayload, {
        onSuccess(data) {
          setTimeout(() => {
            navigate(
              `/onboarding?client_uuid=${clientDetails.uuid}&vendor_uuid=${
                vendorDetails.uuid
              }&employee_uuid=${candidateDetails.uuid}&onboarding_uuid=${
                data?.data?.uuid || ''
              }`
            )
          }, 2000)
        },
      })
    } catch (error) {
      // TODO - Need to show an Error Alert
      showNotification({
        message: 'Failed to Initiating!!',
        color: 'red',
      })
    }
    setIsInitiating(true)
  }

  return (
    <>
      {isInitiating && (
        <div>
          Initiating <Loader variant="dots" size="sm" />
        </div>
      )}
      {!isInitiating && (
        <form
          onSubmit={form.onSubmit(handleDirectOnboarding, handleError)}
          className={classes.formMain}
        >
          <Group grow spacing={'xs'}>
            <Text
              style={{
                maxWidth: '30px',
                marginBottom: '35px',
                fontSize: '18px',
              }}
            >
              Q.
            </Text>
            <Select
              style={{
                maxWidth: '16000px',
              }}
              data={[
                { value: 'ET_W2', label: 'W2' },
                { value: 'ET_C2C', label: 'C2C' },
                { value: 'ET_1099', label: '1099' },
                {
                  value: 'ET_INTERNAL',
                  label: 'Internal Employees',
                },
              ]}
              clearable
              label="Select a Employment Type"
              placeholder="Select a Employment Type"
              required
              {...form.getInputProps('employment_type')}
            />
          </Group>
          <Group grow spacing={'xs'} mt={'md'}>
            <Text
              style={{
                maxWidth: '30px',
                marginBottom: '35px',
                fontSize: '18px',
              }}
            >
              Q.
            </Text>
            <TextInput
              style={{ maxWidth: '16000px' }}
              key={candidateDetails?.uuid}
              required
              label="Select a candidate"
              type={'text'}
              placeholder="Candidate"
              onClick={() => {
                setCandidateListIsOpened(true)
              }}
              value={candidateName || ''}
              rightSection={
                candidateDetails?.uuid ? (
                  <IconExternalLink
                    size="20"
                    color="grey"
                    cursor="pointer"
                    onClick={() => {
                      setCandidateDetailsOpened(true)
                      // setCandidateDetails(candidateDetails)
                    }}
                  />
                ) : null
              }
            />
          </Group>
          <Group mt={'md'} grow spacing={'xs'}>
            <Text
              style={{
                maxWidth: '30px',
                marginBottom: '35px',
                fontSize: '18px',
              }}
            >
              Q.
            </Text>
            <Select
              style={{
                maxWidth: '16000px',
              }}
              required
              data={[
                { value: 'BILLABLE', label: 'Billable' },
                { value: 'NON_BILLABLE', label: 'Non Billable' },
              ]}
              clearable
              placeholder="Select a Payment Type"
              label="Select a Payment Type"
              {...form.getInputProps('payment_type')}
            />
          </Group>
          {form.values.employment_type === 'ET_W2' ||
          form.values.employment_type === 'ET_C2C' ||
          form.values.employment_type === 'ET_1099' ? (
            <Group mt={'md'} grow spacing={'xs'}>
              <Text
                style={{
                  maxWidth: '30px',
                  marginBottom: '35px',
                  fontSize: '18px',
                }}
              >
                Q.
              </Text>
              <TextInput
                style={{
                  maxWidth: '16000px',
                }}
                key={clientDetails?.uuid}
                label="Select a client"
                type={'text'}
                placeholder="Client"
                onClick={() => {
                  setClientListIsOpened(true)
                }}
                value={clientName || ''}
                rightSection={
                  clientDetails?.uuid ? (
                    <IconExternalLink
                      size="20"
                      color="grey"
                      cursor="pointer"
                      onClick={() => {
                        setClientDetailsOpened(true)
                        // setClientDetails(clientDetails)
                      }}
                    />
                  ) : null
                }
              />
            </Group>
          ) : null}

          {form.values.employment_type === 'ET_C2C' && (
            <Group mt={'md'} grow spacing={'xs'}>
              <Text
                style={{
                  maxWidth: '30px',
                  marginBottom: '35px',
                  fontSize: '18px',
                }}
              >
                Q.
              </Text>
              <TextInput
                style={{
                  maxWidth: '16000px',
                }}
                label="Select a vendor"
                type={'text'}
                placeholder="Vendor"
                onClick={() => {
                  setVendorListIsOpened(true)
                }}
                value={vendorName || ''}
                rightSection={
                  vendorDetails?.uuid ? (
                    <IconExternalLink
                      size="20"
                      color="grey"
                      cursor="pointer"
                      onClick={() => {
                        setVendorDetailsOpened(true)
                        // setVendorDetails()
                      }}
                    />
                  ) : null
                }
              />
            </Group>
          )}
          <MantineProvider
            inherit
            theme={{
              defaultGradient: {
                from: 'rgba(252,185,0,1)',
                to: 'rgba(252,185,0,1)',
                deg: 45,
              },
            }}
          >
            {/* {subData?.map((item) => { */}
            <Button
              // key={item.uuid}
              type="submit"
              variant="gradient"
              size="md"
              fullWidth
              mt="xl"
              color="indigo"
              // onClick={() => void handlePreOnboarding()}
            >
              Initiate Onboarding
            </Button>
            {/* })} */}
          </MantineProvider>
        </form>
      )}

      {/* Showing Candidate, Client and vendor Lists */}
      <Drawer
        opened={candidateListIsOpened}
        onClose={() => setCandidateListIsOpened(false)}
        title="Candidates"
        padding="xl"
        size="650px"
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
          selectedClient={clientDetails}
          setClient={(client) => {
            setClientDetails(client)
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
          selectedVendor={vendorDetails}
          setVendor={(vendor) => {
            setVendorDetails(vendor)
            setVendorListIsOpened(false)
          }}
        />
      </Drawer>

      {/* Showing Candidate, Client and Vendor Details */}
      <Drawer
        opened={candidateDetailsOpened}
        onClose={() => setCandidateDetailsOpened(false)}
        title="Candidate Details"
        padding="xl"
        size="1200px"
        position="right"
      >
        <EmployeeDetailsForm {...candidateDetails} />
      </Drawer>

      {/* Showing Client Details */}
      <Drawer
        opened={clientDetailsOpened}
        onClose={() => setClientDetailsOpened(false)}
        title="Client Details"
        padding="xl"
        size="1200px"
        position="right"
      >
        <ClientDetailsForm {...clientDetails} />
      </Drawer>

      {/* Showing Vendor Details */}
      <Drawer
        opened={vendorDetailsOpened}
        onClose={() => setVendorDetailsOpened(false)}
        title="Vendor Details"
        padding="xl"
        size="1200px"
        position="right"
      >
        <VendorDetailsForm {...vendorDetails} />
      </Drawer>
    </>
  )
}

export default Questionnaire
