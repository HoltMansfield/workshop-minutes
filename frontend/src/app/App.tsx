import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useMaterialTheme } from '../hooks/useMaterialTheme'
import { RouteTable } from '../routes/RouteTable'
import { PageLayout } from './PageLayout'
import { Spinner } from './Spinner'
import { useCheckForPreviousSession } from '../hooks/state/useCheckForPreviousSession'
import { useApplicationState } from '../hooks/state/useApplicationState'

const queryClient = new QueryClient()

function App() {
  const theme = useMaterialTheme()
  const { loggedInUser } = useApplicationState()
  useCheckForPreviousSession()

  // Undefined on first load | null if not logged in | object if logged in
  if (loggedInUser === undefined) {
    return <Spinner />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <>
            <CssBaseline />
            <PageLayout>
              <RouteTable />
            </PageLayout>
          </>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
