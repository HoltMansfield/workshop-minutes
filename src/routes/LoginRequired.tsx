import { useNavigate } from "react-router-dom"
import { useApplicationState } from "../hooks/state/useApplicationState"

export interface LoginRequiredProps {
  children: React.ReactElement
}

export const LoginRequired = ({ children }: LoginRequiredProps) => {
  const { loggedInUser } = useApplicationState()
  const navigate = useNavigate()

  if (!loggedInUser) {
    navigate('/login')
    return null
  }

  return (<>{children}</>)
}
