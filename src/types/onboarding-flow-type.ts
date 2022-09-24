import { z } from 'zod'

//  ? Profile zod type = 01

// onboarding flow - profile Validation
const zProfile = z.object({
  id: z.number(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),
  start_date: z.date(),
  end_date: z.date(),
  work_state: z.string(),
  client_location: z.string(), // Dropdown
  experience: z.string(),
  department: z.string(), // Dropdown
  reporting_to: z.string(), // Dropdown
  designation: z.string(),
  overtime_exemption: z.string(), // Dropdown
  remarks: z.string(),

  uuid: z.string(),
})

// onboarding flow profile zod types define
type TProfile = z.infer<typeof zProfile>

// export types
export type { TProfile }

// ? Account zod type = 02

// onboarding flow - Account Validation
const zAccount = z.object({
  id: z.number(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),
  name_of_recruiter: z.string(),
  contact_number_of_recruiter: z.string(),
  bill_rate: z.string(),
  pay_rate: z.string(),
  payment_frequency: z.string(), // Dropdown
  account_manager_commission: z.string(),
  recruitment_manager_commission: z.string(),
  recruitment_commission: z.string(),
  additional_commission: z.string(),
  additional_information: z.string(),
  remarks: z.string(),
  vendor: z.string(), // Dropdown
  uuid: z.string(),
})

// onboarding flow Account zod types define
type TAccount = z.infer<typeof zAccount>

// export types
export type { TAccount }

// ? Immigration zod type = 03

// onboarding flow - Immigration Validation
const zImmigration = z.object({
  id: z.number(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),
  processing_type: z.string(), // Dropdown
  who_is_going_to_pay_premium: z.string(),
  immigration_job_title: z.string(),
  current_h1b_validity: z.string(),
  current_lac_number: z.string(),
  uuid: z.string(),
})

// onboarding flow Immigration zod types define
type TImmigration = z.infer<typeof zImmigration>

// export types
export type { TImmigration }

// ? Documents zod type = 04

// onboarding flow - Documents Validation
const zDocuments = z.object({
  id: z.number(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),
  document_type: z.string(),
  choose_file: z.string(),
  uuid: z.string(),
})

// onboarding flow Documents zod types define
type TDocuments = z.infer<typeof zDocuments>

// export types
export type { TDocuments }

// ? Summary zod type = 05

// onboarding flow - Summary Validation
const zSummary = z.object({
  id: z.number(),
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

  // Account
  name_of_recruiter: z.string(),
  contact_number_of_recruiter: z.string(),
  bill_rate: z.string(),
  pay_rate: z.string(),
  payment_frequency: z.string(), // Dropdown
  account_manager_commission: z.string(),
  recruitment_manager_commission: z.string(),
  recruitment_commission: z.string(),
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
  document_type: z.string(),
  choose_file: z.string(),
  uuid: z.string(),
})

// onboarding flow Summary zod types define
type TSummary = z.infer<typeof zSummary>

// export types
export type { TSummary }
