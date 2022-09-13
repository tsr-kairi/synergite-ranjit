import { Loader } from '@mantine/core'
import useGetAllSubmissions from '../hooks/useGetAllSubmissions'
import { SubmissionList } from './submission-list'

export const Submission = () => {
  const { data, isError, error } = useGetAllSubmissions()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <SubmissionList data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Submission
