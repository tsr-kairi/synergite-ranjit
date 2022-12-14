import { z } from 'zod'

// Submission Validation
const zProjectAllocation = z.object({
  uuid: z.string(),
  user_id: z.string(),
  project_id: z.string(),
  is_active_status: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  project_mgr: z.string(),
})

const zProjectAllocationCreate = z.object({
  user_id: z.string(),
  project_id: z.string(),
  is_active_status: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  project_mgr: z.string(),
})

// submission zod types define
type TProjectAllocationCreate = z.infer<typeof zProjectAllocationCreate>
type TProjectAllocation = z.infer<typeof zProjectAllocation>

// Active submission (T) interface define
interface TProjectAllocationFindAll {
  data: TProjectAllocation[]
}

interface TProjectAllocationFindById {
  data: TProjectAllocation[]
  ok: boolean
  message: string
}

interface IFindProjectAllocationByJobId {
  data: TProjectAllocation[]
  ok: boolean
  message: string
}

// export types
export type {
  TProjectAllocation,
  TProjectAllocationCreate,
  TProjectAllocationFindAll,
  TProjectAllocationFindById,
  IFindProjectAllocationByJobId,
}

export { zProjectAllocationCreate }
