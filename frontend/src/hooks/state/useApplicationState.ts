import { atom, useAtom } from 'jotai'
import { User } from '@workshop-minutes/data-model'

const userAtom = atom<User | null | undefined>(undefined)

const sideMenuOpenAtom = atom<boolean>(false)

export const useApplicationState = () => {
  const [sideMenuOpen, setSideMenuOpen] = useAtom(sideMenuOpenAtom)
  const [loggedInUser, setLoggedInUser] = useAtom(userAtom)

  return {
    sideMenuOpen, setSideMenuOpen,
    loggedInUser, setLoggedInUser
  }
}
