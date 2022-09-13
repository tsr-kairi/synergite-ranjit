import { z } from 'zod'

// Active employees List Data
// Validation
const zAEmployee = z.object({
  id: z.number(),
  // profile_image: z.string(),
  employee_id: z.string(),
  fname: z.string(),
  lname: z.string(),
  email: z.string(),
  phone: z.string(),
  ssn_no: z.string(),
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
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// new Active Employees add and validation
const zAEmployeeCreate = z.object({
  employee_id: z.string(),
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  ssn_no: z.string(),
  dob: z.string(),
  gender: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  ethnic_origin: z.string(),
  zip: z.string(),
})

// employee edit
const zEmployeeEdit = z.object({
  employee_id: z.string(),
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  ssn_no: z.string(),
  dob: z.string(),
  gender: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  ethnic_origin: z.string(),
  zip: z.string(),
})

// Active Employees zod types define
type TAEmployee = z.infer<typeof zAEmployee>
type TAEmployeeCreate = z.infer<typeof zAEmployeeCreate>

// Active Employees (T) interface define
interface TAEmployeeFindAll {
  data: TAEmployee[]
}

interface TAEmployeeFindById {
  data: TAEmployee[]
  message: string
  ok: boolean
}

// Active Employees export (T) Types
export type {
  TAEmployee,
  TAEmployeeFindAll,
  TAEmployeeFindById,
  TAEmployeeCreate,
}

// Active Employees export ZOD
export { zAEmployeeCreate, zEmployeeEdit }
//   id |
//   employee_id |
//   profile_image |
//   first_name |
//   last_name |
//   email |
//   phone |
//   ssn |
//   dob |
//   gender |
//   address_line_1 |
//   address_line_2 |
//   city |
//   state |
//   country |
//   ethnic_origin |
//   zip_code |
//   type_of_employee |
//   sde |
//   account |
//   contact |
//   pay_rate |
//   job_title |
//   visa_status |
//   work_state |
//   work_location |
//   client_location |
//   home_location |
//   candidate_status |
//   skills |
//   experience |
//   department |
//   reporting_to |
//   designation
