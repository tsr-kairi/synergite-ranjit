import { projectAllocationKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import {
  TProjectAllocation,
  TProjectAllocationFindById,
} from '@/types/project-allocation-type'
import { useMutation, useQueryClient } from 'react-query'

const editProjectAllocation = async (
  data: TProjectAllocation
): Promise<TProjectAllocationFindById> => {
  return await axiosPrivate.patch(`/project-allocation/${data?.uuid}`, data)
}

const useEditProjectAllocation = () => {
  const queryClient = useQueryClient()

  return useMutation(editProjectAllocation, {
    onSuccess: () => {
      void queryClient.resetQueries(projectAllocationKeys.allProjectAllocation)
    },
  })
}

export default useEditProjectAllocation
