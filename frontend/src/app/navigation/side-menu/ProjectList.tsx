import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import { useFindProjects } from "../../../DMS/hooks/logic/project/useFindProjects"

interface ProjectListProperties {
  userId?: string
}

export const ProjectList = ({ userId }: ProjectListProperties) => {
  const { data } = useFindProjects({ userId: userId })

  if (!data) {
    return null
  }

  const renderProjects = () => {
    return data.map(project => {
      return (
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <LabelImportantIcon />
          </ListItemIcon>
          <ListItemText primary="Rolling Tray" />
        </ListItemButton>
      )
    })
  }

  return (
    <List component="div" disablePadding>
      {renderProjects()}
    </List>
  )
}
