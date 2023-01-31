import { Box, Paper, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const NoContent = () => {
  const navigate = useNavigate()

  return (
    <Paper elevation={3} sx={{
      display: 'flex', flexGrow: 1,
      padding: { xs: '1rem', md: '1rem'},
    }}>
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          You don't have a project selected
        </Box>
        <Box display="flex" justifyContent="center" marginTop="1rem">
          <Button onClick={() => navigate('/create-project')}>Create Project</Button>
        </Box>
      </Box>
    </Paper>
  )
}
