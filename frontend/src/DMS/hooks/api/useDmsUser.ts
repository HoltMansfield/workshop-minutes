import { User } from "../../collections/user"
import { getBaseUrl } from "./get-base-url"

export const useDmsUser = () => {
  const base = getBaseUrl()

  const login = async (email: string, password: string): Promise<User> => {
    const request = {
      email,
      password,
    }

    try {
      const response = await fetch(`${base}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
      const user = await response.json()
      return user
    } catch (error) {
      // ToDo
      throw error
    } 
  }

  const logout = async (): Promise<any> => {
    try {
      return await fetch(`${base}/users/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      // ToDo
      throw error
    } 
  }

  return {
    login,
    logout
  } as const
}
