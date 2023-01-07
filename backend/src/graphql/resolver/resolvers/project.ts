import { ObjectId } from 'mongodb'
import { getCollection } from '../../../mongo/collection'
import { Collections } from '../../../mongo/collections'

const resolvers = {
  Query: {
    projects: async (_, args: any) => {
      const projects = getCollection(Collections.projects)
      const projectsForThisUser = await projects.find({ userId: args.userId })

      return projectsForThisUser
    },
    project: async (_, args: any) => {
      const projects = getCollection(Collections.projects)
      const project = await projects.findOne({ _id: new ObjectId(args.projectId) })

      return project
    }
  },
  Mutation: {
    addProject: async (_, args: any) => {
      const newProject = args.newProject
      newProject.startDate = new Date()

      const projects = getCollection(Collections.projects)
      const result = await projects.insertOne(newProject)

      return result
    },
    deleteProject: async (_, args: any) => {
      const query = { _id: new ObjectId(args.projectId) }
      const projects = getCollection(Collections.projects)
      const deleteCount = await projects.deleteOne(query)

      if (deleteCount === 0) {
        throw new Error('Project not found')
      }

      return args.projectId
    }
  }
}

export default resolvers
