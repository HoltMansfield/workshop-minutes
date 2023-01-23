import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useMaterialTheme } from '../hooks/useMaterialTheme'
import { router } from '../routes/RouteTable'
import { PageLayout } from './PageLayout'
//import { useCheckForPreviousSession } from '../hooks/state/useCheckForPreviousSession'

const queryClient = new QueryClient()

function App() {
  const theme = useMaterialTheme()
  //useCheckForPreviousSession()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageLayout>
          <RouterProvider router={router} />
        </PageLayout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
