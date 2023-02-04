import { atom, useAtom } from 'jotai'
import { Project } from '../../DMS/collections/project'
import { ProjectStatus } from '../../DMS/collections/projectStatus'
import { atomWithLocalStorage } from './atomWithLocalStorage'

// The selected project is the primary unit of work
const selectedProjectAtom = atom<Project | null | undefined>(undefined)
const selectedProjectIdAtom = atomWithLocalStorage('selected-project-id', null)

// The list of available projects
const projectsAtom = atom<Project[] | null>(null)

// The available project statuses
const projectStatusesAtom = atom<ProjectStatus[] | null>(null)

export const useProjectState = () => {
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)
  const [selectedProjectId, setSelectedProjectId] = useAtom(selectedProjectIdAtom)

  const [projects, setProjects] = useAtom(projectsAtom)
  const [projectStatuses, setProjectStatuses] = useAtom(projectStatusesAtom)

  return {
    selectedProject, setSelectedProject,
    selectedProjectId, setSelectedProjectId,
    projects, setProjects,
    projectStatuses, setProjectStatuses
  }
}
