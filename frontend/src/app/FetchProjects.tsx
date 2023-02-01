import { useFindProjects } from "../DMS/hooks/logic/project/useFindProjects"
import { useApplicationState } from "../hooks/state/useApplicationState"
import { useProjectState } from "../hooks/state/useProjectState"

export const FetchProjects = () => {
  const { loggedInUser } = useApplicationState()
  const { setProjects } = useProjectState()
  const { data } = useFindProjects({ userId: loggedInUser?._id })

  if (data) {
    setProjects(data)
  }

  return null
}
