import { Box } from "@mui/material"
import { Project, Step } from "src/DMS/collections/project"
import { ProjectStep } from "src/routes/selected-project/step/ProjectStep"

interface ProjectStepsProps {
  selectedProject: Project
}

export const ProjectSteps = ({ selectedProject }: ProjectStepsProps) => {

  const renderSteps = () => selectedProject.steps.sort((a, b) => a.sortOrder-b.sortOrder).map((step, index) => {
    return (
      <Box key={`step-number-${index}`} display="flex" m={1} flexGrow={1}>
        <ProjectStep step={step} />
      </Box>
    )
  })

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      {renderSteps()}
    </Box>
  )
}
