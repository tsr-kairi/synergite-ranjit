import { TOnboarding } from '@/types/onboarding-flow-type'
import axiosPrivate from './axiosPrivate'

export type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

interface IOnboardingResponse {
  id: string
  onboard_status: string
}

interface IActivityResponse {
  id: string
  assigned_to: string
  assigned_by: string
  activity_status: string
}

export interface ITaskResponse {
  id: string
  task_name: string
  is_complete: string
  completed_datetime: string
  need_by_datetime: string
}

export const createOnboarding = async (onboarding: TOnboarding) => {
  delete onboarding.id
  try {
    const { data } = await axiosPrivate.post<{
      data: { uuid: string }
    }>('/onboarding', onboarding)
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of createOnboarding

export const getOnboardingList = async () => {
  try {
    const { data } = await axiosPrivate.get<{ data: IOnboardingResponse[] }>(
      '/onboarding'
    )
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
  department: TDepartment
) => {
  try {
    const { data } = await axiosPrivate.get<{ data: IActivityResponse[] }>(
      `/activity/filter/dept?onboarding_id=${onboardingId}&dept_uuid=${department}`
    )
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getActivitiesByOnboardingId

export const getTasksByActivityId = async (activityId: string) => {
  try {
    const { data } = await axiosPrivate.get<{ data: ITaskResponse[] }>(
      `/task/${activityId}`
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
      `/onboarding/status/update?task_id=${taskId}&is_complete=${status}`
    )
    console.log(data)
    return data.data.message
  } catch (error) {
    console.log(error)
  }
} // End of updateTaskStatusByTaskId
