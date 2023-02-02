import { useMutation } from 'react-query'
import { User } from '../../../collections/user'
import { HttpError } from '../../../types/api'
import { useDmsUser } from '../../api/useDmsUser'

interface LoginAttempt {
  email: string
  password: string
}

export const useLogin = () => {
  const { login } = useDmsUser()

  const _request = async (email: string, password: string): Promise<User> => {
    const result = await login(email, password)
    return result as User 
  }
 
  const mutation = useMutation<User, HttpError , LoginAttempt>((attempt: LoginAttempt) => {
    return _request(attempt.email, attempt.password)
  })

  return {
    mutation
  } as const
}
