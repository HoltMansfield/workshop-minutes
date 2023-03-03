import { useHttp } from "src/DMS/hooks/core/useHttp"
import { User } from "../../collections/user"


export const useDmsUser = () => {
  const { get, post } = useHttp()

  const login = async (email: string, password: string): Promise<User> => {
    const request = {
      email,
      password,
    }

    try {
      const user = await post('/users/login', request)
      return user
    } catch (error) {
      // ToDo
      throw error
    } 
  }

  const logout = async (): Promise<any> => {
    try {
      return await get('/users/logout')
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
