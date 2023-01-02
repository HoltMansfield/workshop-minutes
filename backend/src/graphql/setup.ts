import { graphqlHTTP } from 'express-graphql'
import { getSchema } from './schema/get-schema'
const { buildSchema } = require('graphql')

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello worldzy!'
  }
}

export const getMiddleware = () => {
  return graphqlHTTP({
    schema: getSchema(),
    rootValue: root,
    graphiql: true
  })
}
