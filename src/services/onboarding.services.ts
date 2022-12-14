import { TOnboarding } from '@/types/onboarding-flow-type'
import { useParams } from 'react-router-dom'
import axiosPrivate from './axiosPrivate'

export type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

// interface UserAssigned {
//   uuid: string
//   first_name: string
//   last_name: string
// }

interface IActivityResponse {
  id: string
  uuid: string
  assigned_to: string
  assigned_by: string
  assignedByUser: {
    uuid: string
    first_name: string
    last_name: string
  }

  assignedToUser: {
    uuid: string
    first_name: string
    last_name: string
  }

  activity_status: string
}

export interface ITaskResponse {
  uuid: string
  task_name: string
  is_complete: string
  completed_datetime: string
  need_by_datetime: string
}

const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return `${year}-${month > 9 ? month : '0' + month.toString()}-${
    day > 9 ? day : '0' + day.toString()
  } 00:00:00`
}

export const updateOnboarding = async (
  onboarding: TOnboarding,
  onboarding_uuid: string
) => {
  // const { onboardingUuid } = useParams()
  // console.log('onboardingUuid', onboardingUuid)

  const onboardingData: { start_date?: string; end_date?: string } = {}

  if (onboarding.start_date) {
    onboardingData.start_date = getFormattedDate(
      new Date(onboarding.start_date)
    )
  }
  if (onboarding.end_date) {
    onboardingData.end_date = getFormattedDate(new Date(onboarding.end_date))
  }

  try {
    const { data } = await axiosPrivate.patch<{
      data: { uuid: string }
    }>(`/onboarding/${String(onboarding_uuid)}`, {
      ...onboarding,
      ...onboardingData,
      documents: undefined,
    })
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of updateOnboarding

export const createOnboarding = async (onboarding: TOnboarding) => {
  // const { onboardingUuid } = useParams()
  // console.log('onboardingUuid', onboardingUuid)

  const onboardingData: { start_date?: string; end_date?: string } = {}

  if (onboarding.start_date) {
    onboardingData.start_date = getFormattedDate(
      new Date(onboarding.start_date)
    )
  }
  if (onboarding.end_date) {
    onboardingData.end_date = getFormattedDate(new Date(onboarding.end_date))
  }

  try {
    const { data } = await axiosPrivate.post<{
      data: { uuid: string }
    }>(`/onboarding`, {
      ...onboarding,
      ...onboardingData,
      documents: undefined,
    })
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of createOnboarding

export const getOnboardingList = async (searchTerm?: string) => {
  try {
    let url = `/onboarding?limit=100&keyword=${searchTerm || ''}`
    if (searchTerm) {
      url = `/onboarding/search?limit=100&keyword=${searchTerm || ''}`
    }

    const { data } = await axiosPrivate.get<{ data: TOnboarding[] }>(url)
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getOnboardingList

export const getOnboardingByUUID = async (onboardingUUID: string) => {
  try {
    const { data } = await axiosPrivate.get<{ data: TOnboarding }>(
      `/onboarding/${onboardingUUID}`
    )
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getOnboardingByUUID

export const getActivitiesByOnboardingId = async (
  onboardingId: string,
  departmentUUID: string
) => {
  try {
    const { data } = await axiosPrivate.get<{ data: IActivityResponse[] }>(
      `/activity/filter/dept?onboarding_id=${onboardingId}&dept_uuid=${departmentUUID}`
    )
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getActivitiesByOnboardingId

export const getTasksByActivityId = async (activityId: string) => {
  try {
    const { data } = await axiosPrivate.get<{ data: ITaskResponse[] }>(
      `/task/get/activity/${activityId}`
    )
    console.log(data)
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getTasksByActivityId

export const updateTaskStatusByTaskId = async (
  taskId: string,
  status: 'Y' | 'N'
) => {
  try {
    const { data } = await axiosPrivate.post<{ data: { message: string } }>(
      `/onboarding/status/update?task_uuid=${taskId}&is_complete=${status}`
    )
    return data.data.message
  } catch (error) {
    console.log(error)
  }
} // End of updateTaskStatusByTaskId
