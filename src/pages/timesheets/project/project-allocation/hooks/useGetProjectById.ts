import { projectAllocationKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TProjectAllocationFindById } from '@/types/project-allocation-type'
import { useQuery } from 'react-query'

const findProjectAllocationById = async (uuid: string) => {
  const response = await axiosPrivate.get<TProjectAllocationFindById>(
    `/project/${uuid}`
  )
  return response.data
}

const useGetProjectAllocationById = (uuid: string) => {
  return useQuery<TProjectAllocationFindById, Error>(
    [projectAllocationKeys.projectAllocationDetails, uuid],
    async () => await findProjectAllocationById(uuid),
    {
      onSuccess: () =>
        console.log('GetAllTProjectAllocationById On Success Called'),
    }
  )
}

export default useGetProjectAllocationById
