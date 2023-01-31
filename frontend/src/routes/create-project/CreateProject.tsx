import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCreateProject } from "../../DMS/hooks/logic/project/useCreateProject"
import { useProjectState } from "../../hooks/state/useProjectState"
import { ProjectForm } from "./ProjectForm"


export const CreateProject = () => {
  const { mutation } = useCreateProject()
  const { setSelectedProject } = useProjectState()
  const navigate = useNavigate()

  const handleCreateProject = (name: string, status: string) => {
    mutation.mutate({ name, status })
  }

  if (mutation.isLoading) {
    return <div>Saving...</div>
  }

  if (mutation.isError) {
    return <div>An error occurred: {mutation.error.message}</div>
  }

  if (mutation.isSuccess) {
    setSelectedProject(mutation.data)
    navigate('/')
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
