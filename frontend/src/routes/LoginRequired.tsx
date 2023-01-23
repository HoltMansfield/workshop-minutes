import { useNavigate } from "react-router-dom"
import { useLoggedInUser } from "../hooks/state/useLoggedInUser"

export interface LoginRequiredProps {
  children: React.ReactElement
}

export const LoginRequired = ({ children }: LoginRequiredProps) => {
  const { loggedInUser } = useLoggedInUser()
  const navigate = useNavigate()

  if (!loggedInUser) {
    navigate('/login')
    return null
  }

  return (<>{children}</>)
}
