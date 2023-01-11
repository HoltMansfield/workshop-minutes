const { mergeSchemas } = require('@graphql-tools/schema')
import resolvers from './get-resolvers'
import typeDefs from './get-types'

export const getSchema = () => {
  const mergedSchema = mergeSchemas({
    // schemas: [schema],
    typeDefs: typeDefs,
    resolvers: resolvers
  })

  return mergedSchema
}
