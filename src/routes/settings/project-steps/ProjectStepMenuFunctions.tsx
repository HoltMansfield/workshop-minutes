import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, TextField } from "@mui/material"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { MeatBallMenu } from "../../../app/components/MeatballMenu"
import { useProjectState } from "../../../hooks/state/useProjectState"
import { useGetStringDialog } from "../../../app/dialogs/string/useGetStringDialog"
import { useToaster } from "../../../hooks/useToaster"
import { ServerStates } from "../../../types/application"
import { AvailableProjectStep } from "src/DMS/collections/available-project-step"
import { useUpdateAvailableProjectStep } from "src/DMS/hooks/api/available-project-step/useUpdateAvailableProjectStep"
import { useDeleteAvailableProjectStep } from "src/DMS/hooks/api/available-project-step/useDeleteAvailableProjectStep"

interface ProjectStepMenuFunctionsProps {
  step: AvailableProjectStep
  selectedAvailableProjectStep: AvailableProjectStep
  setSelectedAvailableProjectStep: (newProjectStatus: AvailableProjectStep) => void
  availableProjectSteps: AvailableProjectStep[],
  setServerState: (newServerState: ServerStates) => void
}

export const ProjectStepMenuFunctions = ({
  step, selectedAvailableProjectStep, setSelectedAvailableProjectStep, availableProjectSteps, setServerState
}: ProjectStepMenuFunctionsProps) =>{
  const { setAvailableProjectSteps } = useProjectState()
  const { mutation: updateMutation } = useUpdateAvailableProjectStep()
  const { mutation: deleteMutation } = useDeleteAvailableProjectStep()
  const { displayMutationError, toastError } = useToaster()

  const handleRenameOk = (newName: string) => {
    setServerState(ServerStates.saving)
    const updateRequest = {
      query: { _id: { $oid: selectedAvailableProjectStep?._id } },
      update: {
        "$set": {
          name: newName
        }
      }
    }
    updateMutation.mutate(updateRequest, {
      onSuccess: () => {
        const updatedProjectStatus = {...selectedAvailableProjectStep as AvailableProjectStep, name: newName }
        setSelectedAvailableProjectStep(updatedProjectStatus)
        const statuses = availableProjectSteps?.filter(s => s._id !== selectedAvailableProjectStep?._id)
        setAvailableProjectSteps([...statuses as AvailableProjectStep[], updatedProjectStatus])
        setServerState(ServerStates.loaded)
      },
      onError: (error) => {
        displayMutationError(error, null, null)
        setServerState(ServerStates.error)
      }
    })
  }

  const { setGetStringDialogOpen, GetStringDialog } = useGetStringDialog({
    title: "Rename Project Step",
    fieldTitle: "Name",
    okButtonTitle: "Rename",
    text: `Rename project step: ${selectedAvailableProjectStep?.name}`,
    value: String(selectedAvailableProjectStep?.name),
    onOkClicked: handleRenameOk
  })

  const getDeleteHandler = (id: string) => {
    return () => {
      setServerState(ServerStates.saving)
      deleteMutation.mutate({ _id: { $oid: id  } }, {
        onSuccess: () => {
          const editableStatuses = [...availableProjectSteps].filter(s => s._id !== id)
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

  const getRenameHandler = (step: AvailableProjectStep) => {
    return () => {
      setSelectedAvailableProjectStep(step)
      setGetStringDialogOpen(true)
    }
  }

  const updateSortOrder = async (projectStatuses: AvailableProjectStep[]) => {
    let sortOrder = 1
    projectStatuses = projectStatuses.map(s => {
      s.sortOrder = sortOrder
      sortOrder++
      return s
    })

    const promises: any[] = []
    projectStatuses.forEach(step => {
      const updateRequest = {
        query: { _id: { $oid: step?._id } },
        update: {
          "$set": {
            sortOrder: step.sortOrder
          }
        }
      }
      promises.push(updateMutation.mutateAsync(updateRequest))
    })

    try {
      setServerState(ServerStates.saving)
      await Promise.all(promises)
      setAvailableProjectSteps(projectStatuses)
      setServerState(ServerStates.loaded)
    } catch (e) {
      toastError('Reorder update failed. Please refresh the page.')
      setServerState(ServerStates.error)
    }
  }

  const handleMoveUp = async (projectStatus: AvailableProjectStep) => {
    const index = projectStatus.sortOrder - 1
    let editableStatuses = [...availableProjectSteps as AvailableProjectStep []]
    editableStatuses.splice(index, 1)
    editableStatuses.splice(index - 1, 0, projectStatus)

    updateSortOrder(editableStatuses)
  }

  const handleMoveDown = (projectStatus: AvailableProjectStep) => {
    const index = projectStatus.sortOrder - 1
    const editableStatuses = [...availableProjectSteps as AvailableProjectStep []]
    editableStatuses.splice(index, 1)
    editableStatuses.splice(index + 1, 0, projectStatus)

    updateSortOrder(editableStatuses)
  }

  const items = [
    <MenuItem key="rename" onClick={getRenameHandler(step)}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Rename</ListItemText>
    </MenuItem>,
    <MenuItem key="delete" onClick={getDeleteHandler(String(step._id))}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>
  ]

  return (
    <>
      {step.sortOrder !== 1 && (
        <Box display="flex">
          <IconButton onClick={() => handleMoveUp(step)}>
            <KeyboardDoubleArrowUpIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
      {step.sortOrder < availableProjectSteps.length && (
        <Box display="flex">
          <IconButton onClick={() => handleMoveDown(step)}>
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
