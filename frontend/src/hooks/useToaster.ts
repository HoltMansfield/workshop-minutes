import { toast } from 'react-toastify'
import { HttpError } from "../DMS/types/api"

export const useToaster = () => {
  const displayMutationError = (error: HttpError, variables: any, context: unknown) => {
    toast.error(error.message)
  }

  return {
    displayMutationError
  } as const
}
