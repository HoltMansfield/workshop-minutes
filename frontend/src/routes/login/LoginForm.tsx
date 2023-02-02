import { Box, Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { FormWrapper } from "../../app/forms/FormWrapper"
import { emailRegex } from "../../app/forms/regex"

interface LoginFormProps {
  handleLogin: (email: string, password: string) => void
}

export const LoginForm = ({ handleLogin }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    handleLogin(data.email, data.password)
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexGrow: '1' }}>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex">
            <TextField label="Email" variant="outlined" fullWidth {...register("email", { required: "It's required dude", pattern: emailRegex })} />
          </Box>
          {errors.email?.type === 'required' && <Box display="flex">Email is required</Box>}
          {errors.email?.type === 'pattern' && <Box display="flex">Email is invalid</Box>}
          <Box display="flex" marginTop="1rem">
            <TextField label="Password" variant="outlined" fullWidth type="password" {...register("password", { required: true })} />
          </Box>
          {errors.password && <Box display="flex">Password is required</Box>}
          <Box display="flex" marginTop="1rem"><Button type="submit" variant="outlined">Login</Button></Box>
        </Box>
      </form>
    </FormWrapper>
  )
}
