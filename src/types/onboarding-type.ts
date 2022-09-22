import { z } from 'zod'

// Onboarding Validation
const zOnboarding = z.object({
  id: z.number(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),
  employee_type: z.date(),
  immigration_status: z.number(),
  payment_type: z.string(),
  uuid: z.string(),
})
