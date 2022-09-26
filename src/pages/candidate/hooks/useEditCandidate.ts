import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TAEmployee, TAEmployeeFindById } from '@/types/employee-type'
import { useMutation, useQueryClient } from 'react-query'

// const editEmployee = async (data: TAEmployee): Promise<TAEmployeeFindById> => {
//   return await apiClient.patch(`/employees/${data.id}`, data)
// }
const editCandidate = async (data: TAEmployee): Promise<TAEmployeeFindById> => {
  return await axiosPrivate.post(`/employee/save`, data)
}
// const editCandidate = async (
//   employee: TAEmployee
// ): Promise<TAEmployeeFindById> => {
//   return await axiosPrivate.patch('/employee/save', employee)
// }

const useEditCandidate = () => {
  const queryClient = useQueryClient()

  return useMutation(editCandidate, {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
    },
  })
}

export default useEditCandidate
