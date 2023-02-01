const base = import.meta.env.VITE_API_URL

export const useCollection = (collectionName: string) => {
  const insertOne = async (document: object): Promise<any> => {  
    const result = await fetch(`${base}/data-api`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "insertOne",
        collection: collectionName,
        document: document
      })
    })
    return result.json()
  }

  const findOne = async (query: object): Promise<any> => {  
    const result = await fetch(`${base}/data-api`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "findOne",
        collection: collectionName,
        filter: query
      })
    })
    const json = await result.json()
    return json?.document
  }

  return {
    insertOne,
    findOne
  } as const
}
