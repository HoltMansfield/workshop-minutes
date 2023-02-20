import { useMutation } from 'react-query'
import { Project } from '../../../../collections/project'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../useCollection"

export const useUpdateProject = () => {
  const { updateOne } = useCollection('projects')

  const _request = async (query: object, update: object): Promise<Project> => {
    const result = await updateOne(query, update)
    return result as Project 
  }
 
  const mutation = useMutation<Project, HttpError, { query: object, update: object }, () => void>(async document => {
    return _request(document.query, document.update)
  })

  return {
    mutation
  } as const
}
