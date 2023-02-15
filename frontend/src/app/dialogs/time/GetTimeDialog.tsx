import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ClockPicker } from '@mui/x-date-pickers/ClockPicker';
import { UseGetTimeDialogProps } from './useGetTimeDialog'
import { Slider } from '@mui/material'

export interface GetTimeDialogProps extends UseGetTimeDialogProps {
  open: boolean
  setOpen: (newState: boolean) => void
}

export const GetTimeDialog = ({ text, value, open, setOpen, onOkClicked }: GetTimeDialogProps) => {
  const [hoursValue, setHoursValue] = useState<number>(0)
  const [minutesValue, setMinutesValue] = useState<number>(0)
  const [secondsValue, setSecondsValue] = useState<number>(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    ;
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleOk = () => {
    //onOkClicked(fieldValue)
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Choose a time</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <div>Hours: {hoursValue}</div>
          <Slider value={hoursValue} onChange={(_, newValue: number) => setHoursValue(newValue as number)} />
          <div>Minutes: {minutesValue}</div>
          <Slider value={minutesValue} onChange={(_, newValue: number) => setMinutesValue(newValue as number)} />
          <div>Seconds: {secondsValue}</div>
          <Slider value={secondsValue} onChange={(_, newValue: number) => setSecondsValue(newValue as number)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
