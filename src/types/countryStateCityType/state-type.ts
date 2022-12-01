import { z } from 'zod'

// State List Data
const zState = z.object({
  id: z.number(),
  name: z.string(),
  iso2: z.string(),
})

// State zod types define
type TState = z.infer<typeof zState>

// State T - interface define
interface TStateFindAll {
  data: TState[]
}

interface TStateFindById {
  data: TState[]
}

// export types

export type { TState, TStateFindAll, TStateFindById }
