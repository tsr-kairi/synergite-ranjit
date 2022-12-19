import { projectAllocationKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteProjectAllocationById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/project-allocation/${uuid}`)
}

const useDeleteProjectAllocationById = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (uuid: string) => deleteProjectAllocationById(uuid),
    {
      onSuccess: () => {
        void queryClient.resetQueries(
          projectAllocationKeys.allProjectAllocation
        )
      },
    }
  )
}

export default useDeleteProjectAllocationById
