import { Box, Button, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material"
import { useState } from "react"
import { User } from "../../../DMS/collections/user"
import { useCreateProjectStatus } from "../../../DMS/hooks/api/collections/project-status/useCreateProjectStatus"
import { useProjectState } from "../../../hooks/state/useProjectState"
import { useToaster } from "../../../hooks/useToaster"
import { ProjectStatus } from "../../../DMS/collections/projectStatus"
import { FormWrapper } from "../../../app/forms/FormWrapper"
import { ProjectStatusMenuFunctions } from "./ProjectStatusMenuFunctions"

interface ProjectStatusesProps {
  loggedInUser: User
}

export const ProjectStatuses = ({ loggedInUser }: ProjectStatusesProps) => {
  const { mutation: createMutation } = useCreateProjectStatus()
  const { projectStatuses, setProjectStatuses } = useProjectState()
  const [newStatus, setNewStatus] = useState<string>('')
  const { displayMutationError } = useToaster()
  const [selectedProjectStatus, setSelectedProjectStatus] = useState<ProjectStatus | null>(null)

  const handleAddStatus = () => {
    const sortOrder = projectStatuses ? projectStatuses.length + 1 : 1
    //ToDo: check for existing status with same name
    createMutation.mutate({ userId: String(loggedInUser._id), name: String(newStatus), sortOrder }, {
      onSuccess: (data) => {
        const existingStatuses = projectStatuses ? [...projectStatuses] : []
        setProjectStatuses([...existingStatuses, data])
        setNewStatus('')
      },
      onError: displayMutationError
    })
  }

  const renderList = () => {
    if (projectStatuses !== null && projectStatuses.length === 0) {
      return null
    }

    return projectStatuses?.map(status => {
      return (
        <ListItem
          disablePadding
          key={status._id}
          secondaryAction={
            <Box display="flex">
              <ProjectStatusMenuFunctions
                status={status}
                selectedProjectStatus={selectedProjectStatus as ProjectStatus}
                setSelectedProjectStatus={setSelectedProjectStatus}
                projectStatuses={projectStatuses} />
            </Box>
          }
        >
          <ListItemButton>
            <ListItemText primary={status.name} />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  return (
    <FormWrapper>
      <Box display="flex" flexDirection="column" flexGrow={1}>
      <Box flexGrow={1}>
            <Box display="flex" fontWeight="bold">
              Project Statuses
            </Box>
            {(projectStatuses !== null && projectStatuses.length > 0) && (
              <Box sx={{ border: '1px solid black' }} mt={1}>
                <List>
                  {renderList()}
                </List>
              </Box>
            )}
            {(projectStatuses !== null && projectStatuses.length === 0) && (
              <Box mt={3}>
                Please use the text box below to create your first Project Status
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
