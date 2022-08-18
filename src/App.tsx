import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ConfirmPassword from './pages/confirm-password'
import ServerError from './pages/server-error'
import NotFound from './pages/not-found'
import DashBoard from './pages/dashboard'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
