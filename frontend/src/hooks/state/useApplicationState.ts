import { atom, useAtom } from 'jotai'

const sideMenuOpenAtom = atom<boolean>(false)

export const useApplicationState = () => {
  const [sideMenuOpen, setSideMenuOpen] = useAtom(sideMenuOpenAtom)

  return {
    sideMenuOpen, setSideMenuOpen
  }
}
