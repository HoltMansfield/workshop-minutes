import { Express } from 'express'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getCollection } from '../mongo/collection'
import { Collections } from '../mongo/collections'

export const addUserRoutes = (app: Express) => {
  app.post('/users-login', async (req, res) => {
    const loginAttempt = req.body
    const users = getCollection(Collections.users)
    const user = await users.findOne({ email: loginAttempt.email })

    const hashedPassword = await bcrypt.hash(loginAttempt.password, user.salt)

    if (hashedPassword !== user.password) {
      throw new Error('Email or Password are incorrect')
    }

    const token = jwt.sign(user, 'toDo: use cert')

    return res.json({ user, jwt: token })
  })

  app.post('/users', async (req, res) => {
    const newUser = req.body
    const users = getCollection(Collections.users)

    // Check for existing user
    const existingUser = await users.findOne({ email: newUser.email })

    if (existingUser) {
      throw new Error('Email in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newUser.password, salt)

    newUser.password = hashedPassword
    newUser.salt = salt

    const result = await users.insertOne(newUser)

    const token = jwt.sign(result, 'toDo: use cert')

    return res.json({
      user: result,
      jwt: token
    })
  })

  app.delete('/users/:userId', async (req, res) => {
    const query = { _id: new ObjectId(req.params.userId) }
    const users = getCollection(Collections.users)
    const deleteCount = await users.deleteOne(query)

    if (deleteCount === 0) {
      throw new Error('User not found')
    }

    return res.json({ userId: req.params.userId })
  })
}
