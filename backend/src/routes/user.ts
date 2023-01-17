import { Express } from 'express'
import { ObjectId } from 'mongodb'
import axios from 'axios'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getCollection } from '../mongo/collection'
import { Collections } from '../mongo/collections'

const getClient = () => {
  const client = axios.create({
    baseURL: `https://data.mongodb-api.com/app/data-eykqb/endpoint/data/v1/action/`,
    headers: {
      'Content-Type': 'application/json',
      'api-key': '8xCzOad3SiSyTXC3tdqCF2Ak3KdARPjRVi9Hw8rLQuqVvpBEHbrlhtWD61Y2h1A6'
    }
  })

  return client
}

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
    delete user.password
    delete user.salt

    return res.json({ user, jwt: token })
  })

  app.post('/users', async (req, res, next) => {
    const newUser = req.body
    const users = getCollection(Collections.users)

    const existingUser = await getClient().post('findOne', {
      dataSource: 'Cluster0',
      database: 'wmins',
      collection: 'users',
      filter: { email: newUser.email }
    })

    if (existingUser?.data?.document) {
      return next(new Error('Email in use'))
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newUser.password, salt)
    newUser.password = hashedPassword
    newUser.salt = salt

    const result = await getClient().post('insertOne', {
      dataSource: 'Cluster0',
      database: 'wmins',
      collection: 'users',
      document: newUser
    })

    delete newUser.password
    delete newUser.salt
    newUser._id = result.data.insertedId

    res.cookie('first', result.data.insertedId, { maxAge: 360000 })
    return res.json(newUser)
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
