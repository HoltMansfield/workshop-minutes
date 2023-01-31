import { Box, Button } from "@mui/material"
import { useState } from "react"
import { Project } from "../../DMS/collections/project"
import { useCreateProject } from "../../DMS/hooks/logic/project/useCreateProject"
import { ProjectForm } from "./ProjectForm"


export const CreateProject = () => {
  const { mutation } = useCreateProject()
  const [show, setShow] = useState(false)

  const handleCreateProject = async (name: string, status: string) => {
    const project = await mutation.mutate({ name, status })
    debugger
  }

  if (mutation.isLoading) {
    return <div>isLoading</div>
  }

  if (mutation.isError) {
    return <div>An error occurred: {mutation.error.message}</div>
  }

  if (mutation.isSuccess) {
    return <div>Project added!</div>
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      <ProjectForm handleCreateProject={handleCreateProject} />
    </Box>
  )
}
