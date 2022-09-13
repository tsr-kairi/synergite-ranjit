import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteEmployeeById = async (uuid: string): Promise<void> => {
  await axiosPrivate.post(`/employee/delete/${uuid}`)
}

const useDeleteEmployeeById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteEmployeeById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
      console.log('Delete Employee Called')
    },
  })
}

export default useDeleteEmployeeById
