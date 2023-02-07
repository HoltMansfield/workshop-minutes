import { useEffect } from "react"
import { useFindProjects } from "../../DMS/hooks/api/collections/project/useFindProjects"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"

export const FetchProjects = () => {
  const { loggedInUser } = useApplicationState()
  const { setProjects } = useProjectState()
  const { error, data } = useFindProjects({ userId: loggedInUser?._id })
  const { toastError } = useToaster()

  useEffect(() => {
    if (data) {
      setProjects(data)
    }
  },[data])

  useEffect(() => {
    if (error) {
      toastError("Could not load project statuses. Please reload the page.")
    }
  }, [error])
 
  return null
}
