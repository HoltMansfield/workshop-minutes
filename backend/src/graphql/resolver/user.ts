import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import { getCollection } from '../../mongo/collection'
import { Collections } from '../../mongo/collections'

const resolvers = {
  Query: {
    userLogin: async (_, args: any) => {
      const users = getCollection(Collections.users)
      const user = await users.findOne({ email: args.email })

      const hashedPassword = await bcrypt.hash(args.password, user.salt)

      if (hashedPassword !== user.password) {
        throw new Error('Email or Password are incorrect')
      }

      return user
    }
  },
  Mutation: {
    addUser: async (_, args: any) => {
      const users = getCollection(Collections.users)

      // Check for existing user
      const existingUser = await users.findOne({ _id: new ObjectId(args.email) })

      if (existingUser) {
        throw new Error('Email in use')
      }

      const newUser = args.newUser
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newUser.password, salt)

      newUser.password = hashedPassword
      newUser.salt = salt

      const result = await users.insertOne(newUser)

      return result
    },
    deleteUser: async (_, args: any) => {
      const query = { _id: new ObjectId(args.userId) }
      const users = getCollection(Collections.users)
      const deleteCount = await users.deleteOne(query)

      if (deleteCount === 0) {
        throw new Error('User not found')
      }

      return args.userId
    }
  }
}

export default resolvers
