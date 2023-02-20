import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import LockOpenIcon from '@mui/icons-material/LockOpen'

interface NotLoggedInProps {
  handleNavigate: (url: string) => void
}

export const NotLoggedIn = ({ handleNavigate }: NotLoggedInProps) => {
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
      <ListItemButton onClick={() => handleNavigate('/login')}>
        <ListItemIcon>
          <LockOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Log in" />
      </ListItemButton>
    </List>
  )
}
