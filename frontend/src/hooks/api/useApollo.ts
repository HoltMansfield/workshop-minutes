import { ApolloClient, InMemoryCache } from '@apollo/client'

export const useApollo = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  })

  return client
}