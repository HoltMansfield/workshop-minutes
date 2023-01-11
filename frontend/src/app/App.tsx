import { ApolloProvider } from '@apollo/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { useApollo } from '../hooks/api/useApollo'
import { useMaterialTheme } from '../hooks/useMaterialTheme'
import { router } from '../routes/RouteTable'
import { PageLayout } from './PageLayout'

function App() {
  const client = useApollo()
  const theme = useMaterialTheme()

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageLayout>
          <RouterProvider router={router} />
        </PageLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
