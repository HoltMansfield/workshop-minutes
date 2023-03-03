import { useEffect } from "react"
import { User } from "src/DMS/collections/user"
import { useFindProjectStatuses } from "../../DMS/hooks/api/project-status/useFindProjectStatuses"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"

interface Props {
  loggedInUser: User
}

export const FetchProjectStatuses = ({ loggedInUser }: Props) => {
  const { error, data } = useFindProjectStatuses({ userId: loggedInUser._id })
  const { setProjectStatuses } = useProjectState()
  const { toastError } = useToaster()

  useEffect(() => {
    if (data) {
      setProjectStatuses(data)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      toastError("Could not load project statuses. Please reload the page.")
    }
  }, [error])

  return null
}
