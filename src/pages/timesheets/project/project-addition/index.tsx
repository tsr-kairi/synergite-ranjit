import { Loader } from '@mantine/core'
import useGetAllProject from './hooks/useGetAllProject'
import { ProjectTable } from './project-table'

export const Project = () => {
  const { data, isError, error } = useGetAllProject()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <ProjectTable data={data?.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Project
