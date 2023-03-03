import { useQuery } from 'react-query'
import { ProjectStatus } from '../../../collections/projectStatus'
import { HttpError } from '../../../types/api'
import { useCollection } from "../../core/useCollection"

export const useFindProjectStatus = (query: object) => {
  const { findOne } = useCollection('projectStatuses')

  const _fetcher = async (): Promise<ProjectStatus> => {
    const result = await findOne(query)
    return result as ProjectStatus 
  }

  const { status, error, data } = useQuery<ProjectStatus, HttpError>(
    ['findProjectStatus', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
