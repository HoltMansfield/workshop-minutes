import { atom, useAtom } from 'jotai'
import { User } from '@workshop-minutes/data-model'

const userAtom = atom<User | null | undefined>(undefined)


export const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useAtom(userAtom)

  return {
    loggedInUser, setLoggedInUser
  }
}
