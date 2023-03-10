import React, { useState, useCallback } from 'react'
import { ResponsiveTabs } from './ResponsiveTabs'

export const useResponsiveTabs = (
  tabs: string[],
  defaultTab = 0,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
) => {
  const [selectedTab, setSelectedTab] = useState<number>(defaultTab)

  const TabsOrSelect = useCallback(() => {
    return (
      <ResponsiveTabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        orientation={orientation}
      />
    )
  }, [selectedTab, tabs])

  return {
    TabsOrSelect,
    selectedTab,
    setSelectedTab
  } as const
}
