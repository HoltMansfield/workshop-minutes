import { Box, Link } from "@mui/material"
import { useState } from "react"
import { CreateUserForm } from "./CreateUserForm"
import { LoginForm } from "./LoginForm"
import { useLoginShield } from "./useLoginShield"

export const LoginShield = () => {
  const [isNew, setIsNew] = useState(false)
  const { handleLogin, handleCreateAccount } = useLoginShield()

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white'
    }}>
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          Please Login
        </Box>
        <Box display="flex" flexGrow={1} sx={{ border: '1px solid red'}}>
          {!isNew && <LoginForm handleLogin={handleLogin} />}
          {isNew && <CreateUserForm handleCreateAccount={handleCreateAccount} />}
        </Box>
        <Box display="flex">
          <Link onClick={() => setIsNew(true)}>Create Account</Link>
        </Box>
      </Box>
    </Box>
  )
}
