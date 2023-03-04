import { useEffect } from "react"
import { useGetLoggedInUser } from "src/DMS/hooks/api/user/useGetLoggedInUser"
import { useApplicationState } from "src/hooks/state/useApplicationState"


export const FetchLoggedInUser = () => {
  const { setLoggedInUser } = useApplicationState()
  const { data } = useGetLoggedInUser()

  useEffect(() => {
    if (data !== undefined) {
      setLoggedInUser(data)
    }
  }, [data])

  return null
}
