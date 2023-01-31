import { useNavigate } from "react-router-dom"
import { useDmsUser } from "../../DMS/hooks/api/useDmsUser"
import { useLoggedInUser } from "../../hooks/state/useLoggedInUser"

export const useLogin = () => {
  const { setLoggedInUser } = useLoggedInUser()
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
