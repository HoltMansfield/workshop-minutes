import express from 'express'
import cors from 'cors'
import { connectMongo } from './mongo/setup'
import { getMiddleware } from './graphql/setup'

// const corsOptions = {
//   origin: 'http://localhost:5173/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const run = async () => {
  await connectMongo()
  const app = express()

  app.use(cors())

  // add GraphQL endpoint
  app.use('/graphql', getMiddleware())

  app.listen(4000)
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
}

run()
