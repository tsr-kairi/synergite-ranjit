import { employeeQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TAEmployeeFindById } from '@/types/employee-type'
import { useQuery } from 'react-query'

const findEmployeeById = async (id: number) => {
  const response = await apiClient.get<TAEmployeeFindById>(`/employees/${id}`)
  return response.data
}

const useGetEmployeeById = (id: number) => {
  return useQuery<TAEmployeeFindById, Error>(
    [employeeQueryKeys.employeeDetails, id],
    async () => await findEmployeeById(id),
    {
      onSuccess: () => console.log('GetAllEmployeeById On Success Called'),
    }
  )
}

export default useGetEmployeeById
