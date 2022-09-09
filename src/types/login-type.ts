import { z } from 'zod'

const zLoginValidation = z.object({
  userId: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
})

export { zLoginValidation }
