import { useState, useCallback } from 'react'
import { GetTimeDialog as Dialog } from './GetTimeDialog'

export interface UseGetTimeDialogProps {
  text: string
  value: number
  onOkClicked: (newValue: number) => void
}

export const useGetTimeDialog = (props: UseGetTimeDialogProps) => {
  const [getTimeDialogOpen, setGetTimeDialogOpen] = useState(false)

  const GetTimeDialog = useCallback(() => {
    return <Dialog {...props} open={getTimeDialogOpen} setOpen={setGetTimeDialogOpen} />
  }, [getTimeDialogOpen])

  return {
    setGetTimeDialogOpen,
    GetTimeDialog
  } as const
}
