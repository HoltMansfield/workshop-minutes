import { Box, Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { NoFlicker } from "src/app/components/NoFlicker"
import { Project, Step } from "src/DMS/collections/project"
import { useUpdateProject } from "src/DMS/hooks/api/collections/project/useUpdateProject"
import { useToaster } from "src/hooks/useToaster"
import { RenderHttpError } from "../../app/components/RenderHttpError"
import { Spinner } from "../../app/Spinner"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"


export const CreateProjectStep2 = () => {
  const { mutation } = useUpdateProject()
  const { setSelectedProject, selectedProject, availableProjectSteps } = useProjectState()
  const navigate = useNavigate()
  const [selectedStepIds, setSelectedStepIds] = useState<string[] | null>(null)
  const { displayMutationError } = useToaster()

  useEffect(() => {
    if (availableProjectSteps) {
      setSelectedStepIds(availableProjectSteps.map(step => step._id))
    }
  },[availableProjectSteps])

  const handleUpdateProject = () => {
    const steps = availableProjectSteps.filter(as => selectedStepIds.includes(as._id)) as unknown as Step[]
    const updateRequest = {
      query: { _id: { $oid: selectedProject._id  } },
      update: {
        "$set": {
          steps: steps
        }
      }
    }
    mutation.mutate(updateRequest, {
      onSuccess: () => {
        setSelectedProject({...selectedProject, steps })
        navigate('/')
      },
      onError: displayMutationError
    })
  }

  const handleToggleStep = (id: string) => {
    const step = selectedStepIds?.find(x => x === id)

    if (step) {
      const newStepIds = selectedStepIds?.filter(x => x !== id)
      setSelectedStepIds(newStepIds)
    } else {
      setSelectedStepIds([...selectedStepIds, id])
    }
  }

  const shouldBeChecked = (id: string) => {
    const step = selectedStepIds?.find(x => x === id)
    return !!step
  }

  const renderAvailableSteps = () => {
    return availableProjectSteps?.map(step => {
      return (
        <ListItem
          key={step._id}
          disablePadding
        >
          <ListItemButton role={undefined} onClick={() => handleToggleStep(step._id)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={shouldBeChecked(step._id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText id={step._id} primary={step.name} />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  if (mutation.isLoading) {
    return <Spinner />
  }

  if (!availableProjectSteps || availableProjectSteps.length === 0) {
    return (
      <NoFlicker>
        <Box display="flex" flexDirection="column">
          <Box display="flex" fontWeight="bold" fontSize="1.3rem" mt={2}>
            Hi there new user!
          </Box>
          <Box display="flex" mt={2}>
            Before you can create a project you need to create the available project steps
          </Box>
          <Box display="flex" mt={2}>
            <Link to='/settings/1'>Click here to create project steps</Link>
          </Box>
        </Box>
      </NoFlicker>
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      {mutation.isError && (
        <RenderHttpError message={mutation.error.message} />
      )}
      <Box display="flex" fontWeight="bold" fontSize="1.2rem">
        Create Project Step 2
      </Box>
      <Box display="flex" mt={4} flexGrow={1} fontSize="1.1rem">
        <Box display="flex">Add Steps to project: </Box>
        <Box display="flex" ml={1} fontWeight="bold">{selectedProject?.name}</Box>
      </Box>
      <Box display="flex" mt={2}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: grey[200] }}>
          {renderAvailableSteps()}
        </List>
      </Box>
      <Box display="flex" flexGrow={1} mt={1} mb={1}>
        <Button fullWidth onClick={handleUpdateProject} variant="outlined">Save</Button>
      </Box>
    </Box>
  )
}
