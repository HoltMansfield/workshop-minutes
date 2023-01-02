module.exports = /* GraphQL */ `
  type Project {
    id: String!
    baseProps: ProjectBaseProps
  }

  type ProjectBaseProps {
    name: String
    startDate: 
  }

  type Query {
    projects(userId: ID!): [Client]
    project(id: ID!): Client
  }

  type Mutation {
    addClient(name: String!, age: Int!): Client
  }
`
