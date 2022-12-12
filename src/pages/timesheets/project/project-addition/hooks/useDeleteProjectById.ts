import { projectQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteProjectById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/project/${uuid}`)
}

const useDeleteProjectById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteProjectById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(projectQueryKeys.allProject)
    },
  })
}

export default useDeleteProjectById
