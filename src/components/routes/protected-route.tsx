/* eslint-disable react/prop-types */
// Third party packages
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  isAuth: boolean
  children?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { isAuth } = props

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
