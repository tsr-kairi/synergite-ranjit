import ClientIdList from '@/components/form/submission/clientIdList'
import ClientDetailsForm from '@/components/form/submission/details/clientDetailsForm'
import EmployeeDetailsForm from '@/components/form/submission/details/employeeDetailsForm'
import VendorDetailsForm from '@/components/form/submission/details/vendorDetailsForm'
import EmployeeIdList from '@/components/form/submission/employeeIdList'
import VendorIdList from '@/components/form/submission/vendorIdList'
import { TClient, TVendor } from '@/types'
import { TCandidate } from '@/types/candidate-type'
import {
  Button,
  createStyles,
  Drawer,
  Group,
  Loader,
  Select,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconExternalLink } from '@tabler/icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  formMain: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.40)',
    // border: `1px solid ${theme.colors.blue[9]}`,
  },
  logo: {
    color: theme.colors.cyan,
    height: '50px',
  },
}))

type IOnboardingQuestionnaireProps = {
  // employee_id: string
  // vendor_id: string
  employment_type: string
  payment_type: string
}

const Questionnaire = () => {
  const { classes } = useStyles()
  // Initiate Onboarding state
  const [isInitiating, setIsInitiating] = useState(false)

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
  const { state } = useLocation()
  console.log('[Questionnaire] state =', state)

  //  useForm var
  const form = useForm<IOnboardingQuestionnaireProps>({
    initialValues: {
      employment_type: 'ET_INTERNAL',
      payment_type: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

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
  const handleInitiate = (values: IOnboardingQuestionnaireProps) => {
    // employee_id: candidateDetails?.uuid,
    //   vendor_id: vendorDetails?.uuid,
    //   client_id: clientDetails?.uuid,

    void values
    try {
      form.reset()
      setTimeout(() => {
        navigate('/onboarding')
      }, 2000)
    } catch (error) {
      // TODO - Need to show an Error Alert
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
          onSubmit={form.onSubmit(handleInitiate)}
          className={classes.formMain}
        >
          <Group grow align={'center'}>
            <TextInput
              key={candidateDetails?.uuid}
              required
              label="Candidate"
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
          <Group mt={'md'} align={'center'} grow>
            <Select
              required
              data={[
                { value: 'BILLABLE', label: 'Billable' },
                { value: 'NON_BILLABLE', label: 'Non Billable' },
              ]}
              placeholder="Payment Type"
              label="Payment Type"
              {...form.getInputProps('payment_type')}
            />
            <Select
              data={[
                { value: 'ET_W2', label: 'W2' },
                { value: 'ET_C2C', label: 'C2C' },
                { value: 'ET_1099', label: '1099' },
                {
                  value: 'ET_INTERNAL',
                  label: 'Internal Employees',
                },
              ]}
              label="Employment Type"
              placeholder="Employment Type"
              required
              {...form.getInputProps('employment_type')}
            />
          </Group>
          {form.values.employment_type === 'ET_INTERNAL' ? null : (
            <Group mt={'md'} align={'center'} grow>
              <TextInput
                key={clientDetails?.uuid}
                label="Client"
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
          )}

          {form.values.employment_type === 'ET_C2C' && (
            <Group mt={'md'} align={'center'} grow>
              <TextInput
                label="Vendor"
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
          <Button variant="outline" color="yellow" mt="xl">
            Initiate Onboarding
          </Button>
        </form>
      )}

      {/* Showing Candidate, Client and vendor Lists */}
      <Drawer
        opened={candidateListIsOpened}
        onClose={() => setCandidateListIsOpened(false)}
        title="Candidates"
        padding="xl"
        size="xl"
        position="right"
      >
        <EmployeeIdList
          setEmployee={(candidate) => {
            setCandidateDetails(candidate)
          }}
        />
      </Drawer>

      {/* Showing Client List */}
      <Drawer
        opened={clientListIsOpened}
        onClose={() => setClientListIsOpened(false)}
        title="Client"
        padding="xl"
        size="xl"
        position="right"
      >
        <ClientIdList
          setClient={(client) => {
            setClientDetails(client)
          }}
        />
      </Drawer>

      {/* Showing Vendor List */}
      <Drawer
        opened={vendorListIsOpened}
        onClose={() => setVendorListIsOpened(false)}
        title="Vendor"
        padding="xl"
        size="xl"
        position="right"
      >
        <VendorIdList
          setVendor={(vendor) => {
            setVendorDetails(vendor)
          }}
        />
      </Drawer>

      {/* Showing Candidate, Client and Vendor Details */}
      <Drawer
        opened={candidateDetailsOpened}
        onClose={() => setCandidateDetailsOpened(false)}
        title="Candidate details"
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
        title="Client details"
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
        title="Vendor details"
        padding="xl"
        size="xl"
        position="right"
      >
        <VendorDetailsForm {...vendorDetails} />
      </Drawer>
    </>
  )
}

export default Questionnaire
