import axios from 'axios'
const base = import.meta.env.VITE_API_URL

const getClient = () => {
  return axios.create({
    baseURL: base,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const useCollection = (collectionName: string) => {
  const insertOne = async (document: object) => {
    const result = await getClient().post('/data-api', {
      action: "insertOne",
      collection: collectionName,
      document: document
    })
    return result
  }

  const findOne = async (query: object): Promise<any> => {  
    const result = await getClient().post('/data-api', {
      action: "findOne",
      collection: collectionName,
      filter: query
    })

    return result
  }

  // const findOne = async (query: object): Promise<any> => {  
  //   const result = await fetch(`${base}/data-api`, {
  //     method: 'post',
  //     //mode: 'cors',
  //     credentials: 'include',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       action: "findOne",
  //       collection: collectionName,
  //       filter: query
  //     })
  //   })
  //   return result.json()
  // }

  return {
    insertOne,
    findOne
  } as const
}
