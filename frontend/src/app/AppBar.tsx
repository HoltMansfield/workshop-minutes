import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useLoggedInUser } from '../hooks/state/useLoggedInUser'
import { useDmsUser } from '../DMS/hooks/api/useDmsUser'
import { useApplicationState } from '../hooks/state/useApplicationState'

export const AppBar = () => {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser()
  const { logout } = useDmsUser()
  const { sideMenuOpen, setSideMenuOpen } = useApplicationState()

  const handleLogout = async () => {
    try {
      await logout()
      setLoggedInUser(null)
      location.reload()
    } catch (error) {
      // ToDo
      alert(error)
    }
  }

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WorkShop Minutes
        </Typography>
        {loggedInUser && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </MuiAppBar>
  )
}
