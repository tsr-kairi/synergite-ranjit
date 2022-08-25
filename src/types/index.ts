import { z } from 'zod'

// Client List Data
// Validation
const zClient = z.object({
  id: z.number(),
  avatar: z.string(),
  name: z.string(),
  email: z.string().email(),
  city: z.string(),
  state: z.string(),
})

// client list with contacts
const zContacts = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  country: z.string(),
})

// client list with jobs
const zJobs = z.object({
  name: z.string(),
  location: z.string().email(),
  category: z.string(),
  status: z.string(),
})
// extend array of objects
const zClientDetails = zClient.extend({
  contacts: z.array(zContacts),
  jobs: z.array(zJobs),
})

type TClientDetails = z.infer<typeof zClientDetails>
type TClientList = z.infer<typeof zClient>
type TJobs = z.infer<typeof zJobs>
type TContacts = z.infer<typeof zContacts>

// Vendor Table Data
export interface IRowVendorData {
  id: number
  avatar: string
  name: string
  email: string
  city: string
  state: string
  edit: string
  delete: string
}

export type { TClientList, TClientDetails, TContacts, TJobs }
