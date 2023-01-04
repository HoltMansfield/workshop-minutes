import { getCollection } from '../../../mongo/collection'
import { Collections } from '../../../mongo/collections'

const resolvers = {
  Query: {
    projects: () => {
      return [{ name: 'Rolling Tray' }, { name: 'Stash Box' }]
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
