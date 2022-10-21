import { z } from 'zod'

// Submission Validation
const zRecruiters = z.object({
  fname: z.string(),
  lname: z.string(),
  email: z.string(),
  phone: z.string(),
  skills: z.string(),
  dob: z.string(),
  gender: z.string(),
  ethnic_origin: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  zip: z.string(),
  uuid: z.string(),
})

// submission zod types define
type TRecruiters = z.infer<typeof zRecruiters>

// Active submission (T) interface define
interface TRecruitersFindAll {
  data: TRecruiters[]
}

interface TRecruitersFindById {
  data: TRecruiters[]
  ok: boolean
  message: string
}

interface IFindRecruitersByJobId {
  data: TRecruiters[]
  ok: boolean
  message: string
}

// export types
export type {
  TRecruiters,
  TRecruitersFindAll,
  TRecruitersFindById,
  IFindRecruitersByJobId,
}
