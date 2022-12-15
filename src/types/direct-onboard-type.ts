import { z } from 'zod'

// DirectOnboard Validation
const zDirectOnboard = z.object({
  client_uuid: z.string(),
  employee_uuid: z.string(),
  vendor_uuid: z.string(),
  employment_type: z.string(),
  uuid: z.string().optional(),
})

const zDirectOnboardCreate = z.object({
  client_uuid: z.string(),
  employee_uuid: z.string(),
  vendor_uuid: z.string(),
  employment_type: z.string(),
})

// submission zod types define
type TDirectOnboard = z.infer<typeof zDirectOnboard>
type TDirectOnboardCreate = z.infer<typeof zDirectOnboardCreate>

// Active submission (T) interface define
interface TDirectOnboardFindAll {
  data: TDirectOnboard[]
}

interface TDirectOnboardFindById {
  data: TDirectOnboard
  ok: boolean
  message: string
}

interface IFindDirectOnboardByJobId {
  data: TDirectOnboard[]
  ok: boolean
  message: string
}

// export types
export type {
  TDirectOnboardCreate,
  TDirectOnboard,
  TDirectOnboardFindAll,
  TDirectOnboardFindById,
  IFindDirectOnboardByJobId,
}
