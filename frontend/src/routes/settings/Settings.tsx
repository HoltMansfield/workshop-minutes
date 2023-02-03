import { Box } from "@mui/material"
import { useResponsiveTabs } from "../../app/components/responsive-tabs/useResponsiveTabs"

export const Settings = () => {
  const { UiComponent, selectedTab, setSelectedTab } = useResponsiveTabs(['Settings', 'Steps'])

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <UiComponent />
    </Box>
  )
}
