import { atom, useAtom } from 'jotai'
import { AvailableProjectStep } from 'src/DMS/collections/available-project-step'
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

// The available project steps
const availableProjectStepsAtom = atom<AvailableProjectStep[] | null>(null)

export const useProjectState = () => {
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)
  const [selectedProjectId, setSelectedProjectId] = useAtom(selectedProjectIdAtom)

  const [projects, setProjects] = useAtom(projectsAtom)
  const [projectStatuses, _setProjectStatuses] = useAtom(projectStatusesAtom)
  const [availableProjectSteps, _setAvailableProjectSteps] = useAtom(availableProjectStepsAtom)

  const setProjectStatuses = (newProjectStatuses: ProjectStatus[]) => {
    const sorted = newProjectStatuses.sort((a, b) => a.sortOrder-b.sortOrder)

    _setProjectStatuses(sorted)
  }

  const setAvailableProjectSteps = (newProjectStatuses: AvailableProjectStep[]) => {
    const sorted = newProjectStatuses.sort((a, b) => a.sortOrder-b.sortOrder)

    _setAvailableProjectSteps(sorted)
  }

  return {
    selectedProject, setSelectedProject,
    selectedProjectId, setSelectedProjectId,
    projects, setProjects,
    projectStatuses, setProjectStatuses,
    availableProjectSteps, setAvailableProjectSteps
  }
}
