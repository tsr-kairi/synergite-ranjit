import { z } from 'zod'

// Submission Validation
const zSubmission = z.object({
  uuid: z.string(),
  submission_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),

  // new field Nov
  job_title: z.string(),
  candidate_location: z.string(),
  // client: z.string(),
  employment_type: z.string(),
  pay_rate: z.string(),
  pay_type: z.string(),
  bill_type: z.string(),
  bill_rate: z.string(),
  submitted_by: z.string(),
  submitted_date: z.string(),
  ssn: z.string(),
  dob: z.string(),
  passport_no: z.string(),
  linkedin_url: z.string(),
  currently_working_with_employer: z.string(),
  company_name: z.string(),
  employer_name: z.string(),
  employer_phone_no: z.string(),
  employer_email_id: z.string(),
  employer_fax_no: z.string(),
  immigration_status: z.string(),

  state: z.string(),
  status: z.string(),
  remarks: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
  recruitment_mgr_id: z.string(),
  acct_mgr_id: z.string(),
  job_id: z.string(),
  job_uuid: z.string(),
  client_id: z.string(),
  client_uuid: z.string(),
  employee_id: z.string(),
  employee_uuid: z.string(),
  emp_first_name: z.string().optional(),
  emp_last_name: z.string().optional(),
  vendor_id: z.string(),
  vendor_uuid: z.string(),
  vendor_first_name: z.string().optional(),
  vendor_last_name: z.string().optional(),
})

// new Submission crate
const zSubmissionCreate = z.object({
  first_name: z.string(),
  last_name: z.string(),

  // new field Nov

  // job_title: z.string(),
  // candidate_location: z.string(),

  // TODO country: z.string(),
  // TODO state: z.string(),
  // TODO city: z.string(),

  // client: z.string(),
  employment_type: z.string(),
  pay_rate: z.string(),
  pay_type: z.string(),
  bill_type: z.string(),
  bill_rate: z.string(),
  submitted_by: z.string(),
  submitted_date: z.string(),
  ssn: z.string(),
  // dob: z.string(),
  passport_no: z.string(),
  linkedin_url: z.string(),
  currently_working_with_employer: z.string(),
  company_name: z.string(),
  employer_name: z.string(),
  employer_phone_no: z.string(),
  employer_email_id: z.string(),
  employer_fax_no: z.string(),
  immigration_status: z.string(),

  recruitment_mgr_id: z.string(),
  acct_mgr_id: z.string(),

  status: z.string(),
  remarks: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
})

// Submission update
const zSubmissionEdit = z.object({
  first_name: z.string(),
  last_name: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  status: z.string(),
  remarks: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
})

// submission zod types define
type TSubmission = z.infer<typeof zSubmission>
type TSubmissionCreate = z.infer<typeof zSubmissionCreate>

// Active submission (T) interface define
interface TSubmissionFindAll {
  data: TSubmission[]
}

interface TSubmissionFindById {
  data: TSubmission[]
  ok: boolean
  message: string
}

interface IFindSubmissionByJobId {
  data: TSubmission[]
  ok: boolean
  message: string
}

// export types
export type {
  TSubmission,
  TSubmissionFindAll,
  TSubmissionFindById,
  TSubmissionCreate,
  IFindSubmissionByJobId,
}

// export ZOD submission
export { zSubmissionEdit, zSubmissionCreate }
