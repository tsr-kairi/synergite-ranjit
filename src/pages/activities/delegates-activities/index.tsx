import useGetAllCandidate from '@/pages/candidate/hooks/useGetAllCandidate'
import { Loader } from '@mantine/core'
import { DelegatesActivitiesList } from './delegates-activities-list'

export const DelegatesActivities = () => {
  const { data, isError, error } = useGetAllCandidate()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <DelegatesActivitiesList data={data?.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default DelegatesActivities
