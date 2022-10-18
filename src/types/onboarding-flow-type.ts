import { z } from 'zod'

// ? onboarding zod type = Main
// employees: [{ name: '', active: false, key: randomId() }]

const zDocument = z.object({
  document_type: z.string(),
  choose_file: z.string(),
  key: z.string(),
})
// onboarding flow - Onboarding Validation
const zOnboarding = z.object({
  uuid: z.string(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),

  // Profile
  start_date: z.date(),
  end_date: z.date(),
  work_state: z.string(),
  client_location: z.string(), // Dropdown
  experience: z.string(),
  department: z.string(), // Dropdown
  reporting_to: z.string(), // Dropdown
  designation: z.string(),
  overtime_exemption: z.string(), // Dropdown

  // Job
  name_of_recruiter: z.string(),
  contact_number_of_recruiter: z.string(),
  bill_rate: z.string(),
  pay_rate: z.string(),
  payment_frequency: z.string(), // Dropdown
  account_manager_commission: z.string(),
  recruitment_manager_commission: z.string(),
  recruitment_commission: z.string(),
  additional_information: z.string(),
  additional_commission: z.string(),
  remarks: z.string(),
  vendor: z.string(), // Dropdown

  // Immigration
  processing_type: z.string(), // Dropdown
  who_is_going_to_pay_premium: z.string(),
  immigration_job_title: z.string(),
  current_h1b_validity: z.string(),
  current_lac_number: z.string(),

  // Document
  documents: z.array(zDocument),
})

interface TOnboardingFindById {
  data: TOnboarding[]
  ok: boolean
  message: string
}

// onboarding flow Onboarding zod types define
type TOnboarding = z.infer<typeof zOnboarding>

// export types
export type { TOnboarding, TOnboardingFindById }
