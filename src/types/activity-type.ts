import { z } from 'zod'

// Activity List Data
const zActivity = z.object({
  id: z.number(),
  role_uuid: z.string(),
  immigration_status: z.string(),
  employee_type: z.string(),
  new_client: z.string(),
  default_activity: z.string(),
  // assigneeRole: z.string(),
  department_uuid: z.string(),
  new_subvendor: z.string(),
  // isActiveStatus: z.string(),
  createdDate: z.string().optional(),
  modifiedBy: z.string().optional(),
  modifiedDate: z.string().optional(),
  uuid: z.string(),
})

// new Activity add
const zActivityCreate = z.object({
  immigration_status: z.string(),
  employee_type: z.string(),
  new_client: z.string(),
  default_activity: z.string(),
  // assigneeRole: z.string(),
  new_subvendor: z.string(),
  department_uuid: z.string(),
})

// Activity edit
const zActivityEdit = z.object({
  immigration_status: z.string(),
  employee_type: z.string(),
  new_client: z.string(),
  default_activity: z.string(),
  // assigneeRole: z.string(),
  department_uuid: z.string(),
  new_subvendor: z.string(),
})

// Activity contacts
const zTask = z.object({
  id: z.number(),
  fname: z.string(),
  lname: z.string(),
  email1: z.string().email(),
  phone1: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  zip: z.string(),
  country: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

const zTaskCreate = z.object({
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email1: z.string().email({ message: 'Invalid email address' }),
  phone1: z.string().min(10, { message: 'Phone Number should have 10' }),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  zip: z.string(),
})

// contacts edit

const zTaskEdit = z.object({
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email1: z.string().email({ message: 'Invalid email address' }),
  phone1: z.string().min(10, { message: 'Phone Number should have 10' }),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  zip: z.string(),
  uuid: z.string(),
  id: z.number(),
})

// extend array of objects Activity
const zActivityDetails = zActivity.extend({
  contacts: z.array(zTask),
})

// clients zod types define
type TActivityDetails = z.infer<typeof zActivityDetails>
type TActivityCreate = z.infer<typeof zActivityCreate>
type TActivity = z.infer<typeof zActivity>
type TTasks = z.infer<typeof zTask>
type TTaskCreate = z.infer<typeof zTaskCreate>
type TTaskEdit = z.infer<typeof zTaskEdit>

// Activity T - interface define
interface TActivityFindAll {
  data: TActivity[]
}

interface TActivityCreateResponse {
  data: TActivity
}

interface TActivityFindById {
  data: TActivity[]
  message: string
  ok: boolean
}

interface IFindTasksByActivityId {
  data: TTasks[]
  ok: boolean
  message: string
}

// export types

export type {
  TActivityDetails,
  TActivity,
  TActivityFindAll,
  TActivityFindById,
  IFindTasksByActivityId,
  TActivityCreateResponse,
  TActivityCreate,
  TTasks,
  TTaskCreate,
  TTaskEdit,
}

// export ZOD
export { zActivityCreate, zActivityEdit, zTaskCreate, zTaskEdit }
