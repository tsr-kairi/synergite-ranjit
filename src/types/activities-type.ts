import { z } from 'zod'

// Activities List Data
const zActivities = z.object({
  uuid: z.string(),
  type: z.string(),
  sub_type: z.string(),
  assigned_by: z.string(),
  assigned_to: z.string(),
  status: z.string(),
  sub_status: z.string(),
  assigned_date: z.date(),
  due_date: z.date(),
  priority: z.string(),
  team: z.string(),
  account: z.string(),
  contact_person: z.string(),
})

// create Activities
const zActivitiesCreate = z.object({
  type: z.string(),
  sub_type: z.string(),
  assigned_by: z.string(),
  assigned_to: z.string(),
  status: z.string(),
  sub_status: z.string(),
  assigned_date: z.date(),
  due_date: z.date(),
  priority: z.string(),
  team: z.string(),
  account: z.string(),
  contact_person: z.string(),
})

// Activities zod types define
type TActivitiesCreate = z.infer<typeof zActivitiesCreate>
type TActivities = z.infer<typeof zActivities>

// Activities T - interface define
interface TActivitiesFindAll {
  data: TActivities[]
}

interface TActivitiesCreateResponse {
  data: TActivities
}

interface TActivitiesFindById {
  data: TActivities
  message: string
  ok: boolean
}

// export types

export type {
  TActivities,
  TActivitiesFindAll,
  TActivitiesFindById,
  TActivitiesCreateResponse,
  TActivitiesCreate,
}

// export ZOD
export { zActivitiesCreate }
