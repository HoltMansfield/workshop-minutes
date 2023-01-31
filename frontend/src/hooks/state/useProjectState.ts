import { atom, useAtom } from 'jotai'
import { Project } from '../../DMS/collections/project'

const selectedProjectAtom = atom<Project | null | undefined>(undefined)


export const useProjectState = () => {
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)

  return {
    selectedProject, setSelectedProject
  }
}
