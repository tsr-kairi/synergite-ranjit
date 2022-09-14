import { z } from 'zod'

const zLoginValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
})

interface user {
  id: number
  first_name: string
  last_name: string
  email_id: string
}

export { zLoginValidation, user }

// "first_name": "testclient2",
// "last_name": "testclient2",
// "address_line1": "Hitech City",
// "address_line2": "",
// "city": "HYD",
// "county": null,
// "state": "IL",
// "zip": 12345,
// "country": "USA",
// "fax": "342344",
// "primary_email": "raghava@gmail.com",
// "primary_phone": "9876543678",
// "primary_phone_ext": null,
// "secondary_email": null,
// "secondary_phone": null,
// "secondary_phone_ext": null,
// "primary_contact": null,
// "created_date": "2022-09-12 10:49:35",
// "created_by": 123,
// "modified_date": null,
// "modified_by": null,
// "status": "Y",
// "version": 1
