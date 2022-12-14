import { Loader } from '@mantine/core'
import useGetAllProjectAllocation from './hooks/useGetAllProject'
import { ProjectAllocationTable } from './project-allocation-table'

export const ProjectAllocation = () => {
  const { data, isError, error } = useGetAllProjectAllocation()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <ProjectAllocationTable data={data?.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default ProjectAllocation
