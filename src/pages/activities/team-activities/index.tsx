import useGetAllCandidate from '@/pages/candidate/hooks/useGetAllCandidate'
import { Loader } from '@mantine/core'
import { TeamActivitiesList } from './team-activities-list'

export const TeamActivities = () => {
  const { data, isError, error } = useGetAllCandidate()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <TeamActivitiesList data={data?.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default TeamActivities
