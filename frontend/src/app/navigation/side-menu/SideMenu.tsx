import { SwipeableDrawer } from '@mui/material'
import { useState } from 'react'
import { SideMenuContent } from './SideMenuContent'

export const SideMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <SideMenuContent />
      </SwipeableDrawer>
    </div>
  )
}
