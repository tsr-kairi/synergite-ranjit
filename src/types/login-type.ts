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

// "id": 3,
// "uuid": "1FCA9FD8:629E:9C70:F1DA:96798DC535A30517FF8302D32D6114FC524F6CEC5",
// "manager_id": null,
// "first_name": "raghav",
// "last_name": "rag",
// "email_id": "raghava@gmail.com",
// "dob": null,
// "address_line1": "Hitech City",
// "address_line2": "",
// "city": "HYD",
// "county": "",
// "state": "IL",
// "zip": 12345,
// "country": "USA",
// "fax": "342344",
// "primary_phone": "9876543210",
// "secondary_phone": "",
// "aor": "",
// "employee_type": "Contract",
// "version": 9,
// "employee_profile": "",
// "commission_scale": "",
// "login": "raghava@gmail.com",
// "password": "$2a$10$Jv6eFE7SxLPl5YaiFXZDMerjGfhfsQ5FoinwpAFWO2caMAVQu10N2",
// "languages_preferred": "English",
// "gender": "M",
// "created_date": "2022-08-31 16:29:49",
// "created_by": 123,
// "modified_date": "2022-09-03 10:38:33",
// "modified_by": 1234,
// "status": "Y",
// "department": "",
// "billable": "Yes",
// "candidate_id": null,
// "reset_token": "919da319-4e52-4c32-b26f-77a358e5618f"
