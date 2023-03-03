import { useQuery } from 'react-query'
import { ProjectStatus } from '../../../collections/projectStatus'
import { HttpError } from '../../../types/api'
import { useCollection } from "../../core/useCollection"

export const useFindProjectStatuses = (query: object) => {
  const { find } = useCollection('projectStatuses')

  const _fetcher = async (): Promise<ProjectStatus[]> => {
    const result = await find(query)
    return result as ProjectStatus[] 
  }

  const { status, error, data } = useQuery<ProjectStatus[], HttpError>(
    ['findProjectStatuses', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
