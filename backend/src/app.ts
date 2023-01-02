import express from 'express'
import { connectMongo } from './mongo/setup'
import { getMiddleware } from './graphql/setup'

const run = async () => {
  await connectMongo()
  const app = express()

  // add GraphQL endpoint
  app.use('/graphql', getMiddleware())

  app.listen(4000)
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
}

run()
