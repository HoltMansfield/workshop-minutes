import { Box, Grid, IconButton, Paper } from "@mui/material"
import { grey } from "@mui/material/colors"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import { Step } from "src/DMS/collections/project"
import { useState } from "react"
import { useProjectState } from "src/hooks/state/useProjectState"
import { useUpdateProject } from "src/DMS/hooks/api/collections/project/useUpdateProject"
import { useToaster } from "src/hooks/useToaster"

interface ProjectStepProps {
  step: Step
}

const _getMinutesLabel = (secondsElapsed: Number) => {
  if (!secondsElapsed) {
    return '(Not Started)'
  }

  const minutesLabel = Number(secondsElapsed) / 60
  const seconds = Number(secondsElapsed) % 60
  let secondsLabel = String(seconds)

  if (seconds < 10) {
    secondsLabel = `0${secondsLabel}`
  }

  return `(${Math.floor(minutesLabel)}:${secondsLabel})`
}

export const ProjectStep = ({ step }: ProjectStepProps) => {
  const [seconds, setSeconds] = useState(step.secondsElapsed || 0)
  const [intervalId, setIntervalId] = useState(null)
  const { selectedProject, setSelectedProject } = useProjectState()
  const { mutation } = useUpdateProject()
  const { displayMutationError } = useToaster()

  const handleStart = () => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000)
    setIntervalId(intervalId)
  }

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }

    const updatableStep = {...step}
    updatableStep.secondsElapsed = seconds
    const updatableSteps = selectedProject.steps.filter(s => s.name !== step.name)
    updatableSteps.push(updatableStep)

    const updateRequest = {
      query: { _id: { $oid: selectedProject._id  } },
      update: {
        "$set": {
          steps: updatableSteps
        }
      }
    }

    mutation.mutate(updateRequest, {
      onSuccess: (data) => {
        setSelectedProject({...selectedProject, steps: updatableSteps })
      },
      onError: displayMutationError
    })
  }

  return (
    <Paper sx={{ display: 'flex', flexGrow: 1, backgroundColor: grey[200] }} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box display="flex" m={1}>
            <Box display="flex">
              {step.name}
            </Box>
            <Box display="flex" ml={1} fontSize="0.9rem" fontWeight="bold" marginTop={0.2}>
              {_getMinutesLabel(seconds)}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" m={1}>
            <Box display="flex" onClick={handleStart}>
              <IconButton><PlayCircleFilledIcon /></IconButton>
            </Box>
            <Box display="flex" onClick={handleStop}>
              <IconButton><StopCircleIcon /></IconButton>
            </Box>
            <Box display="flex">
              <IconButton><SkipNextIcon /></IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
