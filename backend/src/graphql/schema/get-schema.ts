const { mergeSchemas } = require('@graphql-tools/schema')
import resolvers from '../resolver/get-resolvers'
import typeDefs from '../types/get-types'

export const getSchema = () => {
  const mergedSchema = mergeSchemas({
    // schemas: [schema],
    typeDefs: typeDefs,
    resolvers: resolvers
  })

  return mergedSchema
}
