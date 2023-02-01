import { SwipeableDrawer } from '@mui/material'
import { useApplicationState } from '../../../hooks/state/useApplicationState'
import { SideMenuContent } from './SideMenuContent'

export const SideMenu = () => {
  const { sideMenuOpen, setSideMenuOpen } = useApplicationState()

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        onOpen={() => setSideMenuOpen(true)}
      >
        <SideMenuContent />
      </SwipeableDrawer>
    </div>
  )
}
