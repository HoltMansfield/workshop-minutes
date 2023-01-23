import { Box } from '@mui/material'
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
      <Box sx={{
        display: 'flex',
        maxHeight: '70px'
      }}>
        App Bar
      </Box>
      <Box display="flex">
        <SideMenu />
      </Box>
      <Box sx={{
        display: 'flex',
        flexGrow: 1
      }}>
        {children}
      </Box>
    </Box>
  )
}
