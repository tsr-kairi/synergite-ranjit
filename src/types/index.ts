import { z } from 'zod'

// Client List Data
// Validation
const zClient = z.object({
  id: z.number(),
  profile_image: z.string().url(),
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

// extend array of objects
const zClientDetails = zClient.extend({
  contacts: z.array(zContacts),
  jobs: z.array(zJobs),
})

type TClientDetails = z.infer<typeof zClientDetails>
type TClient = z.infer<typeof zClient>
type TJobs = z.infer<typeof zJobs>
type TContacts = z.infer<typeof zContacts>

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

interface TContactsFindAll {
  data: TContacts[]
}

interface TJobsFindAll {
  data: TJobs[]
}

interface TClientFindById {
  data: TClient
}


export type {
  TClient,
  TClientDetails,
  TContacts,
  TJobs,
  TClientFindAll,
  TContactsFindAll,
  TVendor,
  TJobsFindAll,
  TClientFindById,
}
