import { directOnboardQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import {
  TDirectOnboardFindById,
  TDirectOnboardCreate,
} from '@/types/direct-onboard-type'
import { useMutation, useQueryClient } from 'react-query'

const createDirectOnboard = async (
  data: TDirectOnboardCreate
): Promise<TDirectOnboardFindById> => {
  console.log('Direct Onboard Data : ', data)

  return await axiosPrivate.post(`/onboarding/direct-onboarding`, data)
}

const useCreateDirectOnboard = () => {
  const queryClient = useQueryClient()

  return useMutation(createDirectOnboard, {
    onSuccess: () => {
      void queryClient.resetQueries(directOnboardQueryKeys.directOnboard)
    },
  })
}

export default useCreateDirectOnboard
