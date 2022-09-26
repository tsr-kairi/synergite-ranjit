import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TAEmployeeCreate, TAEmployeeFindById } from '@/types/employee-type'
import { useMutation, useQueryClient } from 'react-query'

const createCandidate = async (
  employee: TAEmployeeCreate
): Promise<TAEmployeeFindById> => {
  return await axiosPrivate.post('/employee/save', employee)
}

const useCreateCandidate = () => {
  const queryClient = useQueryClient()

  return useMutation(createCandidate, {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
    },
  })
}

export default useCreateCandidate
