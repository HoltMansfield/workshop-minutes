import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { Project } from "../../DMS/collections/project"
import { useProjectState } from "../../hooks/state/useProjectState"
import { useToaster } from "../../hooks/useToaster"
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
        <MenuItem key={_id} value={name}>{name}</MenuItem>
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
