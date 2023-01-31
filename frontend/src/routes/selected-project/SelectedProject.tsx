import { Button } from "@mui/material"
import { useState } from "react"
import { useCreateProject } from "../../DMS/hooks/logic/project/useCreateProject"
import { useFindProject } from "../../DMS/hooks/logic/project/useFindProject"
import { useProjectState } from "../../hooks/state/useProjectState"
import { LoadSelectedProject } from "./LoadSelectedProject"
import { NoContent } from "./NoContent"


export const SelectedProject = () => {
  const { selectedProject, selectedProjectId } = useProjectState()

  if (!selectedProject && !selectedProjectId) return <NoContent />

  if (!selectedProject && selectedProjectId) return <LoadSelectedProject selectedProjectId={selectedProjectId} />

  if (!selectedProject) {
    return null
  }

  return (
    <div>
      {selectedProject.name}
    </div>
  )
}
