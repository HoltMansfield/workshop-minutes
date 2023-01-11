import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../hooks/api/useApollo'
import { Testy } from './Testy'


function App() {
  const client = useApollo()

  return (
    <ApolloProvider client={client}>
      <Testy />
    </ApolloProvider>
  )
}

export default App
