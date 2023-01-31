import { Button } from "@mui/material"
import { useState } from "react"
import { useCreateProject } from "../../DMS/hooks/logic/project/useCreateProject"
import { useFindProject } from "../../DMS/hooks/logic/project/useFindProject"
import { useProjectState } from "../../hooks/state/useProjectState"
import { NoContent } from "./NoContent"


export const SelectedProject = () => {
  const { selectedProject } = useProjectState()

  if (!selectedProject) return <NoContent />

  return (
    <div>
      content now
    </div>
  )
}
