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

// new client add
const zClientCreate = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  state: z.string(),
})

// client edit
const zClientEdit = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  state: z.string(),
})

// client contacts
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

// new create contact

const zContactCreate = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  country: z.string(),
})

// contacts edit

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

// Job edit - edit job
const zJobEdit = z.object({
  job_name: z.string().min(3, { message: 'J_N should have 3 letters' }),
  location: z.string(),
  category: z.string(),
  job_status: z.string(),
})

// extend array of objects client
const zClientDetails = zClient.extend({
  contacts: z.array(zContacts),
  jobs: z.array(zJobs),
})

// clients zod types define
type TClientDetails = z.infer<typeof zClientDetails>
type TClient = z.infer<typeof zClient>
type TJobs = z.infer<typeof zJobs>
type TContacts = z.infer<typeof zContacts>
type TClientCreate = z.infer<typeof zClientCreate>
type TContactCreate = z.infer<typeof zContactCreate>
type TContactEdit = z.infer<typeof zContactEdit>
type TJobCreate = z.infer<typeof zJobCreate>
type TJobEdit = z.infer<typeof zJobEdit>

// client interface define
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

// I - interface define
interface IFindContactsByClientId {
  data: TContacts[]
}

interface IFindJobsByClientId {
  data: TJobs[]
}

// vendor start here

// Vendor List Data
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

// new Vendor add
const zVendorCreate = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  country: z.string(),
})

// vendor edit
const zVendorEdit = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  country: z.string(),
})

// vendor contacts
const zVContacts = z.object({
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

// extend array of objects vendor
const zVendorDetails = zVendor.extend({
  contacts: z.array(zVContacts),
})

// clients zod types define
type TVendorDetails = z.infer<typeof zVendorDetails>
type TVendorCreate = z.infer<typeof zVendorCreate>
type TVendor = z.infer<typeof zVendor>
type TVContacts = z.infer<typeof zVContacts>

// vendor T - interface define
interface TVendorFindAll {
  data: TVendor[]
}

interface TVendorCreateResponse {
  data: TVendor
}

interface TVendorFindById {
  data: TVendor
}

interface IFindContactsByVendorId {
  data: TContacts[]
}

// export types

export type {
  TClient,
  TClientDetails,
  TVendorDetails,
  TContacts,
  TVContacts,
  TJobs,
  TClientFindAll,
  TContactsFindAll,
  TContactsFindById,
  TJobsFindById,
  TVendor,
  TVendorFindAll,
  TJobsFindAll,
  TClientFindById,
  TVendorFindById,
  IFindContactsByClientId,
  IFindContactsByVendorId,
  IFindJobsByClientId,
  TRemoveClientDataById,
  TClientCreateResponse,
  TContactCreateResponse,
  TVendorCreateResponse,
  TJobCreateResponse,
  TClientCreate,
  TVendorCreate,
  TContactCreate,
  TContactEdit,
  TJobCreate,
  TJobEdit,
}

// export ZOD
export {
  zClientCreate,
  zContactCreate,
  zContactEdit,
  zJobCreate,
  zJobEdit,
  zClientEdit,
  // vendor
  zVendorCreate,
  zVendorEdit,
}
