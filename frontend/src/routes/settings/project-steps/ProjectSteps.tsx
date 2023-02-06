import { Box, Button, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material"
import { useState } from "react"
import { grey } from "@mui/material/colors"
import { User } from "../../../DMS/collections/user"
import { useProjectState } from "../../../hooks/state/useProjectState"
import { useToaster } from "../../../hooks/useToaster"
import { FormWrapper } from "../../../app/forms/FormWrapper"
import { ProjectStepMenuFunctions } from "./ProjectStepMenuFunctions"
import { ServerStates } from "../../../types/application"
import { useApplicationState } from "../../../hooks/state/useApplicationState"
import { useServerState } from "../../../hooks/useServerState"
import { AvailableProjectStep } from "src/DMS/collections/available-project-step"
import { useCreateAvailableProjectStep } from "src/DMS/hooks/api/collections/available-project-step/useCreateAvailableProjectStep"


interface ProjectStepsProps {
  loggedInUser: User
}

export const ProjectSteps = ({ loggedInUser }: ProjectStepsProps) => {
  const { mutation: createMutation } = useCreateAvailableProjectStep()
  const { availableProjectSteps, setAvailableProjectSteps } = useProjectState()
  const [newStatus, setNewStatus] = useState<string>('')
  const { displayMutationError } = useToaster()
  const [selectedAvailableProjectStep, setSelectedAvailableProjectStep] = useState<AvailableProjectStep | null>(null)
  const { serverState, setServerState } = useApplicationState()
  const { getServerStateColor } = useServerState()

  const handleAddStatus = () => {
    const sortOrder = availableProjectSteps ? availableProjectSteps.length + 1 : 1
    //ToDo: check for existing status with same name
    setServerState(ServerStates.saving)
    createMutation.mutate({ userId: String(loggedInUser._id), name: String(newStatus), sortOrder }, {
      onSuccess: (data) => {
        const existingStatuses = availableProjectSteps ? [...availableProjectSteps] : []
        setAvailableProjectSteps([...existingStatuses, data])
        setNewStatus('')
        setServerState(ServerStates.loaded)
      },
      onError: (error) => {
        displayMutationError(error, null, null)
        setServerState(ServerStates.error)
      }
    })
  }

  const renderList = () => {
    if (availableProjectSteps !== null && availableProjectSteps.length === 0) {
      return null
    }

    return availableProjectSteps?.map(step => {
      return (
        <ListItem
          disablePadding
          key={step._id}
          secondaryAction={
            <Box display="flex">
              <ProjectStepMenuFunctions
                step={step}
                selectedAvailableProjectStep={selectedAvailableProjectStep as AvailableProjectStep}
                setSelectedAvailableProjectStep={setSelectedAvailableProjectStep}
                availableProjectSteps={availableProjectSteps}
                setServerState={setServerState} />
            </Box>
          }
        >
          <ListItemButton>
            <ListItemText primary={step.name} />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  return (
    <FormWrapper>
      <Box display="flex" flexDirection="column" flexGrow={1}>
      <Box flexGrow={1}>
            <Box display="flex" fontWeight="bold" ml={2} color={grey[500]}>
              Available Project Steps
            </Box>
            {(availableProjectSteps !== null && availableProjectSteps.length > 0) && (
              <Box sx={{ border: `2px solid ${getServerStateColor(serverState)}` }} mt={1}>
                <List>
                  {renderList()}
                </List>
              </Box>
            )}
            {(availableProjectSteps !== null && availableProjectSteps.length === 0) && (
              <Box mt={3}>
                Please use the text box below to create your first Project Step
              </Box>
            )}
          </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" mt={3}>
            <TextField fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
          </Box>
          <Box display="flex" mt={2}>
            <Button variant="outlined" onClick={handleAddStatus}>Add</Button>
          </Box>
        </Box>
      </Box>
    </FormWrapper>
  )
}


