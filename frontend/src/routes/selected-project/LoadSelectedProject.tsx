import { Box } from "@mui/material"
import { useEffect } from "react"
import { useFindProject } from "../../DMS/hooks/logic/project/useFindProject"
import { useProjectState } from "../../hooks/state/useProjectState"

interface LoadSelectedProjectProps {
  selectedProjectId: string
}

export const LoadSelectedProject = ({ selectedProjectId }: LoadSelectedProjectProps) => {
  const { status, error, data } = useFindProject({ _id: { $oid: selectedProjectId }})
  const { setSelectedProject } = useProjectState()

  useEffect(() => {
    if (data) {
      setSelectedProject(data)
    }
  }, [data])

  return (
    <Box>
      <div>status: { status }</div>
      { error &&  <div>error: { error.message }</div>}
    </Box>
  )
}
