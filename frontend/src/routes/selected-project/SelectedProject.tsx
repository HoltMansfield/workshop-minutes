import { Box } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"
import { ProjectSteps } from "src/routes/selected-project/ProjectSteps"
import { useProjectState } from "../../hooks/state/useProjectState"
import { Header } from "./Header"
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
      <Box display="flex" mt={2}>
        <ProjectSteps steps={selectedProject.steps} />
      </Box>
    </Box>
  )
}
