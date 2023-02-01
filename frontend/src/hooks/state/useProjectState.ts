import { atom, useAtom } from 'jotai'
import { Project } from '../../DMS/collections/project'
import { atomWithLocalStorage } from './atomWithLocalStorage'

// The selected project is the primary unit of work
const selectedProjectAtom = atom<Project | null | undefined>(undefined)
const selectedProjectIdAtom = atomWithLocalStorage('selected-project-id', null)

// The list of available projects
const projectsAtom = atom<Project[] | null>(null)

export const useProjectState = () => {
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)
  const [selectedProjectId, setSelectedProjectId] = useAtom(selectedProjectIdAtom)

  const [projects, setProjects] = useAtom(projectsAtom)

  return {
    selectedProject, setSelectedProject,
    selectedProjectId, setSelectedProjectId,
    projects, setProjects
  }
}
