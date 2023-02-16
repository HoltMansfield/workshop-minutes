import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import HourGlassTopIcon from '@mui/icons-material/HourGlassTop'
import HourGlassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Step } from "src/DMS/collections/project"

interface StepTimerProps {
  step: Step
}

export const StepTimer = ({ step }: StepTimerProps) => {
  const [showBottom, setShowBottom] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowBottom(!showBottom)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })


  if (!step.timer) return null

  return (
    <Box display="flex" mt={0.6}>
      {showBottom && <HourGlassBottomIcon fontSize="small" />}
      {!showBottom && <HourGlassTopIcon fontSize="small" />}
    </Box>
  )
}
