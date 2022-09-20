/* eslint-disable react/prop-types */
// Third party packages
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  isAuth: boolean
  children?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { isAuth, children } = props

  console.log('[ProtectedRoute] =', isAuth)

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
