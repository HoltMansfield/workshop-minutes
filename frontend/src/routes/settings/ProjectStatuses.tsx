import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { useState } from "react"
import { User } from "../../DMS/collections/user"
import { useCreateProjectStatus } from "../../DMS/hooks/api/collections/project-status/useCreateProjectStatus"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"
import { MeatBallMenu } from "../../app/components/MeatballMenu"
import { useGetStringDialog } from "../../app/dialogs/useGetStringDialog"
import { ProjectStatus } from "../../DMS/collections/projectStatus"
import { useUpdateProjectStatus } from "../../DMS/hooks/api/collections/project-status/useUpdateProjectStatus"
import { FormWrapper } from "../../app/forms/FormWrapper"

interface ProjectStatusesProps {
  loggedInUser: User
}

export const ProjectStatuses = ({ loggedInUser }: ProjectStatusesProps) => {
  const { mutation: createMutation } = useCreateProjectStatus()
  const { mutation: updateMutation } = useUpdateProjectStatus()
  const { projectStatuses, setProjectStatuses } = useProjectState()
  const [newStatus, setNewStatus] = useState<string>('')
  const { displayMutationError, toastError } = useToaster()
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

  const updateSortOrder = async (projectStatuses: ProjectStatus[]) => {
    let sortOrder = 1
    projectStatuses = projectStatuses.map(s => {
      s.sortOrder = sortOrder
      sortOrder++
      return s
    })

    const promises: any[] = []
    projectStatuses.forEach(status => {
      const updateRequest = {
        query: { _id: { $oid: status?._id } },
        update: {
          "$set": {
            sortOrder: status.sortOrder
          }
        }
      }
      promises.push(updateMutation.mutateAsync(updateRequest))
    })

    try {
      await Promise.all(promises)
      setProjectStatuses(projectStatuses)
    } catch (e) {
      toastError('Reorder update failed. Please refresh the page.')
    }
  }

  const handleMoveUp = async (projectStatus: ProjectStatus) => {
    const index = projectStatus.sortOrder - 1
    let editableStatuses = [...projectStatuses as ProjectStatus []]
    editableStatuses.splice(index, 1)
    editableStatuses.splice(index - 1, 0, projectStatus)

    updateSortOrder(editableStatuses)
  }

  const handleMoveDown = (projectStatus: ProjectStatus) => {
    const index = projectStatus.sortOrder - 1
    const editableStatuses = [...projectStatuses as ProjectStatus []]
    editableStatuses.splice(index, 1)
    editableStatuses.splice(index + 1, 0, projectStatus)

    updateSortOrder(editableStatuses)
  }

  const renderList = () => {
    if (projectStatuses !== null && projectStatuses.length === 0) {
      return null
    }

    return projectStatuses?.map(status => {
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
            <Box display="flex">
              {status.sortOrder !== 1 && (
                <Box display="flex">
                  <IconButton onClick={() => handleMoveUp(status)}>
                    <KeyboardDoubleArrowUpIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              {status.sortOrder < projectStatuses.length && (
                <Box display="flex">
                  <IconButton onClick={() => handleMoveDown(status)}>
                    <KeyboardDoubleArrowDownIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              <Box display="flex">
                <MeatBallMenu items={items} />
              </Box>
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
        <GetStringDialog />
      </Box>
    </FormWrapper>
  )
}
