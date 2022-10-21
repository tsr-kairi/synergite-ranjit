import { createStyles } from '@mantine/core'

interface AppBarProps {
  children?: React.ReactNode
  className?: string
}

const AppBar: React.FC<AppBarProps> = (props) => {
  const { children, className = '' } = props

  const { classes } = useAppBarStyles()

  return <div className={`${classes.container} ${className}`}>{children}</div>
} // End of AppBar

export default AppBar

const useAppBarStyles = createStyles((theme) => ({
  container: {
    backgroundColor: '#04334c',
    width: '100%',
  },
}))
