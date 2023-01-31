import { Box } from "@mui/material"
import { useFindProject } from "../../DMS/hooks/logic/project/useFindProject"
import { useProjectState } from "../../hooks/state/useProjectState"

interface LoadSelectedProjectProps {
  selectedProjectId: string
}

export const LoadSelectedProject = ({ selectedProjectId }: LoadSelectedProjectProps) => {
  const { status, error, data } = useFindProject({ _id: { $oid: selectedProjectId }})
  const { setSelectedProject } = useProjectState()

  if (data) {
    setSelectedProject(data)
    return null
  }

  return (
    <Box>
      <div>status: { status }</div>
      { error &&  <div>error: { error.message }</div>}
    </Box>
  )
}
