import { Box, LinearProgress } from '@mui/material'
import { useApplicationState } from '../hooks/state/useApplicationState'
import { ServerStates } from '../types/application'
import { AppBar } from './AppBar'
import { SideMenu } from './navigation/side-menu/SideMenu'

export interface PageLayoutProps {
  children: React.ReactElement
}

export const PageLayout = ({ children } : PageLayoutProps) => {
  const { serverState } = useApplicationState()

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100vh',
    }}>
      <AppBar />
      <Box height="5px">
        {serverState === ServerStates.saving && (
          <LinearProgress color="secondary" />
        )}
      </Box>
      <Box display="flex">
        <SideMenu />
      </Box>
      <Box sx={{
        display: 'flex',
        flexGrow: 1,
        margin: '1rem'
      }}>
        {children}
      </Box>
    </Box>
  )
}
