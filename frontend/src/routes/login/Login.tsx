import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "./LoginForm"

export const Login = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      <Box display="flex" flexGrow={1} marginTop="1rem" marginBottom="1rem">
        <LoginForm />
      </Box>
      <Box display="flex" flexGrow={1} justifyContent="center" marginTop="1rem">
        <Button onClick={() => navigate('/create-user')}>Create Account</Button>
      </Box>
    </Box>
  )
}