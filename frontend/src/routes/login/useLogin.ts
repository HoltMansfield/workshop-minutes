import { useNavigate } from "react-router-dom"
import { useDmsUser } from "../../DMS/hooks/api/useDmsUser"
import { useApplicationState } from "../../hooks/state/useApplicationState"

export const useLogin = () => {
  const { setLoggedInUser } = useApplicationState()
  const navigate = useNavigate()
  const { login } = useDmsUser()
  const base = import.meta.env.VITE_API_URL

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await login(email, password)
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
