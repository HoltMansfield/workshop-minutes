import { getCollection } from '../../../mongo/collection'
import { Collections } from '../../../mongo/collections'

const resolvers = {
  Query: {
    projects: async (_, userId: string) => {
      const projects = getCollection(Collections.projects)
      const projectsForThisUser = await projects.find({ userId: userId })

      return projectsForThisUser
    },
    project: async (_, projectId: string) => {
      const projects = getCollection(Collections.projects)
      const project = await projects.find({ id: projectId })

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
    }
  }
}

export default resolvers
