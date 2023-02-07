import { useEffect } from "react"
import { useFindAvailableProjectSteps } from "src/DMS/hooks/api/collections/available-project-step/useFindAvailableProjectSteps"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"


export const FetchAvailableProjectSteps = () => {
  const { loggedInUser } = useApplicationState()
  const { error, data } = useFindAvailableProjectSteps({ userId: loggedInUser?._id })
  const { setAvailableProjectSteps } = useProjectState()
  const { toastError } = useToaster()


  useEffect(() => {
    if (data) {
      setAvailableProjectSteps(data)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      toastError("Could not load available project steps. Please reload the page.")
    }
  }, [error])

  return null
}
