import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme/theme'
import CustomFonts from './theme/customFont'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <CustomFonts />
      <App />
    </MantineProvider>
  </React.StrictMode>
)
