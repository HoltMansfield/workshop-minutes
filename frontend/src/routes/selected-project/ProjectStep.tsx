import { Box, Chip, Grid, IconButton, ListItemIcon, ListItemText, MenuItem, Paper } from "@mui/material"
import { grey } from "@mui/material/colors"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SwipeIcon from '@mui/icons-material/Swipe'
import { Step } from "src/DMS/collections/project"
import { useState } from "react"
import { useProjectState } from "src/hooks/state/useProjectState"
import { useUpdateProject } from "src/DMS/hooks/api/collections/project/useUpdateProject"
import { useToaster } from "src/hooks/useToaster"
import { MeatBallMenu } from "src/app/components/MeatballMenu"

interface ProjectStepProps {
  step: Step
}

const _getMinutesLabel = (secondsElapsed: Number) => {
  if (!secondsElapsed) {
    return 'Not Started'
  }

  const minutesLabel = Number(secondsElapsed) / 60
  const seconds = Number(secondsElapsed) % 60
  let secondsLabel = String(seconds)

  if (seconds < 10) {
    secondsLabel = `0${secondsLabel}`
  }

  return `${Math.floor(minutesLabel)}:${secondsLabel}`
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

  const handleDelete = () => {
    const updatableSteps = selectedProject.steps.filter(s => s.name !== step.name)
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

  const handleSetTimer = () => {

  }

  const items = [
    <MenuItem key="delete" onClick={handleDelete}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>,
    <MenuItem key="set-timer" onClick={handleSetTimer}>
      <ListItemIcon>
        <AccessTimeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Set Timer</ListItemText>
    </MenuItem>,
    <MenuItem key="manual-override">
      <ListItemIcon>
        <SwipeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Manually enter time</ListItemText>
    </MenuItem>
  ]

  return (
    <Paper sx={{ display: 'flex', flexGrow: 1, backgroundColor: grey[200] }} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box display="flex" m={1}>
            <Box display="flex" fontSize="0.9rem" fontWeight="bold" marginTop={0.2}>
              <Chip label={_getMinutesLabel(seconds)} />
            </Box>
            <Box display="flex" mt={0.8} ml={1}>
              {step.name}
            </Box>
            <Box display="flex" marginLeft="auto">
              <MeatBallMenu items={items} />
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
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
