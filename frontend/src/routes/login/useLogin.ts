import { useNavigate } from "react-router-dom"
import { useLoggedInUser } from "../../hooks/state/useLoggedInUser"

export const useLogin = () => {
  const { setLoggedInUser } = useLoggedInUser()
  const navigate = useNavigate()
  const base = import.meta.env.VITE_API_URL

  const handleLogin = async (email: string, password: string) => {
    const request = {
      email,
      password,
    }

    try {
      const response = await fetch(`${base}/users/login`, {
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
    handleLogin
  } as const
}
