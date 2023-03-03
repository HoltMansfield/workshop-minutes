import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMaterialTheme } from '../hooks/useMaterialTheme'
import { RouteTable } from '../routes/RouteTable'
import { PageLayout } from './PageLayout'
import { Spinner } from './Spinner'
import { useApplicationState } from '../hooks/state/useApplicationState'
import { FetchAllData } from 'src/app/data-fetching/FetchAllData'
import { FetchLoggedInUser } from 'src/app/data-fetching/FetchLoggedInUser'

const queryClient = new QueryClient()

function App() {
  const theme = useMaterialTheme()
  const { loggedInUser } = useApplicationState()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <FetchLoggedInUser />
        {loggedInUser === undefined && (
          // Undefined on first load | null if not logged in | object if logged in
          <Box display="flex" mt={8}><Spinner /></Box>
        )}
        {loggedInUser !== undefined && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <>
                <CssBaseline />
                <ToastContainer />
                <FetchAllData />
                <PageLayout>
                  <RouteTable />
                </PageLayout>
              </>
            </BrowserRouter>
          </LocalizationProvider>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
