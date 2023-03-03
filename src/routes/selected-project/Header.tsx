import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import BarchartIcon from '@mui/icons-material/Barchart'
import { MeatBallMenu } from "../../app/components/MeatballMenu"
import { Project } from "../../DMS/collections/project"
import { useDeleteProject } from "../../DMS/hooks/api/project/useDeleteProject"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"
import { useUpdateProject } from "../../DMS/hooks/api/project/useUpdateProject"
import { useGetStringDialog } from "../../app/dialogs/string/useGetStringDialog"

interface HeaderProps {
  selectedProject: Project
}

export const Header = ({ selectedProject }: HeaderProps) => {
  const { mutation: deleteMutation } = useDeleteProject()
  const { mutation: updateMutation } = useUpdateProject()
  const { setSelectedProject, setSelectedProjectId } = useProjectState()
  const { displayMutationError } = useToaster()

  const handleDelete = () => {
    deleteMutation.mutate({ _id: { $oid: selectedProject._id  } }, {
      onSuccess: () => {
        setSelectedProject(null)
        setSelectedProjectId()
      },
      onError: displayMutationError
    })
  }

  const handleRename = (newName: string) => {
    const updateRequest = {
      query: { _id: { $oid: selectedProject._id  } },
      update: {
        "$set": {
          name: newName
        }
      }
    }
    updateMutation.mutate(updateRequest, {
      onSuccess: () => {
        setSelectedProject({...selectedProject, name: newName })
      },
      onError: displayMutationError
    })
  }

  const { setGetStringDialogOpen, GetStringDialog } = useGetStringDialog({
    title: "Rename Project",
    fieldTitle: "Name",
    okButtonTitle: "Rename",
    text: `Rename project: ${selectedProject.name}`,
    value: selectedProject.name,
    onOkClicked: handleRename
  })

  const items = [
    <MenuItem key="delete" onClick={handleDelete}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>,
    <MenuItem key="rename" onClick={() => setGetStringDialogOpen(true)}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Rename</ListItemText>
    </MenuItem>,
    <MenuItem key="clone">
      <ListItemIcon>
        <ContentCopyIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Clone</ListItemText>
    </MenuItem>,
    <MenuItem key="graph">
      <ListItemIcon>
        <BarchartIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Analytics</ListItemText>
    </MenuItem>
  ]

  return (
    <Box display="flex">
      <Box display="flex" fontWeight="bold" fontSize="1.5rem">
        {selectedProject.name}
      </Box>
      <Box display="flex" sx={{ marginLeft: 'auto' }}>
        <MeatBallMenu items={items} />
      </Box>
      <GetStringDialog />
    </Box>
  )
}
