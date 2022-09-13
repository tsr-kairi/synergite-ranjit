import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TAEmployeeFindAll } from '@/types/employee-type'
import { useQuery } from 'react-query'

const findAlEmployees = async () => {
  const response = await axiosPrivate.get<TAEmployeeFindAll>(
    `/employee/get?page-no=0&page-size=10`
  )
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
