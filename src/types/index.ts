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
  status: z.string(), 
  date_created: z.string(),
  date_updated: z.string(),
  user_created: z.string(),
  user_updated: z.string(),
  uuid: z.string(),
})

// id: 4
// profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813'
// first_name: 'Athena'
// last_name: 'Weissnat'
// email: 'Elouise.Prohaska@yahoo.com'
// phone: '+1 3895 403 645'
// city: 'Little - Rippin'
// state: 'Misouri'
// status: 'published'
// sort: null
// date_created: '2022-08-26T10:22:44.260Z'
// date_updated: '2022-08-26T10:25:58.189Z'
// user_created: '6861bfe4-96ea-4b91-9a5c-a469ff1c143d'
// user_updated: '6861bfe4-96ea-4b91-9a5c-a469ff1c143d'
// uuid: 'fd1bbbf0-9118-4369-b69d-37825ce0bd5e'

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
