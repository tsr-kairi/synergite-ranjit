import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ConfirmPassword from './pages/confirm-password'
import ServerError from './pages/server-error'
import NotFound from './pages/not-found'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Loader } from '@mantine/core'
import { useAuth } from './store/auth.store'

import DashBoard from './pages/dashboard'
import Client from './pages/client'
import Vendor from './pages/vendor'
import ClientDetails from './pages/client/client-details'
import VendorDetails from './pages/vendor/vendor-details'
import Employee from './pages/employee'
import EmployeeDetails from './pages/employee/employee-details'
import SubmissionMain from './pages/client/client-details/jobs/submissions'
import ProtectedRoute from './components/routes/protected-route'
import PublicRoute from './components/routes/public-route'
import ForgotPasswordSuccess from './pages/forgot-password/forgotPasswordSuccess'
import { AdminActivity } from './pages/admin/activity'
import AdminActivityDetails from './pages/admin/activity-details'
import Onboarding from './pages/onboarding'
import Activity from './pages/activity'
import ActivityDetails from './pages/activity/activity-details'
import Candidate from './pages/candidate'
import Department from './pages/department'
import CandidateDetails from './pages/candidate/candidate-details'
import Roles from './pages/roles'
import DepartmentDetails from './pages/department/department-details'
import RolesDetails from './pages/roles/roles-details'
import CreateJobForm from './pages/job/create-job-form'
import Timesheets from './pages/timesheets/my-timesheet/timesheets'
import Submission from './pages/submission'
import AllActivities from './pages/activities/all-activities'
import DelegatesActivities from './pages/activities/delegates-activities'
import TeamActivities from './pages/activities/team-activities'
import AllJobs from './pages/job'
import JobDetails from './pages/job/job-details'
import MyTeamTimesheet from './pages/timesheets/my-team-timesheet/timesheets'
// import Project from './pages/timesheets/project/project-addition'
import OnboardingList from './pages/onboarding/components/onboarding-list'
// import ProjectAllocation from './pages/timesheets/project/project-allocation'
import { ProjectTable } from './pages/timesheets/project/project-addition/project-table'
import { ProjectAllocationTable } from './pages/timesheets/project/project-allocation/project-allocation-table'
const LazyAppShallMain = React.lazy(() => import('./components/layout'))

function App() {
  const isAuth = useAuth((state) => state.isAuth)

  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader variant="dots" />}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute isAuth={isAuth}>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/forgotPasswordSuccess"
            element={<ForgotPasswordSuccess />}
          />

          <Route element={<LazyAppShallMain />}>
            {/* Protected Routes */}
            {/* <Route element={<ProtectedRoute isAuth={isAuth} />}> */}
            {/* <Route
              path="/"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <DashBoard />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <DashBoard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding-list"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <OnboardingList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/job"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AllJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-details/:jobId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <JobDetails jobId={[]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job/add"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <CreateJobForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/timesheets"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Timesheets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-team-timesheet"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <MyTeamTimesheet />
                </ProtectedRoute>
              }
            />
            {/* Main */}
            {/* <Route
              path="/project"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Project />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-allocation"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <ProjectAllocation />
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/project"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <ProjectTable data={[]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-allocation"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <ProjectAllocationTable data={[]} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-activity"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AdminActivity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-activity/:activityId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AdminActivityDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/client"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Client />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Vendor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Employee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Candidate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client-details/:clientId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <ClientDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path={'/vendor-details/:vendorId'}
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <VendorDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee-details/:employeeId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <EmployeeDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate-details/:candidateId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <CandidateDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submissions/:jobId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <SubmissionMain />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submission"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Submission client_id={''} job_id={''} />
                </ProtectedRoute>
              }
            />
            {/* all Activities */}
            <Route
              path="/my-activities"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AllActivities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-team-activities"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <TeamActivities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-team-delegated-activities"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <DelegatesActivities />
                </ProtectedRoute>
              }
            />

            <Route
              path="/activity-details/:activityId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <ActivityDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/department-details/:departmentId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <DepartmentDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles-details/:rolesId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <RolesDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Activity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/department"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Department />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Roles />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
