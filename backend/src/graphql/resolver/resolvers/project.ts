import { getCollection } from '../../../mongo/collection'
import { Collections } from '../../../mongo/collections'

const resolvers = {
  Query: {
    projects: async (_, userId: string) => {
      const projects = getCollection(Collections.projects)
      const projectsForThisUser = await projects.find({})
      const mapped = projectsForThisUser.map((p) => {
        return {
          id: p.id,
          details: {
            name: p.name,
            startDate: p.startDate
          }
        }
      })

      return mapped
    },
    project: (_, projectId: string) => {
      // this resolver is empty from a data standpoint, just passes the ID down
      return projectId
    }
  },
  Mutation: {
    addProject: async (_, args: any) => {
      const newProject = args.newProject
      newProject.startDate = new Date()

      const projects = getCollection(Collections.projects)
      const result = await projects.insertOne(newProject)

      return { id: result.id }
    }
  },
  Project: {
    details: ({ projectId }) => {
      return { id: projectId, startDate: new Date() }
    }
  }
}

export default resolvers
