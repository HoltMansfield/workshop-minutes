import { Box, FormHelperText, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useNavigate } from "react-router-dom"
import { MeatBallMenu } from "../../app/components/MeatballMenu"
import { Project } from "../../DMS/collections/project"
import { useDeleteProject } from "../../DMS/hooks/api/collections/project/useDeleteProject"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"
import { GetStringDialog } from "../../app/dialogs/GetStringDialog"
import { useState } from "react"
import { useUpdateProject } from "../../DMS/hooks/api/collections/project/useUpdateProject"


interface ProjectStatusProps {
  selectedProject: Project
}

export const ProjectStatus = ({ selectedProject }: ProjectStatusProps) => {
  const { mutation } = useUpdateProject()
  const { setSelectedProject, projectStatuses } = useProjectState()
  const { displayMutationError } = useToaster()

  const handleStatusChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    const updateRequest = {
      query: { _id: { $oid: selectedProject._id  } },
      update: {
        "$set": {
          status: event.target.value
        }
      }
    }

    mutation.mutate(updateRequest, {
      onSuccess: () => {
        setSelectedProject({...selectedProject, status: event.target.value })
      },
      onError: displayMutationError
    })
  }

  const renderStatuses = () => {
    return projectStatuses?.map(({ name, _id }) => {
      return (
        <MenuItem value={name}>{name}</MenuItem>
      )
    })
  }

  return (
    <Box display="flex" flexDirection="column" mt={2}>
      <Select value={selectedProject.status} onChange={handleStatusChange}>
        {projectStatuses ? renderStatuses() : (
          <>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Gathering Materials">Gathering Materials</MenuItem>
            <MenuItem value="Build">Build</MenuItem>
            <MenuItem value="Sand">Sand</MenuItem>
            <MenuItem value="Finishing">Finishing</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </>
        )}
      </Select>
    </Box>
  )
}
