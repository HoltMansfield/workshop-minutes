import { useEffect } from "react"
import { User } from "src/DMS/collections/user"
import { useFindProjects } from "../../DMS/hooks/api/project/useFindProjects"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"

interface Props {
  loggedInUser: User
}

export const FetchProjects = ({ loggedInUser }: Props) => {
  const { setProjects } = useProjectState()
  const { error, data } = useFindProjects({ userId: loggedInUser._id })
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
