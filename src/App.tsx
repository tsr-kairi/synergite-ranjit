import React, { useContext } from 'react'
import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ConfirmPassword from './pages/confirm-password'
import ServerError from './pages/server-error'
import NotFound from './pages/not-found'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashBoard from './pages/dashboard'
import Client from './pages/client'
import Vendor from './pages/vendor'
import ClientDetails from './pages/client/client-details'
import VendorDetails from './pages/vendor/vendor-details'
import Employee from './pages/employee'
import EmployeeDetails from './pages/employee/employee-details'
import SubmissionMain from './pages/client/client-details/jobs/submissions'
import { Loader } from '@mantine/core'
import ProtectedRoute from './components/routes/protected-route'
import PublicRoute from './components/routes/public-route'
import { AuthContext } from './context/auth.context'
import ForgotPasswordSuccess from './pages/forgot-password/forgotPasswordSuccess'
import OnboardingList from './pages/onboarding/components/onboarding-list'
const LazyAppShallMain = React.lazy(() => import('./components/layout'))

function App() {
  const { isAuth } = useContext(AuthContext)

  return <OnboardingList />

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
            <Route element={<ProtectedRoute isAuth={isAuth} />}>
              <Route path="/" element={<DashBoard />} />
              <Route path="/dashboard" element={<DashBoard />} />

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
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
