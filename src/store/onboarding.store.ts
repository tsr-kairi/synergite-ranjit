import { TSubmission } from '@/types/submission-type'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Third party packages
import create from 'zustand'
import { TClient, TVendor, TJobs } from '../types/index'

interface IOnboarding {
  client?: TClient
  employee?: any
  vendor?: TVendor
  job?: TJobs
  submission?: TSubmission
  setClient: (client: TClient) => void
  setEmployee: (employee: any) => void
  setVendor: (vendor: TVendor) => void
  setJob: (job: TJobs) => void
  setSubmission: (submission: TSubmission) => void
}

export const useOnboarding = create<IOnboarding>((set) => ({
  setClient: (client) => set({ client }),
  setEmployee: (employee) => set({ employee }),
  setVendor: (vendor) => set({ vendor }),
  setJob: (job) => set({ job }),
  setSubmission: (submission) => set({ submission }),
}))
