import { graphqlHTTP } from 'express-graphql'
import { getSchema } from './get-schema'

// Probably delete
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
