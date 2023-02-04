import { useState, useCallback } from 'react'
import { GetStringDialog as Dialog } from './GetStringDialog'

export interface UseGetStringDialogProps {
  title: string
  fieldTitle: string
  okButtonTitle: string
  text: string
  value: string
  onOkClicked: (newValue: string) => void
}

export const useGetStringDialog = (props: UseGetStringDialogProps) => {
  const [getStringDialogOpen, setGetStringDialogOpen] = useState(false)

  const GetStringDialog = useCallback(() => {
    return <Dialog {...props} open={getStringDialogOpen} setOpen={setGetStringDialogOpen} />
  }, [getStringDialogOpen])

  return {
    setGetStringDialogOpen,
    GetStringDialog
  } as const
}
