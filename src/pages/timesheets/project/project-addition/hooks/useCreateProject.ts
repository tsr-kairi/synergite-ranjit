import { projectQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TProjectCreate, TProjectFindById } from '@/types/project-type'
import { useMutation, useQueryClient } from 'react-query'

const createProject = async (
  employee: TProjectCreate
): Promise<TProjectFindById> => {
  return await axiosPrivate.post('/project', employee)
}

const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation(createProject, {
    onSuccess: () => {
      void queryClient.resetQueries(projectQueryKeys.allProject)
    },
  })
}

export default useCreateProject
