import theme from '@/theme/theme'
import { TOnboarding } from '@/types/onboarding-flow-type'
import { Accordion, ActionIcon, Card, Group } from '@mantine/core'
import {
  IconBriefcase,
  IconEdit,
  IconFileDots,
  IconWallet,
  IconWorldUpload,
} from '@tabler/icons'
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
  previewKey: {
    color: theme.colors?.blue?.[6],
    fontWeight: 'lighter',
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
        <IconEdit size={16} style={{ textAlign: 'right', color: 'blue' }} />
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
              <Group>
                <IconBriefcase size={18} style={{ color: 'blue' }} />
                <span>Jobs</span>
              </Group>
              <span>{actionIcon('0')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              <Group>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Start Date:</span>{' '}
                  {onboardingData.start_date?.toString()}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>End Date:</span>{' '}
                  {onboardingData.end_date?.toString()}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Reporting to:</span>{' '}
                  {onboardingData.reporting_to}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Designation:</span>{' '}
                  {onboardingData.designation}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Overtime Exemption:</span>{' '}
                  {onboardingData.overtime_exemption}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Remarks:</span>{' '}
                  {onboardingData.remarks}
                </p>
              </Group>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="payments">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <Group>
                <IconWallet size={18} style={{ color: 'blue' }} />
                <span>Payments</span>
              </Group>
              <span>{actionIcon('1')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              <Group>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Bill rate:</span>{' '}
                  {onboardingData.bill_rate}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Pay rate:</span>{' '}
                  {onboardingData.pay_rate}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Payment frequency:</span>{' '}
                  {onboardingData.payment_frequency}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>
                    Account Manager Commission:
                  </span>{' '}
                  {onboardingData.account_manager_commission}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>
                    Recruitment Manager Commission:
                  </span>{' '}
                  {onboardingData.recruitment_manager_commission}
                </p>
              </Group>
              <Group>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Recruitment Commission:</span>{' '}
                  {onboardingData.recruitment_commission}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Additional Commission:</span>{' '}
                  {onboardingData.additional_commission}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Additional Information:</span>{' '}
                  {onboardingData.additional_information}
                </p>
              </Group>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="immigration">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <Group>
                <IconWorldUpload size={18} style={{ color: 'blue' }} />
                <span>Immigration</span>
              </Group>
              <span>{actionIcon('2')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              <Group>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Processing Type:</span>{' '}
                  {onboardingData.processing_type}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>
                    Who is going to pay Premium:
                  </span>{' '}
                  {onboardingData.who_is_going_to_pay_premium}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Immigration Job Title:</span>{' '}
                  {onboardingData.immigration_job_title}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Current H1B validity:</span>{' '}
                  {onboardingData.current_h1b_validity}
                </p>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Current LCA number:</span>{' '}
                  {onboardingData.current_lac_number}
                </p>
              </Group>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="document">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <Group>
                <IconFileDots size={18} style={{ color: 'blue' }} />
                <span>Document</span>
              </Group>
              <span>{actionIcon('3')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              <Group>
                <p
                  style={{
                    border: `1px solid skyblue`,
                    borderRadius: '5px',
                    padding: '10px',
                  }}
                >
                  <span style={styles.previewKey}>Document Type:</span>{' '}
                  {onboardingData.document_type}
                </p>
                <p>
                  <span style={styles.previewKey}>File:</span>{' '}
                  {documentFilePreview ? (
                    <img
                      src={documentFilePreview}
                      alt="document preview"
                      style={{
                        width: '80px',
                        height: '80px',
                        marginLeft: '8px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    documentFile
                  )}
                </p>
              </Group>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Review
