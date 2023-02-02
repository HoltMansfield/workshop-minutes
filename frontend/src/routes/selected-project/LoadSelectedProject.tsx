import { Box } from "@mui/material"
import { useEffect } from "react"
import { Spinner } from "../../app/Spinner"
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

  if (status === 'loading') {
    return <Spinner />
  }

  return (
    <Box>
      { error &&  <div>error: { error.message }</div>}
    </Box>
  )
}
