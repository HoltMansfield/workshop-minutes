import { Box } from "@mui/material"
import { useEffect } from "react"
import { useToast } from "react-toastify"
import { useFindProjectStatuses } from "../DMS/hooks/api/collections/project-status/useFindProjectStatuses"
import { useApplicationState } from "../hooks/state/useApplicationState"
import { useProjectState } from "../hooks/state/useProjectState"
import { useToaster } from "../hooks/useToaster"


export const FetchProjectStatuses = () => {
  const { loggedInUser } = useApplicationState()
  const { error, data } = useFindProjectStatuses({ userId: loggedInUser?._id })
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
