import { useNavigate } from "react-router-dom"
import { useLoggedInUser } from "../../hooks/state/useLoggedInUser"

export const useCreateUser = () => {
  const { setLoggedInUser } = useLoggedInUser()
  const navigate = useNavigate()
  const base = import.meta.env.VITE_API_URL

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
      navigate('/')
    } catch (e) {
     alert(e)
    }
  }
  return {
    handleCreateAccount
  } as const
}