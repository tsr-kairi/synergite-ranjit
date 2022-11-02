import { z } from 'zod'

// Active Candidate List Data
// Validation
const zCandidate = z.object({
  candidate_id: z.string(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  address1: z.string(),
  address2: z.string(),
  ssn_no: z.string(),
  dob: z.string(),
  gender: z.string(),
  ethnic_origin: z.string(),
  zip: z.string(),

  // new added field
  candidate_ownership_uuid: z.string(),
  candidate_status: z.string(),
  current_employer_name: z.string(),
  current_rate: z.string(), //
  current_rate_type: z.string(), //
  degree: z.string(),
  employment_type: z.string(),
  expected_rate_type: z.string(), //
  github_url: z.string(),
  linkedin_url: z.string(),
  immigration_status: z.string(),
  institution: z.string(),
  language_known: z.string(),
  marital_status: z.string(),
  payment_type: z.string(),
  profile_summary: z.string(),
  salary_expectation: z.string(),
  security_clearance: z.string(),
  skills: z.string(),
  source: z.string(),
  willing_to_reallocate: z.string(),
  work_experience: z.string(),
  uuid: z.string(),
})

// new Active Candidate add and validation
const zCandidateCreate = z.object({
  candidate_id: z.string(),
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  middle_name: z.string(),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  ssn_no: z.string(),
  dob: z.string(),
  gender: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  ethnic_origin: z.string(),
  zip: z.string(),

  // new added field
  candidate_ownership_uuid: z.string(),
  candidate_status: z.string(),
  current_employer_name: z.string(),
  current_rate: z.string(), //
  current_rate_type: z.string(), //
  degree: z.string(),
  employment_type: z.string(),
  expected_rate_type: z.string(), //
  github_url: z.string(),
  linkedin_url: z.string(),
  immigration_status: z.string(),
  institution: z.string(),
  language_known: z.string(),
  marital_status: z.string(),
  payment_type: z.string(),
  profile_summary: z.string(),
  salary_expectation: z.string(),
  security_clearance: z.boolean(),
  skills: z.string(),
  source: z.string(),
  willing_to_reallocate: z.boolean(),
  work_experience: z.string(),
})

// Active Candidate zod types define
type TCandidate = z.infer<typeof zCandidate>
type TCandidateCreate = z.infer<typeof zCandidateCreate>

// Active Candidate (T) interface define
interface TCandidateFindAll {
  data: TCandidate[]
}

interface TCandidateFindById {
  data: TCandidate
  message: string
  ok: boolean
}

// Active Candidate export (T) Types
export type {
  TCandidate,
  TCandidateFindAll,
  TCandidateFindById,
  TCandidateCreate,
}

// Active Candidate export ZOD
export { zCandidateCreate }
