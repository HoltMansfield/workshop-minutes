import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export interface FormWrapperProps {
  children: React.ReactElement
  width?: number
}

export const FormWrapper = ({ children, width = 500 } : FormWrapperProps) => {
  return (
    <Box display="flex" flexGrow={1} sx={{ border: '1px solid blue'}}>
     <Box display="flex" sx={{ 
        width: { xs: '100%', md: `${width}px`},
        marginLeft: { xs: '5%', md: 'auto'},
        marginRight: { xs:'5%', md: 'auto'},
        border: '1px solid yellow'
      }}>
      {children}
     </Box>
    </Box>
  )
}
