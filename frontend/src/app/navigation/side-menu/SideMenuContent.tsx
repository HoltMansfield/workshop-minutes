import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import SearchIcon from '@mui/icons-material/Search'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import { useApplicationState } from '../../../hooks/state/useApplicationState'
import { NotLoggedIn } from './NotLoggedIn'


export const SideMenuContent = () => {
  const [projectListOpen, setProjectListOpen] = useState(true)
  const navigate = useNavigate()
  const { sideMenuOpen, setSideMenuOpen, loggedInUser } = useApplicationState()
  
  const handleClick = () => {
    setProjectListOpen(!open)
  }

  const handleNavigate = (url: string) => {
    setSideMenuOpen(false)
    navigate(url)
  }

  if (!loggedInUser) return <NotLoggedIn handleNavigate={handleNavigate} />

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         Main Navigation
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => handleNavigate('/create-project')}>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Create Project" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/find-project')}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="FindProject" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Select Project" />
        {projectListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={projectListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary="Rolling Tray" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
