import { z } from 'zod'

// Preonboard Validation
const zPreonboard = z.object({
  employee_type: z.string().optional(),
  new_client: z.string().optional(),
  immigration_status: z.string().optional(),
  recruiter_name: z.string().optional(),
  department: z.string().optional(),
  job_uuid: z.string(),
  client_uuid: z.string(),
  employee_id: z.string(),
  employee_uuid: z.string(),
  vendor_uuid: z.string(),
  submission_uuid: z.string(),
  vendor_first_name: z.string().optional(),
  vendor_last_name: z.string().optional(),
  uuid: z.string().optional(),
})

// submission zod types define
type TPreonboard = z.infer<typeof zPreonboard>

// Active submission (T) interface define
interface TPreonboardFindAll {
  data: TPreonboard[]
}

interface TPreonboardFindById {
  data: TPreonboard[]
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
  TPreonboard,
  TPreonboardFindAll,
  TPreonboardFindById,
  IFindPreonboardByJobId,
}
