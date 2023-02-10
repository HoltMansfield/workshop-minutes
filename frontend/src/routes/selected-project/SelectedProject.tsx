import { Box } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"
import { useProjectState } from "../../hooks/state/useProjectState"
import { Header } from "./Header"
import { LoadSelectedProject } from "./LoadSelectedProject"
import { NoContent } from "./NoContent"
import { ProjectStatus } from "./ProjectStatus"


export const SelectedProject = () => {
  const { selectedProject, selectedProjectId } = useProjectState()
  const navigate = useNavigate()

  if (!selectedProject && !selectedProjectId) return <NoContent />

  if (!selectedProject) {
    return null
  }

  if (!selectedProject.steps) {
    navigate('/create-project/step-2')
  }

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Header selectedProject={selectedProject} />
      <ProjectStatus selectedProject={selectedProject} />
    </Box>
  )
}
