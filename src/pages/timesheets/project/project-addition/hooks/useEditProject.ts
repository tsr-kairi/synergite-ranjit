import { projectQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TProject, TProjectFindById } from '@/types/project-type'
import { useMutation, useQueryClient } from 'react-query'

// const editEmployee = async (data: TProject): Promise<TProjectFindById> => {
//   return await apiClient.patch(`/employees/${data.id}`, data)
// }
const editProject = async (data: TProject): Promise<TProjectFindById> => {
  return await axiosPrivate.patch(`/project/${data?.uuid}`, data)
}
// const editProject = async (
//   employee: TProject
// ): Promise<TProjectFindById> => {
//   return await axiosPrivate.patch('/employee/save', employee)
// }

const useEditProject = () => {
  const queryClient = useQueryClient()

  return useMutation(editProject, {
    onSuccess: () => {
      void queryClient.resetQueries(projectQueryKeys.allProject)
    },
  })
}

export default useEditProject
