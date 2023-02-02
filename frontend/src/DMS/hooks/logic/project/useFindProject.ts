import { useQuery } from 'react-query'
import { Project } from '../../../collections/project'
import { HttpError } from '../../../types/api'
import { useCollection } from "../../api/useCollection"

export const useFindProject = (query: object) => {
  const { findOne } = useCollection('projects')

  const _fetcher = async (): Promise<Project> => {
    const result = await findOne(query)
    return result as Project 
  }

  const { status, error, data } = useQuery<Project, HttpError>(
    ['findUser', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
