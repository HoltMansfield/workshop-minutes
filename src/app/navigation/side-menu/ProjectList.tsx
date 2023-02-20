import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import { useProjectState } from "../../../hooks/state/useProjectState"
import { Project } from "../../../DMS/collections/project"
import { useNavigate } from "react-router-dom"
import { useApplicationState } from "../../../hooks/state/useApplicationState"


export const ProjectList = () => {
  const { projects, setSelectedProject, setSelectedProjectId } = useProjectState()
  const { setSideMenuOpen } = useApplicationState()
  const navigate = useNavigate()

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
    setSelectedProjectId(project._id)
    setSideMenuOpen(false)
    navigate('/')
  }

  const renderProjects = () => {
    return projects?.map(project => {
      return (
        <ListItemButton key={project._id} sx={{ pl: 4 }} onClick={() => handleSelectProject(project)}>
          <ListItemIcon>
            <LabelImportantIcon />
          </ListItemIcon>
          <ListItemText primary={project.name} />
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
