import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { RenderHttpError } from "../../app/components/RenderHttpError"
import { Spinner } from "../../app/Spinner"
import { useLogin } from "../../DMS/hooks/collections/user/useLogin"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { LoginForm } from "./LoginForm"

export const Login = () => {
  const navigate = useNavigate()
  const { mutation } = useLogin()
  const { setLoggedInUser } = useApplicationState()


  const handleLogin = (email: string, password: string) => {
    mutation.mutate({ email, password} , {
      onSuccess: (user) => {
        setLoggedInUser(user)
        navigate('/')
      }
    })
  }

  if (mutation.isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      {mutation.isError && (
        <RenderHttpError message={mutation.error.message} />
      )}
      <Box display="flex" flexGrow={1} marginTop="1rem" marginBottom="1rem" maxHeight="270px">
        <LoginForm handleLogin={handleLogin} />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button onClick={() => navigate('/create-user')}>Create Account</Button>
      </Box>
    </Box>
  )
}
