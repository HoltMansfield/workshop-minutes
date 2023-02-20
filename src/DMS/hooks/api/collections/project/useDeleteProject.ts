import { useMutation } from 'react-query'
import { Project } from '../../../../collections/project'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../useCollection"

export const useDeleteProject = () => {
  const { deleteOne } = useCollection('projects')

  const _request = async (query: object): Promise<Project> => {
    const result = await deleteOne(query)
    return result as Project 
  }
 
  const mutation = useMutation<Project, HttpError, any, () => void>(async document => {
    return _request(document)
  })

  return {
    mutation
  } as const
}
