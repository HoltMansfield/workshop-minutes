import path from 'path'
import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import GraphQLDateTime from 'graphql-type-datetime'

const resolversArray = loadFilesSync(path.join(__dirname, './resolver'))

const customTypeResolvers = {
  // DateTime is a custom scalar defined in
  DateTime: GraphQLDateTime
}

const allResolvers = [...resolversArray, customTypeResolvers]
const resolvers = mergeResolvers(allResolvers)

export default resolvers
