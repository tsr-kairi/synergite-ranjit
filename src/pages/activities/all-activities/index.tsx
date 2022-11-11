import useGetAllCandidate from '@/pages/candidate/hooks/useGetAllCandidate'
import { Loader } from '@mantine/core'
import { AllActivitiesList } from './all-activities-list'

export const AllActivities = () => {
  const { data, isError, error } = useGetAllCandidate()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <AllActivitiesList data={data?.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default AllActivities
