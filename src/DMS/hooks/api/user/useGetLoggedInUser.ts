import { useMutation, useQuery } from "react-query"
import { User } from "src/DMS/collections/user"
import { getBaseUrl } from "src/DMS/hooks/core/get-base-url"
import { useHttp } from "src/DMS/hooks/core/useHttp"
import { HttpError } from "src/DMS/types/api"


export const useGetLoggedInUser = () => {
  const { get } = useHttp()
  const base = getBaseUrl()

  const _fetcher = async () => {
    // If our cookie is not expired we will get a user back
    const user = await get('/users')
    return user
  }

  const { status, error, data } = useQuery<User, HttpError>(
    ['cookieUser', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
