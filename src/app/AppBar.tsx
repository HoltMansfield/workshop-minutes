import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { useApplicationState } from '../hooks/state/useApplicationState'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../DMS/hooks/api/user/useLogout'
import { useToaster } from '../hooks/useToaster'

export const AppBar = () => {
  const { sideMenuOpen, setSideMenuOpen, loggedInUser, setLoggedInUser } = useApplicationState()
  const { mutation } = useLogout()
  const navigate = useNavigate()
  const { displayMutationError } = useToaster()

  const handleLogout = async () => {
    mutation.mutate(null, {
      onSuccess: () => {
        setLoggedInUser(null)
        location.reload()
      },
      onError: displayMutationError
    })
  }

  return (
    <MuiAppBar position="static">
      <Toolbar>
        {loggedInUser && (
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
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WorkShop Minutes
        </Typography>
        {!loggedInUser && !mutation.isLoading && <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>}
        {loggedInUser && !mutation.isLoading && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        {mutation.isLoading && <HourglassBottomIcon />}
      </Toolbar>
    </MuiAppBar>
  )
}
