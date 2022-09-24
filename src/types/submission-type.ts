import { z } from 'zod'

// Submission Validation
const zSubmission = z.object({
  id: z.number(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),
  delete_date: z.date(),
  client_id: z.number(),
  submission_status: z.string(),
  remarks: z.string(),
  employee_id: z.number(),
  vendor_id: z.number(),
  uuid: z.string(),
})

// new Submission crate
const zSubmissionCreate = z.object({
  submission_status: z.string(),
  remarks: z.string(),
  employee_id: z.number(),
  vendor_id: z.number(),
})

// Submission update
const zSubmissionEdit = z.object({
  submission_status: z.string(),
  remarks: z.string(),
  employee_id: z.string(),
  vendor_id: z.string(),
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

// // "employee_id": 1,
// // "vendor_id": 2,
// // "job_id": 2,
// "start_date": null,
// "end_date": null,
// "employee_type": "Internal",
// "others": "comments",
// "recruitment_mgr_id": null,
// "acct_mgr_id": null,
// "status": "Y",
// "sub_status": null,
