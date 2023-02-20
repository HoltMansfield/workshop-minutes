import { useMutation } from 'react-query'
import { AvailableProjectStep } from '../../../../collections/available-project-step'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../useCollection"

export const useDeleteAvailableProjectStep = () => {
  const { deleteOne } = useCollection('availableProjectSteps')

  const _request = async (query: object): Promise<AvailableProjectStep> => {
    const result = await deleteOne(query)
    return result as AvailableProjectStep 
  }
 
  const mutation = useMutation<AvailableProjectStep, HttpError, any, () => void>(async document => {
    return _request(document)
  })

  return {
    mutation
  } as const
}
