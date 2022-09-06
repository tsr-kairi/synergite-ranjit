import { employeeQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TAEmployeeFindAll } from '@/types/employee-type'
import { useQuery } from 'react-query'

const findAlEmployees = async () => {
  const response = await apiClient.get<TAEmployeeFindAll>('/employees')
  return response.data
}

const useGetAllEmployees = () => {
  return useQuery<TAEmployeeFindAll, Error>(
    employeeQueryKeys.allEmployee,
    findAlEmployees,
    {
      onSuccess: () => console.log('GetAllEmployees On Success Called'),
    }
  )
}

export default useGetAllEmployees
