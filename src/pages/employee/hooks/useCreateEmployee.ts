import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TAEmployeeCreate, TAEmployeeFindById } from '@/types/employee-type'
import { useMutation, useQueryClient } from 'react-query'

const createEmployee = async (
  employee: TAEmployeeCreate
): Promise<TAEmployeeFindById> => {
  return await axiosPrivate.post('/employee/save', employee)
}

const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation(createEmployee, {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
      console.log('Create Employee Called')
    },
  })
}

export default useCreateEmployee
