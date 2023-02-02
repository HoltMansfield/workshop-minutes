import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateProject } from "../../DMS/hooks/collections/project/useCreateProject"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { ProjectForm } from "./ProjectForm"


export const CreateProject = () => {
  const { mutation } = useCreateProject()
  const { setSelectedProject, setSelectedProjectId, projects, setProjects } = useProjectState()
  const {loggedInUser } = useApplicationState()
  const navigate = useNavigate()

  useEffect(() => {
    if (mutation.isSuccess) {
      // default to selecting this project
      setSelectedProject(mutation.data)
      setSelectedProjectId(mutation?.data?._id)

      const existingProjects = projects ? [...projects] : []
      const newProjects = [...existingProjects, mutation.data]
      // update side nav
      setProjects(newProjects)

      navigate('/')
    }
  },[mutation])

  const handleCreateProject = (name: string, status: string) => {
    const userId = loggedInUser?._id || ''
    // ToDo check projects array for existing project with same name
    mutation.mutate({ name, status, userId })
  }

  if (mutation.isLoading) {
    return <div>Saving...</div>
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
