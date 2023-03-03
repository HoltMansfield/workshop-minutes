import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ProjectStatus } from "src/DMS/collections/projectStatus"
import { RenderHttpError } from "../../app/components/RenderHttpError"
import { Spinner } from "../../app/Spinner"
import { useCreateProject } from "../../DMS/hooks/api/project/useCreateProject"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { ProjectForm } from "./ProjectForm"


export const CreateProjectStep1 = () => {
  const { mutation } = useCreateProject()
  const { setSelectedProject, setSelectedProjectId, projects, setProjects, projectStatuses } = useProjectState()
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

      navigate('/create-project/step-2')
    }
  },[mutation])

  const handleCreateProject = (name: string, status: string) => {
    const userId = loggedInUser?._id || ''
    // ToDo check projects array for existing project with same name
    mutation.mutate({ name, status, userId })
  }

  if (mutation.isLoading) {
    return <Spinner />
  }

  if (!projectStatuses || projectStatuses.length === 0) {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" fontWeight="bold" fontSize="1.3rem" mt={2}>
          Hi there new user!
        </Box>
        <Box display="flex" mt={2}>
          Before you can create a project you need to create the project statuses
        </Box>
        <Box display="flex" mt={2}>
          <Link to='/settings/0'>Click here to create project statuses</Link>
        </Box>
      </Box>
    )
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
      <Box display="flex" fontWeight="bold" fontSize="1.2rem">
        Create Project Step 1
      </Box>
      <ProjectForm handleCreateProject={handleCreateProject} projectStatuses={projectStatuses as ProjectStatus[]} />
    </Box>
  )
}
