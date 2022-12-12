import { projectQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
// import { TAEmployeeFindAll } from '@/types/employee-type'
import { TProjectFindAll } from '@/types/project-type'
import { useQuery } from 'react-query'

const findAlProject = async () => {
  const response = await axiosPrivate.get<TProjectFindAll>(`/project`)
  return response.data
}

const useGetAllProject = () => {
  return useQuery<TProjectFindAll, Error>(
    projectQueryKeys.allProject,
    findAlProject
  )
}

export default useGetAllProject
