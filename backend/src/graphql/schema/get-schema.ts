import { buildSchema } from 'graphql'
const { mergeSchemas } = require('@graphql-tools/schema')
import resolvers from '../resolver/get-resolvers'
import typeDefs from '../types/get-types'

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Client {
      id: ID!
      name: String
      age: Int
      products: [Product]
    }
    
    type Product {
      id: ID!
      description: String
      price: Int
      client: Client
    }
    
    type Query {
      clients: [Client]
      client(id: ID!): Client
      products: [Product]
      product(id: ID!): Product
    }
    
    type Mutation {
      addClient(name: String!, age: Int!): Client
    }
`)

export const getSchema = () => {
  const mergedSchema = mergeSchemas({
    schemas: [schema],
    typeDefs: typeDefs,
    resolvers: resolvers
  })

  return mergedSchema
}
