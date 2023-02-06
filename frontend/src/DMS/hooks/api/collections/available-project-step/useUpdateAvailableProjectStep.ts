import { useMutation } from 'react-query'
import { AvailableProjectStep } from '../../../../collections/available-project-step'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../useCollection"

export const useUpdateAvailableProjectStep = () => {
  const { updateOne } = useCollection('availableProjectSteps')

  const _request = async (query: object, update: object): Promise<AvailableProjectStep> => {
    const result = await updateOne(query, update)
    return result as AvailableProjectStep 
  }
 
  const mutation = useMutation<AvailableProjectStep, HttpError, { query: object, update: object }, () => void>(async document => {
    return _request(document.query, document.update)
  })

  return {
    mutation
  } as const
}
