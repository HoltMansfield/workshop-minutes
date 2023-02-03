import { Box } from "@mui/material"
import { useProjectState } from "../../hooks/state/useProjectState"
import { Header } from "./Header"
import { LoadSelectedProject } from "./LoadSelectedProject"
import { NoContent } from "./NoContent"
import { ProjectStatus } from "./ProjectStatus"


export const SelectedProject = () => {
  const { selectedProject, selectedProjectId } = useProjectState()

  if (!selectedProject && !selectedProjectId) return <NoContent />

  if (!selectedProject && selectedProjectId) return <LoadSelectedProject selectedProjectId={selectedProjectId} />

  if (!selectedProject) {
    return null
  }

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Header selectedProject={selectedProject} />
      <ProjectStatus selectedProject={selectedProject} />
    </Box>
  )
}
