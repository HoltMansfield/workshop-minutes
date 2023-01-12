import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connectMongo } from './mongo/setup'
import { getMiddleware } from './graphql/setup'
import { addUserRoutes } from './routes/user'
import { handleApiError } from './server/error-handling/error-handler'
import { addJwt } from './server/add-jwt'

// const corsOptions = {
//   origin: 'http://localhost:5173/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const run = async () => {
  await connectMongo()
  const app = express()

  // pre-endpoint middleware
  app.use(bodyParser.json())
  app.use(cors())

  addJwt(app)

  // no security for these routes
  addUserRoutes(app)

  // add GraphQL endpoint
  app.use('/graphql', getMiddleware())

  // post-endpoint middleware (error handler always last)
  app.use(handleApiError)

  app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
  })
}

run()
