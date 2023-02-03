import { MenuItem, Select, Tab, Tabs, useMediaQuery } from '@mui/material'


interface ResponsiveTabsProps {
  tabs: string[]
  selectedTab: number
  setSelectedTab: Function
  forceMobile?: boolean
  orientation?: 'vertical' | 'horizontal'
}

export const ResponsiveTabs = ({
  tabs,
  selectedTab,
  setSelectedTab,
  orientation = 'horizontal'
}: ResponsiveTabsProps) => {
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
