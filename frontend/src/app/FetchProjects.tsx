import { useEffect } from "react"
import { useFindProjects } from "../DMS/hooks/api/collections/project/useFindProjects"
import { useApplicationState } from "../hooks/state/useApplicationState"
import { useProjectState } from "../hooks/state/useProjectState"

export const FetchProjects = () => {
  const { loggedInUser } = useApplicationState()
  const { setProjects } = useProjectState()
  const { data } = useFindProjects({ userId: loggedInUser?._id })

  useEffect(() => {
    if (data) {
      setProjects(data)
    }
  },[data])
 
  return null
}
