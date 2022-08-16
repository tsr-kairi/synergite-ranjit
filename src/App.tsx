import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ConfirmPassword from './pages/confirm-password'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
