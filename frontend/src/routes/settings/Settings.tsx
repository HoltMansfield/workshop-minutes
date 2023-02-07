import { Box } from "@mui/material"
import { useResponsiveTabs } from "../../app/components/responsive-tabs/useResponsiveTabs"
import { ProjectStatuses } from "./project-statuses/ProjectStatuses"
import { ProjectSteps } from "./project-steps/ProjectSteps"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { User } from "../../DMS/collections/user"
import { useParams } from "react-router-dom"


export const Settings = () => {
  const { loggedInUser } = useApplicationState()
  let { tabIndex } = useParams()
  const { TabsOrSelect, selectedTab } = useResponsiveTabs(['Project Status', 'Project Steps'], Number(tabIndex))

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <TabsOrSelect />
      <Box display="flex" mt={2}>
        {selectedTab === 0 && <ProjectStatuses loggedInUser={loggedInUser as User} />}
        {selectedTab === 1 && <ProjectSteps loggedInUser={loggedInUser as User} />}
      </Box>
    </Box>
  )
}
