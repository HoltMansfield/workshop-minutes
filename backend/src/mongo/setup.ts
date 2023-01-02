import { MongoClient } from 'mongodb'

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//"mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const client = new MongoClient(uri)

export const connectMongo = async () => {
  try {
    await client.connect()
    console.log('Connected to mongo')
    return client.db(`${process.env.DB_NAME}`)
  } catch {
    // ???
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
