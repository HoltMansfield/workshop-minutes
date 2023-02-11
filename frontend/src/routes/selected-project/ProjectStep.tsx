import { Box, Grid, IconButton, Paper } from "@mui/material"
import { grey } from "@mui/material/colors"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import { Step } from "src/DMS/collections/project"

interface ProjectStepProps {
  step: Step
}

const _getMinutesLabel = (secondsElapsed: Number) => {
  if (!secondsElapsed) {
    return '(Not Started)'
  }
}

export const ProjectStep = ({ step }: ProjectStepProps) => {
  return (
    <Paper elevation={2} sx={{ display: 'flex', flexGrow: 1, backgroundColor: grey[200] }} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" m={1}>
            <Box display="flex">
              {step.name}
            </Box>
            <Box display="flex" ml={1} fontSize="0.9rem">
              {_getMinutesLabel(step.secondsElapsed)}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" m={1}>
            <Box display="flex">
              <IconButton><PlayCircleFilledIcon /></IconButton>
            </Box>
            <Box display="flex">
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
