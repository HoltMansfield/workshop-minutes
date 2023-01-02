import express  from 'express'
import { getMiddleware } from './graphql/setup'

var app = express()

// add GraphQL endpoint
app.use('/graphql', getMiddleware());


app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
