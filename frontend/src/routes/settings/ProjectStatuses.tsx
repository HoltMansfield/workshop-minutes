import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, TextField } from "@mui/material"
import { grey } from "@mui/material/colors"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from "react"
import { User } from "../../DMS/collections/user"
import { useCreateProjectStatus } from "../../DMS/hooks/api/collections/project-status/useCreateProjectStatus"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"
import { MeatBallMenu } from "../../app/components/MeatballMenu"
import { useGetStringDialog } from "../../app/dialogs/useGetStringDialog"
import { ProjectStatus } from "../../DMS/collections/projectStatus"
import { useUpdateProjectStatus } from "../../DMS/hooks/api/collections/project-status/useUpdateProjectStatus"

interface ProjectStatusesProps {
  loggedInUser: User
}

export const ProjectStatuses = ({ loggedInUser }: ProjectStatusesProps) => {
  const { mutation: createMutation } = useCreateProjectStatus()
  const { mutation: updateMutation } = useUpdateProjectStatus()
  const { projectStatuses, setProjectStatuses } = useProjectState()
  const [newStatus, setNewStatus] = useState<string>()
  const { displayMutationError } = useToaster()
  const [selectedProjectStatus, setSelectedProjectStatus] = useState<ProjectStatus | null>(null)

  const handleRenameOk = (newName: string) => {
    const updateRequest = {
      query: { _id: { $oid: selectedProjectStatus?._id } },
      update: {
        "$set": {
          name: newName
        }
      }
    }
    updateMutation.mutate(updateRequest, {
      onSuccess: () => {
        const updatedProjectStatus = {...selectedProjectStatus as ProjectStatus, name: newName }
        setSelectedProjectStatus(updatedProjectStatus)
        const statuses = projectStatuses?.filter(s => s._id !== selectedProjectStatus?._id)
        setProjectStatuses([...statuses as ProjectStatus[], updatedProjectStatus])
      },
      onError: displayMutationError
    })
  }

  const { setGetStringDialogOpen, GetStringDialog } = useGetStringDialog({
    title: "Rename Project Status",
    fieldTitle: "Name",
    okButtonTitle: "Rename",
    text: `Rename project status: ${selectedProjectStatus?.name}`,
    value: String(selectedProjectStatus?.name),
    onOkClicked: handleRenameOk
  })

  const getDeleteHandler = (id: string) => () => {

  }

  const getRenameHandler = (status: ProjectStatus) => {
    return () => {
      setSelectedProjectStatus(status)
      setGetStringDialogOpen(true)
    }
  }

  const handleAddStatus = () => {
    createMutation.mutate({ userId: String(loggedInUser._id), name: String(newStatus) }, {
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

    return projectStatuses.sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }).map(status => {
      const items = [
        <MenuItem key="rename" onClick={getRenameHandler(status)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>,
        <MenuItem key="delete" onClick={() => alert('mama')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      ]

      return (
        <ListItem
          disablePadding
          key={status._id}
          secondaryAction={
            <MeatBallMenu items={items} />
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
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: grey[200] }} p={2}>
      {projectStatuses?.length && projectStatuses?.length > 0 && (
        <>
          <Box display="flex" fontWeight="bold">
            Project Statuses
          </Box>
          <Box sx={{ width: '100%', maxWidth: 360, border: '1px solid black' }} mt={1}>
            <List>
              {renderList()}
            </List>
          </Box>
        </>
      )}
      <Box display="flex" flexDirection="column">
        <Box display="flex" mt={3}>
          <TextField fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
        </Box>
        <Box display="flex" mt={2}>
          <Button variant="outlined" onClick={handleAddStatus}>Add</Button>
        </Box>
      </Box>
      <GetStringDialog />
    </Box>
  )
}
