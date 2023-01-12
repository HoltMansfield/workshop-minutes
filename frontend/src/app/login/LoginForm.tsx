import { Box, Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { FormWrapper } from "../forms/FormWrapper"
import { emailRegex } from "./regex"

interface LoginFormProps {
  handleLogin: (email: string, password: string) => void
}

export const LoginForm = ({ handleLogin }: LoginFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    handleLogin(data.email, data.password)
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column">
          <Box display="flex"><TextField label="Email" variant="outlined" {...register("email", { required: true, pattern: emailRegex })} /></Box>
          {errors.email?.type === 'required' && <Box display="flex">Email is required</Box>}
          {errors.email?.type === 'pattern' && <Box display="flex">Email is invalid</Box>}
          <Box display="flex"><TextField label="Password" variant="outlined" {...register("password", { required: true })} /></Box>
          {errors.password && <Box display="flex">Password is required</Box>}
          <Box display="flex"><Button type="submit" variant="outlined">Login</Button></Box>
        </Box>
      </form>
    </FormWrapper>
  )
}
