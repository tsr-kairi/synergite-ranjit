import { TOnboarding } from '@/types/onboarding-flow-type'
import axiosPrivate from './axiosPrivate'

export const createOnboarding = async (onboarding: TOnboarding ) => {
  try {
    const { data } = await axiosPrivate.post('/onboarding', onboarding)
    console.log('data data =', data)
  } catch (error) {
    console.log(error)
  }
} // End of createOnboarding
