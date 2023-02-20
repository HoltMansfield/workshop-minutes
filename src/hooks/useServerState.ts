import { cyan, grey, red } from "@mui/material/colors"
import { ServerStates } from "src/types/application"
//import { ServerStates } from "src/types/application"


export const useServerState = () => {
  const getServerStateColor = (serverState: ServerStates) => {
    switch (serverState) {
      case ServerStates.error:
        return red[500]
      case ServerStates.saving:
        return cyan[200]
      case ServerStates.loaded:
        return grey[400]
    }
  }

  return {
    getServerStateColor
  } as const
}
