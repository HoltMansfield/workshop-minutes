import { useQuery } from 'react-query'
import { AvailableProjectStep } from '../../../../collections/available-project-step'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../useCollection"

export const useFindAvailableProjectStep = (query: object) => {
  const { findOne } = useCollection('availableProjectSteps')

  const _fetcher = async (): Promise<AvailableProjectStep> => {
    const result = await findOne(query)
    return result as AvailableProjectStep 
  }

  const { status, error, data } = useQuery<AvailableProjectStep, HttpError>(
    ['findAvailableProjectStep', { _id: 1 }],
    _fetcher
  )

  return {
    status, error, data
  } as const
}
