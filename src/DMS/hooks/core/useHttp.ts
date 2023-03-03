import { getBaseUrl } from "./get-base-url"

export const useHttp = () => {
  const base = getBaseUrl()

  const post = async (url: string, body: object): Promise<any> => {
    const result = await fetch(`${base}${url}`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (result.ok) {
      return result.json()
    }

    if (result.status === 404) {
      throw new Error('404')
    }

    throw new Error(result.statusText)
  }

  const get = async (url: string): Promise<any> => {
    const result = await fetch(`${base}${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (result.ok) {
      return result.json()
    }

    if (result.status === 404) {
      throw new Error('404')
    }

    throw new Error(result.statusText)
  }

  return {
    post,
    get
  } as const
}
