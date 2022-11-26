import { z } from 'zod'

// Preonboard Validation
const zPreonboard = z.object({
  employee_type: z.string().optional(),
  new_client: z.string().optional(),
  immigration_status: z.string().optional(),
  recruiter_name: z.string().optional(),
  department: z.string().optional(),
  job_uuid: z.string().optional(),
  client_uuid: z.string(),
  employee_id: z.string().optional(),
  employee_uuid: z.string(),
  vendor_uuid: z.string(),
  submission_uuid: z.string().optional(),
  vendor_first_name: z.string().optional(),
  vendor_last_name: z.string().optional(),
  uuid: z.string().optional(),
})

const zPreonboardCreate = z.object({
  client_uuid: z.string(),
  employee_uuid: z.string(),
  vendor_uuid: z.string(),
})

// submission zod types define
type TPreonboard = z.infer<typeof zPreonboard>
type TPreonboardCreate = z.infer<typeof zPreonboardCreate>

// Active submission (T) interface define
interface TPreonboardFindAll {
  data: TPreonboard[]
}

interface TPreonboardFindById {
  data: TPreonboard
  ok: boolean
  message: string
}

interface IFindPreonboardByJobId {
  data: TPreonboard[]
  ok: boolean
  message: string
}

// export types
export type {
  TPreonboardCreate,
  TPreonboard,
  TPreonboardFindAll,
  TPreonboardFindById,
  IFindPreonboardByJobId,
}
