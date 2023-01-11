import { MongoClient } from 'mongodb'

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`
//"mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const client = new MongoClient(uri)
let db

export const connectMongo = async () => {
  try {
    await client.connect()
    console.log('Connected to mongo')
    db = client.db(`${process.env.DB_NAME}`)
    return db
  } catch (e) {
    console.log('*********************')
    console.log(`Message: ${e.message}`)
    console.log('-----')
    console.log(`Stack: ${e.stack}`)
    console.log('-----')
    console.log(`URI: ${uri}`)
  }
}

export const disconnectMongo = async () => {
  try {
    await client.close()
    console.log('Connected to mongo closed')
  } catch {
    // ???
  }
}

export const getDb = () => db
