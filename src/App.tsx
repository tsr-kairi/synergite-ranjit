import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ConfirmPassword from './pages/confirm-password'
import ServerError from './pages/server-error'
import NotFound from './pages/not-found'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShellMain from './components/layout'
import DashBoard from './pages/dashboard'
import Client from './pages/client'
import Vendor from './pages/vendor'
import ClientDetails from './pages/client/clientDetails/client-details'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route element={<AppShellMain />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/client-details" element={<ClientDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
