import { Loader } from '@mantine/core'
import useGetAllJobs from './hooks/useGetAllJobs'
import { AllJobList } from './job-list'

export const AllJobs = () => {
  const { data, isError, error } = useGetAllJobs()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length && data) {
    return <AllJobList data={data?.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default AllJobs
