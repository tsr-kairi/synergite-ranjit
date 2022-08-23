import { z } from 'zod'

// Validation
const zTutorial = z.object({
  id: z.any().optional(),
  avatar: z.string(),
  name: z.string(),
  email: z.string().email(),
  city: z.string(),
  state: z.string(),
  edit: z.string(),
  delete: z.string(),
  published: z.boolean().default(false),
})

// Type Definition
type IRowClientData = z.infer<typeof zTutorial>

export type { IRowClientData }

// export interface IRowClientData {
//   id: number
//   avatar?: string
//   name: string
//   email: string
//   city: string
//   state: string
//   edit?: string
//   delete?: string
// }

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
