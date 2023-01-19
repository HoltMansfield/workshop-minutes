import { useEffect } from "react"
import { useLoggedInUser } from "../../hooks/state/useLoggedInUser"

const base = import.meta.env.VITE_API_URL

export const useLoginShield = () => {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser()

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

  // useEffect(() => {
  //   checkForPreviousSession()
  // }, [])

  const handleLogin = (email: string, password: string) => {
    debugger
  }

  const handleCreateAccount = async (email: string, password: string, name: string) => {
    const request = {
      email,
      password,
      name
    }

    try {
      const response = await fetch(`${base}/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
      const user = await response.json()
      setLoggedInUser(user)
    } catch (e) {
     alert(e)
    }
  }

  return {
    handleLogin,
    handleCreateAccount,
    loggedInUser
  } as const
}
