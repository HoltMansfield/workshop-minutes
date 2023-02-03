import { MenuItem, Select, Tab, Tabs, useMediaQuery } from '@mui/material'
import React, { FunctionComponent } from 'react'


interface ResponsiveTabsProps {
  tabs: string[]
  selectedTab: number
  setSelectedTab: Function
  forceMobile?: boolean
  orientation?: 'vertical' | 'horizontal'
}

export const ResponsiveTabs: FunctionComponent<ResponsiveTabsProps> = ({
  tabs,
  selectedTab,
  setSelectedTab,
  orientation = 'horizontal'
}) => {
  const isDevice = !useMediaQuery('(min-width: 768px)')

  if (isDevice) {
    return (
      <Select value={selectedTab} onChange={event => setSelectedTab(event.target.value)}>
        {tabs.map((tabLabel, index) => (
          <MenuItem key={index} value={index} selected={selectedTab === index}>
            {tabLabel}
          </MenuItem>
        ))}
      </Select>
    )
  }

  return (
    <Tabs
      value={selectedTab}
      onChange={(_, newValue) => setSelectedTab(newValue)}
      orientation={orientation}
    >
      {tabs.map(tabLabel => (
        <Tab key={tabLabel} label={tabLabel} />
      ))}
    </Tabs>
  )
}
