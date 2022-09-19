import React, { ReactNode } from 'react'
import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ConfirmPassword from './pages/confirm-password'
import ServerError from './pages/server-error'
import NotFound from './pages/not-found'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashBoard from './pages/dashboard'
import Client from './pages/client'
import Vendor from './pages/vendor'
import ClientDetails from './pages/client/client-details'
import VendorDetails from './pages/vendor/vendor-details'
import Employee from './pages/employee'
import EmployeeDetails from './pages/employee/employee-details'
import useCurrentUser from './pages/login/hooks/useCurrentUser'
import SubmissionMain from './pages/client/client-details/jobs/submissions'
import { Loader } from '@mantine/core'
// import AppShellMain from './components/layout'
const LazyAppShallMain = React.lazy(() => import('./components/layout'))

type IUser = {
  first_name: string
  last_name: string
  email_id: string
}
type ProtectedRouteProps = {
  user: IUser
  children: ReactNode
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App(): JSX.Element {
  const user = useCurrentUser()
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader variant="dots" />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/not-found" element={<NotFound />} />

          <Route
            element={
              // <ProtectedRoute user={user}>
              <LazyAppShallMain />
              // </ProtectedRoute>
            }
          >
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route path="/client" element={<Client />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/employee" element={<Employee />} />
            <Route
              path="/client-details/:clientId"
              element={<ClientDetails />}
            />
            <Route
              path={'/vendor-details/:vendorId'}
              element={<VendorDetails />}
            />
            <Route
              path="/employee-details/:employeeId"
              element={<EmployeeDetails />}
            />
            <Route path="/submissions/:jobId" element={<SubmissionMain />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
