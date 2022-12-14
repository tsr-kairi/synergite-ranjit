import { projectAllocationKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
// import { TAEmployeeFindAll } from '@/types/employee-type'
import { TProjectAllocationFindAll } from '@/types/project-allocation-type'
import { useQuery } from 'react-query'

const findAlProjectAllocation = async () => {
  const response = await axiosPrivate.get<TProjectAllocationFindAll>(
    `/project-allocation`
  )
  return response.data
}

const useGetAllProjectAllocation = () => {
  return useQuery<TProjectAllocationFindAll, Error>(
    projectAllocationKeys.allProjectAllocation,
    findAlProjectAllocation
  )
}

export default useGetAllProjectAllocation
