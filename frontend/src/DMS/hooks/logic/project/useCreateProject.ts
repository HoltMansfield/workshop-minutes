import { useMutation } from 'react-query'
import { User } from '../../../collections/user'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../api/useCollection"

export const useCreateProject = () => {
  const { insertOne } = useCollection('projects')

  const _request = async (document: User): Promise<User> => {
    const result = await insertOne(document)
    return result as User 
  }
 
  const mutation = useMutation<User, HttpError, User, () => void>(document => {
    return _request(document)
  })

  return {
    mutation
  } as const
}
