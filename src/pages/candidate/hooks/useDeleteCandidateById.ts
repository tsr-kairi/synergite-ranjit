import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteCandidateById = async (uuid: string): Promise<void> => {
  await axiosPrivate.post(`/employee/delete/${uuid}`)
}

const useDeleteCandidateById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteCandidateById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
      console.log('Delete Employee Called')
    },
  })
}

export default useDeleteCandidateById
