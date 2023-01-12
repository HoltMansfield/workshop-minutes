import { Box, Paper } from '@mui/material'

export interface FormWrapperProps {
  children: React.ReactElement
  width?: number
}

export const FormWrapper = ({ children, width = 500 } : FormWrapperProps) => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Box display="flex" sx={{ 
        width: { xs: '100%', md: `${width}px`},
        marginLeft: { xs: '2%', md: 'auto'},
        marginRight: { xs:'2%', md: 'auto'}
      }}>
        <Paper elevation={3} sx={{
          display: 'flex', flexGrow: 1,
          padding: { xs: '1rem', md: '1rem'},
        }}>
          {children}
        </Paper>
      </Box>
     </Box>
  )
}
