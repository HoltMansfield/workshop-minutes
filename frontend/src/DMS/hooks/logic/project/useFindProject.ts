import { useQuery } from 'react-query'
import { User } from '../../../collections/user'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../api/useCollection"

export const useFindProject = (query: object) => {
  const { findOne } = useCollection('projects')

  const _fetcher = async (): Promise<User> => {
    const result = await findOne(query)
    return result as User 
  }

  const { status, error, data } = useQuery<User, HttpError>(
    ['findUser', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
