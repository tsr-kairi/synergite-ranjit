import { projectQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TProjectFindById } from '@/types/project-type'
import { useQuery } from 'react-query'

const findProjectById = async (uuid: string) => {
  // const response = await apiClient.get<TATProjectFindById>(`/employees/${id}`)
  // return response.data
  const response = await axiosPrivate.get<TProjectFindById>(`/project/${uuid}`)
  return response.data
}

const useGetProjectById = (uuid: string) => {
  return useQuery<TProjectFindById, Error>(
    [projectQueryKeys.projectDetails, uuid],
    async () => await findProjectById(uuid),
    {
      onSuccess: () => console.log('GetAllTProjectById On Success Called'),
    }
  )
}

export default useGetProjectById
