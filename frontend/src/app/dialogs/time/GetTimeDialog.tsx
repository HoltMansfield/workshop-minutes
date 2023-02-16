import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { UseGetTimeDialogProps } from './useGetTimeDialog'
import { Box, Fab, IconButton, Slider } from '@mui/material'

export interface GetTimeDialogProps extends UseGetTimeDialogProps {
  open: boolean
  setOpen: (newState: boolean) => void
}

export const GetTimeDialog = ({ text, value, open, setOpen, onOkClicked }: GetTimeDialogProps) => {
  const [seconds, setSeconds] = useState<string>(null)
  const [minutes, setMinutes] = useState<string>(null)
  const [hours, setHours] = useState<string>(null)

  const handleCancel = () => {
    setOpen(false)
  }

  const handleOk = () => {
    //onOkClicked(fieldValue)
    setOpen(false)
  }

  const renderDigits = (timeString: string) => {
    if (timeString.length === 0) {
      return '00'
    }

    if (timeString.length == 2) {
      return timeString
    }

    return `0${timeString}`
  }

  const handleChange = (key: string) => {
    if (seconds === null) {
      setSeconds(key)
      return
    }
    if (seconds.length === 1) {
      setSeconds(`${seconds}${key}`)
      return
    }

    if (minutes === null) {
      setMinutes(key)
      return
    }
    if (minutes.length === 1) {
      setMinutes(`${minutes}${key}`)
      return
    }

    if (hours === null) {
      setHours(key)
      return
    }
    if (hours.length === 1) {
      setHours(`${hours}${key}`)
      return
    }
  }

  const handleDoubleZero = () => {
    handleChange('0')
    setTimeout(() => {
      handleChange('0')
    }, 100)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box display="flex" flexGrow={1} justifyContent="center">
              <Box display="flex" fontSize="1.1rem">{hours ? renderDigits(hours) : '00'}</Box><Box display="flex" fontSize="0.9rem" mt={0.4}>h</Box>
              <Box display="flex" fontSize="1.1rem" ml={1}>{minutes ? renderDigits(minutes) : '00'}</Box><Box display="flex" fontSize="0.9rem" mt={0.4} mr={1}>m</Box>
              <Box display="flex" fontSize="1.1rem">{seconds ? renderDigits(seconds) : '00'}</Box><Box display="flex" fontSize="0.9rem" mt={0.4}>s</Box>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleChange('1')}>1</Fab>
              <Fab color="primary" onClick={() => handleChange('2')} sx={{ marginLeft: 1, marginRight: 1 }}>2</Fab>
              <Fab color="primary" onClick={() => handleChange('3')}>3</Fab>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleChange('4')}>4</Fab>
              <Fab color="primary" onClick={() => handleChange('5')} sx={{ marginLeft: 1, marginRight: 1 }}>5</Fab>
              <Fab color="primary" onClick={() => handleChange('6')}>6</Fab>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleChange('7')}>7</Fab>
              <Fab color="primary" onClick={() => handleChange('8')} sx={{ marginLeft: 1, marginRight: 1 }}>8</Fab>
              <Fab color="primary" onClick={() => handleChange('9')}>9</Fab>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleDoubleZero()}>00</Fab>
              <Fab color="primary" onClick={() => handleChange('0')} sx={{ marginLeft: 1, marginRight: 1 }}>0</Fab>
              <Fab color="primary" onClick={() => handleChange('9')}>9</Fab>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
