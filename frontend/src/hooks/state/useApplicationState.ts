import { atom, useAtom } from 'jotai'
import { User } from 'src/DMS/collections/user'
import { ServerStates } from 'src/types/application'


const userAtom = atom<User | null | undefined>(undefined)
const sideMenuOpenAtom = atom<boolean>(false)
const serverStateAtom = atom(ServerStates.loaded)

export const useApplicationState = () => {
  const [sideMenuOpen, setSideMenuOpen] = useAtom(sideMenuOpenAtom)
  const [loggedInUser, setLoggedInUser] = useAtom(userAtom)
  const [serverState, setServerState] = useAtom(serverStateAtom)

  return {
    sideMenuOpen, setSideMenuOpen,
    loggedInUser, setLoggedInUser,
    serverState, setServerState
  }
}
