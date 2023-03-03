import { useMutation } from 'react-query'
import { ProjectStatus } from '../../../collections/projectStatus'
import { HttpError } from '../../../types/api'
import { useCollection } from "../../core/useCollection"

export const useCreateProjectStatus = () => {
  const { insertOne } = useCollection('projectStatuses')

  const _request = async (document: ProjectStatus): Promise<ProjectStatus> => {
    const result = await insertOne(document)
    return result as ProjectStatus 
  }
 
  const mutation = useMutation<ProjectStatus, HttpError, ProjectStatus, () => void>(async document => {
    const response = await _request(document)
    //@ts-ignore
    const _id = response.insertedId

    return { ...document, _id }
  })

  return {
    mutation
  } as const
}
