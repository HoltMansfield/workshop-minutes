import { atom, useAtom } from 'jotai'
import { User } from '@workshop-minutes/data-model'
import { atomWithLocalStorage } from './atomWithLocalStorage'

const userAtom = atomWithLocalStorage('not-in-prod', null)
const jwtAtom = atomWithLocalStorage('for-sure-not-in-prod', null)

interface ReturnType {
  loggedInUser: User
  setLoggedInUser: (user: User) => void
  jwt: string
  setJwt: (jwt: string) => void
}

export const useLoggedInUser = (): ReturnType => {
  const [loggedInUser, setLoggedInUser] = useAtom<User>(userAtom)
  const [jwt, setJwt] = useAtom<string>(jwtAtom)

  return {
    loggedInUser, setLoggedInUser,
    jwt, setJwt
  }
}
