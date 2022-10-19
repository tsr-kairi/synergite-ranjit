import { candidateQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
// import { TAEmployeeFindAll } from '@/types/employee-type'
import { TCandidateFindAll } from '@/types/candidate-type'
import { useQuery } from 'react-query'

const findAlCandidate = async () => {
  const response = await axiosPrivate.get<TCandidateFindAll>(
    `/candidate?active=true`
  )
  return response.data
}

const useGetAllCandidate = () => {
  return useQuery<TCandidateFindAll, Error>(
    candidateQueryKeys.allCandidate,
    findAlCandidate
  )
}

export default useGetAllCandidate
