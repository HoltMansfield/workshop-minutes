import { useQuery } from 'react-query'
import { Project } from '../../../collections/project'
import { HttpError } from '../../../types/api'
import { useCollection } from "../../api/useCollection"

export const useFindProjects = (query: object) => {
  const { find } = useCollection('projects')

  const _fetcher = async (): Promise<Project[]> => {
    const result = await find(query)
    return result as Project[] 
  }

  const { status, error, data } = useQuery<Project[], HttpError>(
    ['findUsers', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
