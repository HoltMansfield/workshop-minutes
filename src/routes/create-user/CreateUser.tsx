import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { CreateUserAttempt, useCreateUser } from "src/DMS/hooks/api/user/useCreateUser"
import { useApplicationState } from "src/hooks/state/useApplicationState"
import { useToaster } from "src/hooks/useToaster"
import { CreateUserForm } from "./CreateUserForm"

export const CreateUser = () => {
  const navigate = useNavigate()
  const { mutation } = useCreateUser()
  const { setLoggedInUser } = useApplicationState()
  const { toastError } = useToaster()

  const handleCreateUser = async (data: CreateUserAttempt) => {
    mutation.mutate(data , {
      onSuccess: (user) => {
        setLoggedInUser(user)
        navigate('/')
      }, onError: (error) => {
        toastError(error.message)
      }
    })
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      <Box display="flex" flexGrow={1} marginTop="1rem" marginBottom="1rem" maxHeight="460px">
        <CreateUserForm handleCreateUser={handleCreateUser} />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button onClick={() => navigate('/login')}>Log In</Button>
      </Box>
    </Box>
  )
}
