import { useQuery } from 'react-query'
import { AvailableProjectStep } from '../../../collections/available-project-step'
import { HttpError } from '../../../types/api'
import { useCollection } from "../../core/useCollection"

export const useFindAvailableProjectSteps = (query: object) => {
  const { find } = useCollection('availableProjectSteps')

  const _fetcher = async (): Promise<AvailableProjectStep[]> => {
    const result = await find(query)
    return result as AvailableProjectStep[] 
  }

  const { status, error, data } = useQuery<AvailableProjectStep[], HttpError>(
    ['findAvailableProjectSteps', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
