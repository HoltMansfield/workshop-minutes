import { Box } from "@mui/material"
import { Step } from "src/DMS/collections/project"
import { ProjectStep } from "src/routes/selected-project/ProjectStep"

interface ProjectStepsProps {
  steps: Step[]
}

export const ProjectSteps = ({ steps }: ProjectStepsProps) => {

  const renderSteps = () => steps.map((step, index) => {
    return (
      <Box display="flex" key={`step-number-${index}`}>
        <ProjectStep step={step} />
      </Box>
    )
  })

  return (
    <Box display="flex" flexDirection="column">
      {renderSteps()}
    </Box>
  )
}
