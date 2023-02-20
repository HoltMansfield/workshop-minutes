import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { CreateUserForm } from "./CreateUserForm"

export const CreateUser = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      <Box display="flex" flexGrow={1} marginTop="1rem" marginBottom="1rem" maxHeight="460px">
        <CreateUserForm />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button onClick={() => navigate('/login')}>Log In</Button>
      </Box>
    </Box>
  )
}
