import { getDb } from './setup'
import { Collections } from './collections'
let collection

const insertOne = async (document: any) => {
  const result = await collection.insertOne(document)

  // reformat the ID provided by mongo
  const id = document._id
  delete document._id
  document.id = id

  return document
}

const find = async (query: any): Promise<any[]> => {
  const cursor = await collection.find(query)
  const result = await cursor.toArray()
  const rezzy = result.map((x) => {
    const id = x._id.toString()
    delete x._id

    return {
      id,
      ...x
    }
  })
  return rezzy
}

export const getCollection = (collectionName: Collections) => {
  const db = getDb()
  collection = db.collection(Collections.projects)

  return {
    insertOne,
    find
  }
}
