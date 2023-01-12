import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export interface FormWrapperProps {
  children: React.ReactElement
}

export const FormWrapper2 = ({ children } : FormWrapperProps) => {
  return (
    <Box display="flex" flexGrow={1} sx={{ border: '1px solid blue'}}>
      <Grid container spacing={2}>
        <Grid md={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
          Pad Left
        </Grid>
        <Grid xs={12} md={4}>
          <Box display="flex" flexGrow={1} sx={{ border: '1px solid green'}}>
            {children}
          </Box>
        </Grid>
        <Grid md={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
          Pad Right
        </Grid>
      </Grid>
    </Box>
  )
}
