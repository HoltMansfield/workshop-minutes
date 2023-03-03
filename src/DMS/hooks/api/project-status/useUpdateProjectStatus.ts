import { useMutation } from 'react-query'
import { ProjectStatus } from '../../../collections/projectStatus'
import { HttpError } from '../../../types/api'
import { useCollection } from "../../core/useCollection"

export const useUpdateProjectStatus = () => {
  const { updateOne } = useCollection('projectStatuses')

  const _request = async (query: object, update: object): Promise<ProjectStatus> => {
    const result = await updateOne(query, update)
    return result as ProjectStatus 
  }
 
  const mutation = useMutation<ProjectStatus, HttpError, { query: object, update: object }, () => void>(async document => {
    return _request(document.query, document.update)
  })

  return {
    mutation
  } as const
}
