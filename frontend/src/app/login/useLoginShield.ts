import { useLoggedInUser } from "../../hooks/state/useLoggedInUser"

export const useLoginShield = () => {
  const { setLoggedInUser, setJwt } = useLoggedInUser()

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
    const response: any = await fetch(`${base}/users`, {
      method: 'POST',
      //@ts-expect-error
      body: request
    })

    setLoggedInUser(response.user)
    setJwt(response.jwt)
  }

  return {
    handleLogin,
    handleCreateAccount
  } as const
}
