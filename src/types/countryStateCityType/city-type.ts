import { z } from 'zod'

// City List Data
const zCity = z.object({
  id: z.number(),
  name: z.string(),
})

// City zod types define
type TCity = z.infer<typeof zCity>

// City T - interface define
interface TCityFindAll {
  data: TCity[]
}

interface TCityCreateResponse {
  data: TCity
}

interface TCityFindById {
  data: TCity
  //   message: string
  //   ok: boolean
}

// export types

export type { TCity, TCityFindAll, TCityFindById, TCityCreateResponse }
