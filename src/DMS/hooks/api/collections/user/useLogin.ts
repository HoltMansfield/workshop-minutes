import { useMutation } from 'react-query'
import { User } from '../../../../collections/user'
import { HttpError } from '../../../../types/api'
import { useDmsUser } from '../../useDmsUser'

interface LoginAttempt {
  email: string
  password: string
}

export const useLogin = () => {
  const { login } = useDmsUser()

  const mutation = useMutation<User, HttpError , LoginAttempt>((attempt: LoginAttempt) => {
    return login(attempt.email, attempt.password)
  })

  return {
    mutation
  } as const
}
