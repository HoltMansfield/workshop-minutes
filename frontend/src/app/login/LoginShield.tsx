import { Box, Button, Link } from "@mui/material"
import { useState } from "react"
import { FormWrapper } from "../forms/FormWrapper"
import { CreateUserForm } from "./CreateUserForm"
import { LoginForm } from "./LoginForm"
import { useLoginShield } from "./useLoginShield"

export const LoginShield = () => {
  const [isNew, setIsNew] = useState(false)
  const { handleLogin, handleCreateAccount, loggedInUser } = useLoginShield()

  if (loggedInUser) {
    return null
  }

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#26293b'
    }}>
      <Box display="flex" margin="1rem" flexGrow={1} justifyContent="center">
        <Box display="flex" marginTop='8px'><img src="images/stopwatch.png" height="40px" /></Box>
          <Box display="flex" sx={{
          fontStyle: 'bold', fontSize: '2.5rem', marginLeft: "6px", color: '#505570'
          }}>
          Workshop Minutes
        </Box>
      </Box>
      <FormWrapper>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex" flexGrow={1} marginTop="1rem" marginBottom="1rem">
            {!isNew && <LoginForm handleLogin={handleLogin} />}
            {isNew && <CreateUserForm handleCreateAccount={handleCreateAccount} />}
          </Box>
          <Box display="flex" flexGrow={1} justifyContent="center" marginTop="1rem">
            {!isNew && <Button onClick={() => setIsNew(true)}>Create Account</Button>}
            {isNew && <Button onClick={() => setIsNew(false)}>Login</Button>}
          </Box>
        </Box>
      </FormWrapper>
    </Box>
  )
}
