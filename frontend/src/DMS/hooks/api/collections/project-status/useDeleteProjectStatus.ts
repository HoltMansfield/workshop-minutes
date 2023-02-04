import { useMutation } from 'react-query'
import { ProjectStatus } from '../../../../collections/projectStatus'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../useCollection"

export const useDeleteProjectStatus = () => {
  const { deleteOne } = useCollection('projectStatuses')

  const _request = async (query: object): Promise<ProjectStatus> => {
    const result = await deleteOne(query)
    return result as ProjectStatus 
  }
 
  const mutation = useMutation<ProjectStatus, HttpError, any, () => void>(async document => {
    return _request(document)
  })

  return {
    mutation
  } as const
}
