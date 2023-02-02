import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useNavigate } from "react-router-dom"
import { MeatBallMenu } from "../../app/components/MeatballMenu"
import { Project } from "../../DMS/collections/project"
import { useDeleteProject } from "../../DMS/hooks/collections/project/useDeleteProject"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"

interface HeaderProps {
  selectedProject: Project
}

export const Header = ({ selectedProject }: HeaderProps) => {
  const { mutation } = useDeleteProject()
  const { setSelectedProject, setSelectedProjectId } = useProjectState()
  const { displayMutationError } = useToaster()

  const handleDelete = () => {
    mutation.mutate({ _id: { $oid: selectedProject._id  } }, {
      onSuccess: () => {
        setSelectedProject(null)
        setSelectedProjectId()
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
    </Box>
  )
}
