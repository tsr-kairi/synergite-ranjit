import { employeeQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteEmployeeById = async (id: number): Promise<void> => {
  await apiClient.delete(`/employees/${id}`)
}

const useDeleteEmployeeById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => deleteEmployeeById(id), {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
      console.log('Delete Employee Called')
    },
  })
}

export default useDeleteEmployeeById
