import { projectAllocationKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import {
  TProjectAllocationCreate,
  TProjectAllocationFindById,
} from '@/types/project-allocation-type'
import { useMutation, useQueryClient } from 'react-query'

const findProjectAllocation = async (
  projectAllocation: TProjectAllocationCreate
): Promise<TProjectAllocationFindById> => {
  return await axiosPrivate.post('/project-allocation', projectAllocation)
}

const useCreateProjectAllocation = () => {
  const queryClient = useQueryClient()

  return useMutation(findProjectAllocation, {
    onSuccess: () => {
      void queryClient.resetQueries(projectAllocationKeys.allProjectAllocation)
    },
  })
}

export default useCreateProjectAllocation
