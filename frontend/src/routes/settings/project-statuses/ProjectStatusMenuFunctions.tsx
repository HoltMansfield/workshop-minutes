import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, TextField } from "@mui/material"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { MeatBallMenu } from "../../../app/components/MeatballMenu"
import { ProjectStatus } from "../../../DMS/collections/projectStatus"
import { useProjectState } from "../../../hooks/state/useProjectState"
import { useGetStringDialog } from "../../../app/dialogs/useGetStringDialog"
import { useUpdateProjectStatus } from "../../../DMS/hooks/api/collections/project-status/useUpdateProjectStatus"
import { useToaster } from "../../../hooks/useToaster"
import { useDeleteProjectStatus } from "../../../DMS/hooks/api/collections/project-status/useDeleteProjectStatus"
import { ServerStates } from "../../../types/application"

interface ProjectStatusMenuFunctionsProps {
  status: ProjectStatus
  selectedProjectStatus: ProjectStatus
  setSelectedProjectStatus: (newProjectStatus: ProjectStatus) => void
  projectStatuses: ProjectStatus[],
  setServerState: (newServerState: ServerStates) => void
}

export const ProjectStatusMenuFunctions = ({
  status, selectedProjectStatus, setSelectedProjectStatus, projectStatuses, setServerState
}: ProjectStatusMenuFunctionsProps) =>{
  const { setProjectStatuses } = useProjectState()
  const { mutation: updateMutation } = useUpdateProjectStatus()
  const { mutation: deleteMutation } = useDeleteProjectStatus()
  const { displayMutationError, toastError } = useToaster()

  const handleRenameOk = (newName: string) => {
    setServerState(ServerStates.saving)
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
        setServerState(ServerStates.loaded)
      },
      onError: (error) => {
        displayMutationError(error, null, null)
        setServerState(ServerStates.error)
      }
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

  const getDeleteHandler = (id: string) => {
    return () => {
      setServerState(ServerStates.saving)
      deleteMutation.mutate({ _id: { $oid: id  } }, {
        onSuccess: () => {
          const editableStatuses = [...projectStatuses].filter(s => s._id !== id)
          updateSortOrder(editableStatuses)
          setServerState(ServerStates.loaded)
        },
        onError: (error) => {
          displayMutationError(error, null, null)
          setServerState(ServerStates.error)
        }
      })
    }
  }

  const getRenameHandler = (status: ProjectStatus) => {
    return () => {
      setSelectedProjectStatus(status)
      setGetStringDialogOpen(true)
    }
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
      setServerState(ServerStates.saving)
      await Promise.all(promises)
      setProjectStatuses(projectStatuses)
      setServerState(ServerStates.loaded)
    } catch (e) {
      toastError('Reorder update failed. Please refresh the page.')
      setServerState(ServerStates.error)
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

  const items = [
    <MenuItem key="rename" onClick={getRenameHandler(status)}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Rename</ListItemText>
    </MenuItem>,
    <MenuItem key="delete" onClick={getDeleteHandler(String(status._id))}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>
  ]

  return (
    <>
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
      <GetStringDialog />
    </>
  )
}
