import { Box } from '@mui/material'
import { AppBar } from './AppBar'
import { SideMenu } from './navigation/side-menu/SideMenu'

export interface PageLayoutProps {
  children: React.ReactElement
}

export const PageLayout = ({ children } : PageLayoutProps) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100vh',
    }}>
      <AppBar />
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
