import { MongoClient } from 'mongodb'

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const client = new MongoClient(uri)

export const connectMongo = async () => {
  try {
    await client.connect()
    console.log("Connected to mongo");
  } catch {
    // ???
  }
}

export const disconnectMongo = async () => {
  try {
    await client.close()
    console.log("Connected to mongo closed");
  } catch {
    // ???
  }
}
