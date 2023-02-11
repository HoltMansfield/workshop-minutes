import { Box } from "@mui/material"
import { Step } from "src/DMS/collections/project"

interface ProjectStepProps {
  step: Step
}

export const ProjectStep = ({ step }: ProjectStepProps) => {
  return (
    <Box display="flex">
      {step.name}
    </Box>
  )
}
