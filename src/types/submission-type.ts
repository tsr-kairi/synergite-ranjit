import { z } from 'zod'

// Submission Validation
const zSubmission = z.object({
  id: z.number(),
  profile_image: z.string().url(),
  submission_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  client: z.string(),
  submission_status: z.string(),
  remarks: z.string(),
  pay_rate: z.string(),
  city: z.string(),
  state: z.string(),
  submitted_date: z.string(),
  submitted_by: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
  recruitment_manager: z.string(),
  account_manager: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// new Submission crate
const zSubmissionCreate = z.object({
  submission_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  client: z.string(),
  submission_status: z.string(),
  remarks: z.string(),
  pay_rate: z.string(),
  city: z.string(),
  state: z.string(),
  submitted_date: z.string(),
  submitted_by: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
  recruitment_manager: z.string(),
  account_manager: z.string(),
})

// Submission update
const zSubmissionEdit = z.object({
  submission_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  client: z.string(),
  submission_status: z.string(),
  remarks: z.string(),
  pay_rate: z.string(),
  city: z.string(),
  state: z.string(),
  submitted_date: z.string(),
  submitted_by: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
  recruitment_manager: z.string(),
  account_manager: z.string(),
})

// submission zod types define
type TSubmission = z.infer<typeof zSubmission>
type TSubmissionCreate = z.infer<typeof zSubmissionCreate>

// Active submission (T) interface define
interface TSubmissionFindAll {
  data: TSubmission[]
}

interface TSubmissionFindById {
  data: TSubmission
}

interface IFindSubmissionByJobId {
  data: TSubmission[]
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
