import { Box } from "@mui/material"
import { Step } from "src/DMS/collections/project"
import { ProjectStep } from "src/routes/selected-project/step/ProjectStep"

interface ProjectStepsProps {
  steps: Step[]
}

export const ProjectSteps = ({ steps }: ProjectStepsProps) => {

  const renderSteps = () => steps.sort((a, b) => a.sortOrder-b.sortOrder).map((step, index) => {
    return (
      <Box display="flex" key={`step-number-${index}`} m={1} flexGrow={1}>
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