import { useEffect } from "react"
import { useLoggedInUser } from "./useLoggedInUser"

export const useCheckForPreviousSession = () => {
  const { setLoggedInUser } = useLoggedInUser()
  const base = import.meta.env.VITE_API_URL

  useEffect(() => {
    checkForPreviousSession()
  }, [])

  const checkForPreviousSession = async () => {
    // If our cookie is not expired we will get a user back
    try {
      const response = await fetch(`${base}/users`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const user = await response.json()
      if (user) setLoggedInUser(user)
    } catch (e) {
     alert(e)
    }
  }

  return {
    checkForPreviousSession
  } as const
}
