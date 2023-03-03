import { useMutation } from "react-query"
import { User } from "src/DMS/collections/user"
import { useHttp } from "src/DMS/hooks/api/useHttp"
import { HttpError } from "src/DMS/types/api"

export interface CreateUserAttempt {
  email: string
  password: string
  name: string
}

export const useCreateUser = () => {
  const _CreateAccount = async (email: string, password: string, name: string) => {
    const { post } = useHttp()

    const request = {
      email,
      password,
      name
    }

    return await post(`/users`, request)
  }

  const mutation = useMutation<User, HttpError , CreateUserAttempt>((attempt: CreateUserAttempt) => {
    return _CreateAccount(attempt.email, attempt.password, attempt.name)
  })

  return {
    mutation
  } as const
}
