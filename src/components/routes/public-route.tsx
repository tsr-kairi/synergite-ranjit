/* eslint-disable react/prop-types */
// Third party packages
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  isAuth: boolean
  children?: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = (props) => {
  const { isAuth, children } = props
  // const navigate = useNavigate()

  if (isAuth) {
    return <Navigate to="/" replace />
  }
  // navigate(-1)

  return <>{children}</>
}

export default PublicRoute
