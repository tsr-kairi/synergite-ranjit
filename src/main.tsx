import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme/theme'
import CustomFonts from './theme/customFont'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SpotlightProvider } from '@mantine/spotlight'
import type { SpotlightAction } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons'
import { navLinks } from './components/layout/navBar/NavBar'

const actions: SpotlightAction[] = navLinks.map((link) => ({
  title: `${link.label}`,
  onTrigger: () => console.log(`Label : ${link.label}`),
}))

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <ModalsProvider>
            <CustomFonts />
            <SpotlightProvider
              searchIcon={<IconSearch size={18} />}
              searchPlaceholder="Search..."
              shortcut="alt + k"
              nothingFoundMessage="Nothing found..."
              filter={(query, actions) =>
                actions.filter((action) =>
                  action.title.toLowerCase().includes(query.toLowerCase())
                )
              }
              actions={actions} // {...otherProps}
            >
              <App />
            </SpotlightProvider>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
