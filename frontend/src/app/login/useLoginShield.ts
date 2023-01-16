import { useLoggedInUser } from "../../hooks/state/useLoggedInUser"

export const useLoginShield = () => {
  const { loggedInUser, setLoggedInUser, setJwt } = useLoggedInUser()

  const handleLogin = (email: string, password: string) => {
    debugger
  }

  const handleCreateAccount = async (email: string, password: string, name: string) => {
    const base = import.meta.env.VITE_API_URL
    const request = {
      email,
      password,
      name
    }
    let response: any
    try {
      response = await fetch(`${base}/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
    } catch (e) {
     alert(e)
    }

    const json = await response.json()
    setLoggedInUser(json.user)
    setJwt(json.jwt)
  }

  return {
    handleLogin,
    handleCreateAccount,
    loggedInUser
  } as const
}
