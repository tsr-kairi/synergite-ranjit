import { z } from 'zod'

// Submission Validation
const zProject = z.object({
  uuid: z.string(),
  project_name: z.string(),
  project_id: z.string(),
  is_active_status: z.string(),
  project_mgr: z.string(),
})

const zProjectCreate = z.object({
  project_name: z.string(),
  project_id: z.string(),
  is_active_status: z.string(),
  project_mgr: z.string(),
})

// submission zod types define
type TProjectCreate = z.infer<typeof zProjectCreate>
type TProject = z.infer<typeof zProject>

// Active submission (T) interface define
interface TProjectFindAll {
  data: TProject[]
}

interface TProjectFindById {
  data: TProject[]
  ok: boolean
  message: string
}

interface IFindProjectByJobId {
  data: TProject[]
  ok: boolean
  message: string
}

// export types
export type {
  TProject,
  TProjectCreate,
  TProjectFindAll,
  TProjectFindById,
  IFindProjectByJobId,
}

export { zProjectCreate }
