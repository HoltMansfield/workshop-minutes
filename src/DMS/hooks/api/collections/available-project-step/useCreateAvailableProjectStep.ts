import { useMutation } from 'react-query'
import { AvailableProjectStep } from '../../../../collections/available-project-step'
import { HttpError } from '../../../../types/api'
import { useCollection } from "../../useCollection"

export const useCreateAvailableProjectStep = () => {
  const { insertOne } = useCollection('availableProjectSteps')

  const _request = async (document: AvailableProjectStep): Promise<AvailableProjectStep> => {
    const result = await insertOne(document)
    return result as AvailableProjectStep 
  }
 
  const mutation = useMutation<AvailableProjectStep, HttpError, AvailableProjectStep, () => void>(async document => {
    const response = await _request(document)
    //@ts-ignore
    const _id = response.insertedId

    return { ...document, _id }
  })

  return {
    mutation
  } as const
}
