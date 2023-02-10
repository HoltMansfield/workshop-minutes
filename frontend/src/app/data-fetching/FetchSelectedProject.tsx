import { useEffect } from "react"
import { useFindProject } from "src/DMS/hooks/api/collections/project/useFindProject"
import { useFindProjects } from "../../DMS/hooks/api/collections/project/useFindProjects"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"

interface Props {
  selectedProjectId: string
}

export const FetchSelectedProject = ({ selectedProjectId }: Props) => {
  const { setSelectedProject } = useProjectState()
  const { error, data } = useFindProject({ _id: { $oid: selectedProjectId} })
  const { toastError } = useToaster()

  useEffect(() => {
    if (data) {
      setSelectedProject(data)
    }
  },[data])

  useEffect(() => {
    if (error) {
      toastError("Could not load selected project. Please reload the page.")
    }
  }, [error])
 
  return null
}
