import { Box } from "@mui/material"
import { Step } from "src/DMS/collections/project"

interface StepTimerProps {
  step: Step
}

export const StepTimer = ({ step }: StepTimerProps) => {
  if (!step.timer) return null

  return (
    <Box display="flex">
      Timer Started
    </Box>
  )
}
