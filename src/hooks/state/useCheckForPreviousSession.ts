import { useEffect } from "react"
import { useHttp } from "src/DMS/hooks/core/useHttp"
import { useApplicationState } from "./useApplicationState"

export const useCheckForPreviousSession = () => {
  const { setLoggedInUser } = useApplicationState()
  const { get } = useHttp()
  const base = import.meta.env.VITE_API_URL

  useEffect(() => {
    checkForPreviousSession()
  }, [])

  const checkForPreviousSession = async () => {
    // If our cookie is not expired we will get a user back
    try {
      const user = await get('/users')
      setLoggedInUser(user)
    } catch (e) {
     alert(e)
    }
  }

  return {
    checkForPreviousSession
  } as const
}
