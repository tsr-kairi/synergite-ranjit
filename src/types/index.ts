import { z } from 'zod'

// Client List Data
// Validation
const zClient = z.object({
  id: z.number(),
  profile_image: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  state: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// new client add types

const zClientCreate = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  state: z.string(),
})

// new client edit types
const zClientEdit = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  state: z.string(),
})

// client list with contacts
const zContacts = z.object({
  id: z.number(),
  profile_image: z.string().url(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  country: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// new create contact add types

const zContactCreate = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  country: z.string(),
})

// new create contact add types

const zContactEdit = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  country: z.string(),
})

// client list with jobs
const zJobs = z.object({
  id: z.number(),
  job_name: z.string(),
  location: z.string(),
  category: z.string(),
  job_status: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// Job create - new job
const zJobCreate = z.object({
  job_name: z.string().min(3, { message: 'J_N should have 3 letters' }),
  location: z.string(),
  category: z.string(),
  job_status: z.string(),
})

const zJobEdit = z.object({
  job_name: z.string().min(3, { message: 'J_N should have 3 letters' }),
  location: z.string(),
  category: z.string(),
  job_status: z.string(),
})

// extend array of objects
const zClientDetails = zClient.extend({
  contacts: z.array(zContacts),
  jobs: z.array(zJobs),
})

type TClientDetails = z.infer<typeof zClientDetails>
type TClient = z.infer<typeof zClient>
type TJobs = z.infer<typeof zJobs>
type TContacts = z.infer<typeof zContacts>
type TClientCreate = z.infer<typeof zClientCreate>
type TContactCreate = z.infer<typeof zContactCreate>
type TContactEdit = z.infer<typeof zContactEdit>
type TJobCreate = z.infer<typeof zJobCreate>
type TJobEdit = z.infer<typeof zJobEdit>

// Vendor Table Data
const zVendor = z.object({
  id: z.number(),
  profile_image: z.string().url(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  country: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

type TVendor = z.infer<typeof zVendor>

interface TClientFindAll {
  data: TClient[]
}

interface TClientCreateResponse {
  data: TClient
}

interface TContactCreateResponse {
  data: TContacts
}

interface TJobCreateResponse {
  data: TJobs
}
interface TRemoveClientDataById {
  data: TClient
}
interface IVendorFindAll {
  data: TVendor[]
}

interface TContactsFindAll {
  data: TContacts[]
}

interface TContactsFindById {
  data: TContacts[]
}

interface TJobsFindAll {
  data: TJobs[]
}

interface TJobsFindById {
  data: TJobs[]
}

interface TClientFindById {
  data: TClient
}

// interface TClientEditById {
//   data: TClient
// }

interface IFindContactsByClientId {
  data: TContacts[]
}

interface IFindJobsByClientId {
  data: TJobs[]
}

export type {
  TClient,
  TClientDetails,
  TContacts,
  TJobs,
  TClientFindAll,
  TContactsFindAll,
  TContactsFindById,
  TJobsFindById,
  TVendor,
  IVendorFindAll,
  TJobsFindAll,
  TClientFindById,
  // TClientEditById,
  IFindContactsByClientId,
  IFindJobsByClientId,
  TRemoveClientDataById,
  TClientCreateResponse,
  TContactCreateResponse,
  TJobCreateResponse,
  TClientCreate,
  TContactCreate,
  TContactEdit,
  TJobCreate,
  TJobEdit,
}

export {
  zClientCreate,
  zContactCreate,
  zContactEdit,
  zJobCreate,
  zJobEdit,
  zClientEdit,
}
