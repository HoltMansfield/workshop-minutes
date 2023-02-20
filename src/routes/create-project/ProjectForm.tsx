import { useEffect, useState } from "react"
import { Box, Button, MenuItem, Select, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { ProjectStatus } from "src/DMS/collections/projectStatus"
import { FormWrapper } from "../../app/forms/FormWrapper"
import { Spinner } from "src/app/Spinner"

interface ProjectFormProps {
  handleCreateProject: (name: string, status: string) => void
  projectStatuses: ProjectStatus[]
}

export const ProjectForm = ({ handleCreateProject, projectStatuses }: ProjectFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    handleCreateProject(data.name, data.status)
  }

  if (!projectStatuses) return <Spinner />

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexGrow: '1' }}>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex">
            <TextField label="Name" variant="outlined" fullWidth {...register("name", { required: "This is required" })} />
          </Box>
          {errors.name?.type === 'required' && <Box display="flex">Name is required</Box>}
          <Box display="flex" marginTop="1rem">
            {/* <Select value={selectedProjectStatus?._id} {...register("status", { required: "This is required" })}>
              {projectStatuses?.map(ps => <MenuItem key={ps._id} value={ps._id}>{ps.name}</MenuItem>)}
            </Select> */}
            <TextField
              select
              fullWidth
              label="Project Status"
              defaultValue=''
              inputProps={register('status', {
                required: 'This is required',
              })}
            >
              {projectStatuses.map(ps => (
                <MenuItem key={ps._id} value={ps._id}>{ps.name}</MenuItem>
              ))}
            </TextField>
          </Box>
          {errors.status && <Box display="flex">Status is required</Box>}
          <Box display="flex" marginTop="1rem"><Button type="submit" variant="outlined">Create Project</Button></Box>
        </Box>
      </form>
    </FormWrapper>
  )
}
