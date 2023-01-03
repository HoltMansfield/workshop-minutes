module.exports = {
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
    addProject: (_, args: any) => {
      const newProject = args.newProject
      console.log(JSON.stringify(newProject))
      return null
    }
  },
  Project: {
    details: ({ projectId }) => {
      return { id: projectId, startDate: new Date() }
    }
  }
}
