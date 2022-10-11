import { TOnboarding } from '@/types/onboarding-flow-type'
import { Accordion, ActionIcon, Card } from '@mantine/core'
import { IconEdit } from '@tabler/icons'
import { useState } from 'react'

interface ReviewProps {
  onReviewTileClick: (id: string) => void
  onboardingData: TOnboarding
}

const styles = {
  accordionControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}

const Review: React.FC<ReviewProps> = ({
  onboardingData,
  onReviewTileClick,
}) => {
  const [documentFilePreview, setDocumentFilePreview] = useState<string>()

  const actionIcon = (index: string) => {
    return (
      <ActionIcon
        style={{ textAlign: 'right' }}
        onClick={() => onReviewTileClick(index)}
      >
        <IconEdit size={16} style={{ textAlign: 'right' }} />
      </ActionIcon>
    )
  }

  let documentFile = ''
  if (typeof onboardingData.choose_file === 'object') {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(onboardingData.choose_file)
    fileReader.onload = (event) => {
      setDocumentFilePreview((event.target?.result || '') as string)
    }
  } else {
    documentFile = onboardingData.choose_file
  }

  return (
    <div>
      <h3>Review</h3>

      <Accordion defaultValue="jobs">
        <Accordion.Item value="jobs">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <span>Jobs</span>
              <span>{actionIcon('0')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card shadow="md">
              <p>Start Date: {onboardingData.start_date?.toString()}</p>
              <p>End Date: {onboardingData.end_date?.toString()}</p>
              <p>Work State: {onboardingData.work_state}</p>
              <p>Client Location: {onboardingData.client_location}</p>
              <p>Experience: {onboardingData.experience}</p>
              <p>Department: {onboardingData.department}</p>
              <p>Reporting to: {onboardingData.reporting_to}</p>
              <p>Designation: {onboardingData.designation}</p>
              <p>Overtime Exemption: {onboardingData.overtime_exemption}</p>
              <p>Remarks: {onboardingData.remarks}</p>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="payments">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <span>Payments</span>
              <span>{actionIcon('1')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card shadow="md">
              <p>Name of Recruiter: {onboardingData.name_of_recruiter}</p>
              <p>
                Contact Number of Recruiter:{' '}
                {onboardingData.contact_number_of_recruiter}
              </p>
              <p>Bill rate: {onboardingData.bill_rate}</p>
              <p>Pay rate: {onboardingData.pay_rate}</p>
              <p>Payment frequency: {onboardingData.payment_frequency}</p>
              <p>
                Account Manager Commission:{' '}
                {onboardingData.account_manager_commission}
              </p>
              <p>
                Recruitment Manager Commission:{' '}
                {onboardingData.recruitment_manager_commission}
              </p>
              <p>
                Recruitment Commission: {onboardingData.recruitment_commission}
              </p>
              <p>
                Additional Information: {onboardingData.additional_information}
              </p>
              <p>
                Additional Commission: {onboardingData.additional_commission}
              </p>
              <p>Remarks: {onboardingData.remarks}</p>
              <p>Vendor: {onboardingData.vendor}</p>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="immigration">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <span>Immigration</span>
              <span>{actionIcon('2')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card shadow="md">
              <p>Processing Type: {onboardingData.processing_type}</p>
              <p>
                Who is going to pay Premium:{' '}
                {onboardingData.who_is_going_to_pay_premium}
              </p>
              <p>
                Immigration Job Title: {onboardingData.immigration_job_title}
              </p>
              <p>Current H1B validity: {onboardingData.current_h1b_validity}</p>
              <p>Current LCA number: {onboardingData.current_lac_number}</p>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="document">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <span>Document</span>
              <span>{actionIcon('3')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card shadow="md">
              <p>Document Type: {onboardingData.document_type}</p>
              <p>
                Choose File:
                {documentFilePreview ? (
                  <img src={documentFilePreview} alt="document preview" />
                ) : (
                  documentFile
                )}
              </p>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Review
