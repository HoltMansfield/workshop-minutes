import { ObjectId } from 'mongodb'
import { getCollection } from '../../mongo/collection'
import { Collections } from '../../mongo/collections'

const resolvers = {
  Query: {
    user: async (_, args: any) => {
      const users = getCollection(Collections.users)
      const user = await users.findOne({ _id: new ObjectId(args.userId) })

      return user
    }
  },
  Mutation: {
    addUser: async (_, args: any) => {
      const newUser = args.newUser

      const users = getCollection(Collections.users)
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
