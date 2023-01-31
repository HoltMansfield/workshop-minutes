import { useMutation } from 'react-query'
import { Project } from '../../../collections/project'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../api/useCollection"

export const useCreateProject = () => {
  const { insertOne } = useCollection('projects')

  const _request = async (document: Project): Promise<Project> => {
    const result = await insertOne(document)
    return result as Project 
  }
 
  const mutation = useMutation<Project, HttpError, Project, () => void>(async document => {
    const response = await _request(document)
    //@ts-ignore
    const _id = response.insertedId

    return { ...document, _id }
  })
   
  // const mutation = useMutation<Project, HttpError, Project, () => void>(document => {
  //   return _request(document)
  // })

  return {
    mutation
  } as const
}
