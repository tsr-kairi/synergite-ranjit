import { Loader } from '@mantine/core'
import { FC } from 'react'
import useGetAllSubmissionsByClientIdJobId from '../hooks/useGetAllSubmissionsByClientIdJobId'
import { SubmissionList } from './submission-list'

interface SubmissionProps {
  client_id: string
  job_id: string
}

export const Submission: FC<SubmissionProps> = ({ client_id, job_id }) => {
  const { data, isError, error } = useGetAllSubmissionsByClientIdJobId(
    client_id,
    job_id
  )

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data?.length) {
    return <SubmissionList data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Submission

//
//
//
// import { Loader } from '@mantine/core'
// import { useParams } from 'react-router-dom'
// import useGetAllSubmissionsByJobId from '../hooks/useGetAllSubmissionsByJobId'
// import { SubmissionList } from './submission-list'

// export const Submission = () => {
//   const { clientId, jobId } = useParams()
//   const { data, isError, error } = useGetAllSubmissionsByJobId(
//     String(clientId, jobId)
//   )

//   if (isError) {
//     console.log(error)
//     return <h1>An Error Occurred</h1>
//   }

//   if (data?.data.length) {
//     return <SubmissionList data={data.data} />
//   } else {
//     return <Loader variant="dots" />
//   }
// }

// export default Submission
