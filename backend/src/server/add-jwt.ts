import { Express } from 'express'
import expressJwt from 'express-jwt'

export const addJwt = (app: Express) => {
  app.use(
    expressJwt({ secret: 'toDo: use cert' }).unless({
      path: [
        // a user who is not logged in needs to be able to create an account
        { url: '/users', methods: ['POST'] },
        // the actual login endpoint
        { url: '/users-login', methods: ['POST'] }
      ]
    })
  )
}
