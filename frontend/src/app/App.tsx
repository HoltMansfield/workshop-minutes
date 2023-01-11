import { ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { useApollo } from '../hooks/api/useApollo'
import { router } from '../routes/RouteTable'

function App() {
  const client = useApollo()

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
}

export default App
