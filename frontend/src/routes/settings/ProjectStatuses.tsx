import { Box, Button, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material"
import { indigo, grey } from "@mui/material/colors"
import { useState } from "react"
import { Spinner } from "../../app/Spinner"
import { ProjectStatus } from "../../DMS/collections/projectStatus"
import { User } from "../../DMS/collections/user"
import { useCreateProjectStatus } from "../../DMS/hooks/api/collections/project-status/useCreateProjectStatus"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"

interface ProjectStatusesProps {
  loggedInUser: User
}

export const ProjectStatuses = ({ loggedInUser }: ProjectStatusesProps) => {
  const { mutation } = useCreateProjectStatus()
  const { projectStatuses, setProjectStatuses } = useProjectState()
  const [newStatus, setNewStatus] = useState('')
  const { displayMutationError } = useToaster()

  const handleAddStatus = () => {
    mutation.mutate({ userId: String(loggedInUser._id), name: newStatus }, {
      onSuccess: (data) => {
        const existingStatuses = projectStatuses ? [...projectStatuses] : []
        setProjectStatuses([...existingStatuses, data])
      },
      onError: displayMutationError
    })
  }

  const renderList = () => {
    if (!projectStatuses) {
      return null
    }

    return projectStatuses.map(status => {
      return (
        <ListItem disablePadding key={status._id}>
          <ListItemButton>
            <ListItemText primary={status.name} />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: grey[200] }} p={2}>
      {projectStatuses?.length && projectStatuses?.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: indigo[100] }}>
          <List>
            {renderList()}
          </List>
        </Box>
      )}
      <Box display="flex" flexDirection="column">
        <Box display="flex" mt={3}>
          <TextField fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
        </Box>
        <Box display="flex" mt={2}>
          <Button variant="outlined" onClick={handleAddStatus}>Add New Status</Button>
        </Box>
      </Box>
    </Box>
  )
}
