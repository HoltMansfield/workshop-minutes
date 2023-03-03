import { Box, Chip, Grid, IconButton, ListItemIcon, ListItemText, MenuItem, Paper } from "@mui/material"
import { grey } from "@mui/material/colors"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SwipeIcon from '@mui/icons-material/Swipe'
import { Step } from "src/DMS/collections/project"
import { useRef, useState } from "react"
import { useProjectState } from "src/hooks/state/useProjectState"
import { useUpdateProject } from "src/DMS/hooks/api/project/useUpdateProject"
import { useToaster } from "src/hooks/useToaster"
import { MeatBallMenu } from "src/app/components/MeatballMenu"
import { useGetTimeDialog } from "src/app/dialogs/time/useGetTimeDialog"
import { StepTimer } from "src/routes/selected-project/step/StepTimer"
import { useNotification } from "src/routes/selected-project/step/useNotification"

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
  const intervalIdRef = useRef(null)
  const { selectedProject, setSelectedProject } = useProjectState()
  const { mutation } = useUpdateProject()
  const { displayMutationError } = useToaster()
  const { notify } = useNotification()

  const handleStart = () => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000)
    intervalIdRef.current = intervalId
  }

  const handleStop = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
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
      onSuccess: () => {
        setSelectedProject({...selectedProject, steps: updatableSteps })
      },
      onError: displayMutationError
    })
  }

  const clearTimer = () => {
    const updatableStep = {...step}
    updatableStep.timer = null
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
      onSuccess: () => {
        setSelectedProject({...selectedProject, steps: updatableSteps })
      },
      onError: displayMutationError
    })
  }

  const handleTimeEntry = (newTimer: number) => {
    if (newTimer === 0) return
    const updatableStep = {...step}
    updatableStep.timer = newTimer * 1000
    const updatableSteps = selectedProject.steps.filter(s => s.name !== step.name)
    updatableSteps.push(updatableStep)

    setTimeout(() => {
      notify('Timer done', `Timer up for: ${step.name}`)
      clearTimer()
    }, newTimer * 1000)

    const updateRequest = {
      query: { _id: { $oid: selectedProject._id  } },
      update: {
        "$set": {
          steps: updatableSteps
        }
      }
    }
    mutation.mutate(updateRequest, {
      onSuccess: () => {
        setSelectedProject({...selectedProject, steps: updatableSteps })
      },
      onError: displayMutationError
    })
  }

  const handleTimeOverride = (newTimer: number) => {
    const updatableStep = {...step}
    updatableStep.secondsElapsed = newTimer
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
      onSuccess: () => {
        setSelectedProject({...selectedProject, steps: updatableSteps })
        setSeconds(newTimer)
      },
      onError: displayMutationError
    })
  }

  const { setGetTimeDialogOpen: setGetTimeForTimerDialogOpen, GetTimeDialog: GetTimeForTimerDialog } = useGetTimeDialog({
    text: `Create timer for: ${step.name}`,
    value: step.timer,
    onOkClicked: handleTimeEntry
  })

  const { setGetTimeDialogOpen: setGetTimeForOverrideDialogOpen, GetTimeDialog: GetTimeForOverrideDialog } = useGetTimeDialog({
    text: `Create timer for: ${step.name}`,
    value: step.timer,
    onOkClicked: handleTimeOverride
  })

  const items = [
    <MenuItem key="delete" onClick={handleDelete}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>,
    <MenuItem key="set-timer" onClick={() => setGetTimeForTimerDialogOpen(true)}>
      <ListItemIcon>
        <AccessTimeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Set Timer</ListItemText>
    </MenuItem>,
    <MenuItem key="manual-override" onClick={() => setGetTimeForOverrideDialogOpen(true)}>
      <ListItemIcon>
        <SwipeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Manually enter time</ListItemText>
    </MenuItem>
  ]

  return (
    <Paper sx={{ display: 'flex', flexGrow: 1, backgroundColor: grey[200] }} variant="outlined">
      <Grid container spacing={0}>
        <Grid item xs={12} md={3}>
          <Box display="flex" m={1}>
            <Box display="flex" fontSize="0.9rem" fontWeight="bold" marginTop={0.2}>
              <Chip label={_getMinutesLabel(seconds)} color={intervalIdRef.current ? 'primary' : 'default'} />
            </Box>
            <Box display="flex" mt={0.8} ml={1}>
              {step.name}
            </Box>
            <Box display="flex" ml={0.5}>
              <StepTimer step={step} />
            </Box>
            <Box display="flex" marginLeft="auto">
              <MeatBallMenu items={items} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" m={1}>
            <Box display="flex" onClick={handleStart}>
              <IconButton><PlayCircleFilledIcon fontSize="large" /></IconButton>
            </Box>
            <Box display="flex" onClick={handleStop}>
              <IconButton><StopCircleIcon fontSize="large" /></IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <GetTimeForTimerDialog />
      <GetTimeForOverrideDialog />
    </Paper>
  )
}
