import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectMongo } from './mongo/setup'
import { addUserRoutes } from './routes/user'
import { handleApiError } from './server/error-handling/error-handler'
import { addDataApiRoutes } from './routes/mongo-data-api'

const run = async () => {
  await connectMongo()
  const app = express()

  // pre-endpoint middleware
  app.use(bodyParser.json())
  app.use(cookieParser())
  //app.options('*', cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }))
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173',
      preflightContinue: true
    })
  )

  // no security for these routes
  addUserRoutes(app)

  // cookie required
  addDataApiRoutes(app)

  // post-endpoint middleware (error handler always last)
  app.use(handleApiError)

  app.listen(4000, () => {
    console.log('Listening at http://localhost:4000...')
  })
}

run()
