import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useNavigate } from "react-router-dom"
import { MeatBallMenu } from "../../app/components/MeatballMenu"
import { Project } from "../../DMS/collections/project"
import { useDeleteProject } from "../../DMS/hooks/api/collections/project/useDeleteProject"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"
import { GetStringDialog } from "../../app/dialogs/GetStringDialog"
import { useState } from "react"
import { useUpdateProject } from "../../DMS/hooks/api/collections/project/useUpdateProject"

interface HeaderProps {
  selectedProject: Project
}

export const Header = ({ selectedProject }: HeaderProps) => {
  const { mutation: deleteMutation } = useDeleteProject()
  const { mutation: updateMutation } = useUpdateProject()
  const { setSelectedProject, setSelectedProjectId } = useProjectState()
  const { displayMutationError } = useToaster()
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)

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

  const items = [
    <MenuItem key="delete" onClick={handleDelete}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>,
    <MenuItem key="rename" onClick={() => setRenameDialogOpen(true)}>
      <ListItemIcon>
        <ContentCopyIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Rename</ListItemText>
    </MenuItem>,
    <MenuItem key="clone">
      <ListItemIcon>
        <ContentCopyIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Clone</ListItemText>
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
      <GetStringDialog
        title="Rename Project"
        fieldTitle="Name"
        okButtonTitle="Rename"
        text={`Rename project: ${selectedProject.name}`}
        value={selectedProject.name}
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
        onOkClicked={handleRename}
      />
    </Box>
  )
}
