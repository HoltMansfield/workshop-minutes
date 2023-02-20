import { toast } from 'react-toastify'
import { HttpError } from "../DMS/types/api"

const OPTIONS = {
  autoClose: 3500,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light'
}

export const useToaster = () => {
  const displayMutationError = (error: HttpError, variables: any, context: unknown) => {
    //@ts-expect-error
    toast.error(error.message, {
      ...OPTIONS,
      position: "top-center"
    })
  }

  const toastError = (message: string) => {
    //@ts-expect-error
    toast.error(message, {
      ...OPTIONS,
      position: "top-center"
    })
  }

  const success = (message: string) => {
    //@ts-expect-error
    toast.success(message, {
      ...OPTIONS,
      position: "bottom-right"
    })
  }

  return {
    displayMutationError,
    toastError,
    success
  } as const
}
