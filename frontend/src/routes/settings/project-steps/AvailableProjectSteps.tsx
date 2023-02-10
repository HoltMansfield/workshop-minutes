import { Box, Button, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField } from "@mui/material"
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
import { ProjectStatus } from "src/DMS/collections/projectStatus"


interface ProjectStepsProps {
  loggedInUser: User
}

export const AvailableProjectSteps = ({ loggedInUser }: ProjectStepsProps) => {
  const { mutation: createMutation } = useCreateAvailableProjectStep()
  const { availableProjectSteps, setAvailableProjectSteps, projectStatuses } = useProjectState()
  const [newStatus, setNewStatus] = useState<string>('')
  const { displayMutationError } = useToaster()
  const [selectedAvailableProjectStep, setSelectedAvailableProjectStep] = useState<AvailableProjectStep | null>(null)
  const { serverState, setServerState } = useApplicationState()
  const { getServerStateColor } = useServerState()
  const [selectedProjectStatus, setSelectedProjectStatus] = useState<ProjectStatus | null>()

  const handleAddStep = () => {
    const sortOrder = availableProjectSteps ? availableProjectSteps.length + 1 : 1
    //ToDo: check for existing status with same name
    setServerState(ServerStates.saving)
    createMutation.mutate({
      userId: String(loggedInUser._id),
      name: String(newStatus),
      projectStatusId: selectedProjectStatus._id,
      sortOrder
    }, {
      onSuccess: (data) => {
        const existingStatuses = availableProjectSteps ? [...availableProjectSteps] : []
        setAvailableProjectSteps([...existingStatuses, data])
        setNewStatus('')
        setServerState(ServerStates.loaded)
      },
      onError: (error) => {
        displayMutationError(error, null, null)
        setServerState(ServerStates.error)
      },
      onSettled: () => {
        setSelectedProjectStatus(null)
      }
    })
  }

  const handleSelectProjectStatus = (e: any) => {
    const projectStatus = projectStatuses?.find(ps => ps._id === e.target.value)
    setSelectedProjectStatus(projectStatus)
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

  const renderProjectStatuses = () => {
    return projectStatuses?.map(status => {
      return (
        <MenuItem key={status._id} value={status._id} selected={status._id === selectedProjectStatus?._id}>
          {status.name}
        </MenuItem>
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
          <Box display="flex" mt={4}>
            <TextField label="New Step Name" fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
          </Box>
          <Box display="flex" m={2} mt={3}>
            Related Project Status (Optional)
          </Box>
          <Box display="flex" flexGrow={1}>
            <Select value={selectedProjectStatus ? selectedProjectStatus._id : ''} fullWidth onChange={handleSelectProjectStatus}>
              {renderProjectStatuses()}
            </Select>
          </Box>
          {!availableProjectSteps && (
            <Box display="flex" mt={1} fontSize="0.9rem">
              Your project steps can be related to a project status but its not required.
              Tip: You probably want at least 1 step per project status so you can track time.
            </Box>
          )}
          <Box display="flex" mt={2}>
            <Button variant="outlined" onClick={handleAddStep}>Add</Button>
          </Box>
        </Box>
      </Box>
    </FormWrapper>
  )
}


