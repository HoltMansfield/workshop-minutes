import { useEffect } from "react"
import { useState } from "react"

/*
    Any component wrapped in this will only be displayed if it's on screen for more than 300 ms
*/

interface NoFlickerProps {
  children: React.ReactElement
}

export const NoFlicker = ({ children }: NoFlickerProps) => {
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    setTimeout(() => setFlag(true), 300)
  }, [])

  if (!flag) return null

  return (<>{children}</>)
}
