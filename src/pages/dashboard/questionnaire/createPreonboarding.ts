import { preonboardQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import {
  TPreonboardFindById,
  TPreonboardCreate,
} from '@/types/prebonboard-type'
import { useMutation, useQueryClient } from 'react-query'

// interface TPreonboardCreate {
//   client_uuid: string
//   employee_uuid: string
//   vendor_uuid: string
// }
const createPreonboard = async (
  data: TPreonboardCreate
): Promise<TPreonboardFindById> => {
  console.log(data)

  return await axiosPrivate.post(`/onboarding/preonboard`, data)
}

const useCreatePreonboard = () => {
  const queryClient = useQueryClient()

  return useMutation(createPreonboard, {
    onSuccess: () => {
      void queryClient.resetQueries(preonboardQueryKeys.createSub)
    },
  })
}

export default useCreatePreonboard
