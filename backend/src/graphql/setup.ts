import { graphqlHTTP } from 'express-graphql'
const { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello worldz!'
  }
}

export const getMiddleware = () => {
  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
}
