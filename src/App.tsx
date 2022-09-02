import React from 'react'
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
// import AppShellMain from './components/layout'
const LazyAppShallMain = React.lazy(() => import('./components/layout'))

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback="Loading...">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route element={<LazyAppShallMain />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/client" element={<Client />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route
              path="/client-details/:clientId"
              element={<ClientDetails />}
            />
            <Route
              path={'/vendor-details/:vendorId'}
              element={<VendorDetails />}
            />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
