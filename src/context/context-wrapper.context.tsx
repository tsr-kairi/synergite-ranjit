// context
import { AuthContextProvider } from './auth.context'

interface ContextWrapperProps {
  children?: React.ReactNode
}

const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>
} // End of ContextWrapper

export default ContextWrapper
