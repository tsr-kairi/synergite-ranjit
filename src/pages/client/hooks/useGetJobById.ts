import { clientQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TJobsFindById } from '@/types'
import { useQuery } from 'react-query'

const findJobById = async (id: number) => {
  const response = await apiClient.get<TJobsFindById>(`/jobs/${id}`)
  return response.data
}

const useGetJobById = (id: number) => {
  return useQuery<TJobsFindById, Error>(
    [clientQueryKeys.jobDetails, id],
    async () => await findJobById(id),
    {
      onSuccess: () => console.log('GetAllJobById On Success Called'),
    }
  )
}

export default useGetJobById
