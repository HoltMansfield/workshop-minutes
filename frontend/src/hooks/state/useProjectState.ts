import { atom, useAtom } from 'jotai'
import { Project } from '../../DMS/collections/project'
import { atomWithLocalStorage } from './atomWithLocalStorage'

const selectedProjectAtom = atom<Project | null | undefined>(undefined)
const selectedProjectIdAtom = atomWithLocalStorage('selected-project-id', null)


export const useProjectState = () => {
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)
  const [selectedProjectId, setSelectedProjectId] = useAtom(selectedProjectIdAtom)

  return {
    selectedProject, setSelectedProject,
    selectedProjectId, setSelectedProjectId
  }
}
