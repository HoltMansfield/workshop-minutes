import { Box, Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { FormWrapper } from "../../app/forms/FormWrapper"

interface ProjectFormProps {
  handleCreateProject: (name: string, status: string) => void
}

export const ProjectForm = ({ handleCreateProject }: ProjectFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    handleCreateProject(data.name, data.status)
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexGrow: '1' }}>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex">
            <TextField label="Name" variant="outlined" fullWidth {...register("name", { required: "This is required" })} />
          </Box>
          {errors.name?.type === 'required' && <Box display="flex">Name is required</Box>}
          <Box display="flex" marginTop="1rem">
            <TextField label="Status" variant="outlined" fullWidth {...register("status", { required: "This is required" })} />
          </Box>
          {errors.status && <Box display="flex">Status is required</Box>}
          <Box display="flex" marginTop="1rem"><Button type="submit" variant="outlined">Create Project</Button></Box>
        </Box>
      </form>
    </FormWrapper>
  )
}
