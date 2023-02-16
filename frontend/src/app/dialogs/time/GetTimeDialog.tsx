import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ClearIcon from '@mui/icons-material/Clear'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { UseGetTimeDialogProps } from './useGetTimeDialog'
import { Box, Fab, IconButton, Slider } from '@mui/material'

export interface GetTimeDialogProps extends UseGetTimeDialogProps {
  open: boolean
  setOpen: (newState: boolean) => void
}

export const GetTimeDialog = ({ text, value, open, setOpen, onOkClicked }: GetTimeDialogProps) => {
  const [timeString, setTimeString] = useState<string>('')

  const handleCancel = () => {
    setOpen(false)
  }

  const handleOk = () => {
    const hours = Number(renderHours())
    const minutes = Number(renderMinutes())
    const seconds = Number(renderSeconds())

    const hoursInMilli = hours * 60 * 60 * 1000
    const minutesInMilli = minutes * 60 * 1000
    const secondsInMilli = seconds * 1000

    const totalMilliseconds = hoursInMilli + minutesInMilli + secondsInMilli
    onOkClicked(totalMilliseconds)
    setOpen(false)
  }

  const renderHours = () => {
    //9 99 99
    if (timeString.length === 5) {
      return timeString[0]
    }
    //99 99 99
    if (timeString.length === 6) {
      return `${timeString[0]}${timeString[1]}`
    }

    return '00'
  }

  const renderMinutes = () => {
    //99 99 99
    if (timeString.length === 6) {
      return `${timeString[2]}${timeString[3]}`
    }

    //9 99 99
    if (timeString.length === 5) {
      return `${timeString[1]}${timeString[2]}`
    }

    //99 99
    if (timeString.length === 4) {
      return `${timeString[0]}${timeString[1]}`
    }

    //9 99
    if (timeString.length === 3) {
      return timeString[0]
    }

    return '00'
  }

  const renderSeconds = () => {
    //99 99 99
    if (timeString.length === 6) {
      return `${timeString[4]}${timeString[5]}`
    }

    //9 99 99
    if (timeString.length === 5) {
      return `${timeString[3]}${timeString[4]}`
    }

    //99 99
    if (timeString.length === 4) {
      return `${timeString[2]}${timeString[3]}`
    }

    //9 99
    if (timeString.length === 3) {
      return `${timeString[1]}${timeString[2]}`
    }

    //99
    if (timeString.length === 2) {
      return timeString
    }

    //9
    if (timeString.length === 1) {
      return `0${timeString}`
    }

    return '00'
  }

  const handleChange = (key: string) => {
    setTimeString(`${timeString}${key}`)
  }

  const handleRemove = () => {
    setTimeString(timeString.substring(0, timeString.length-1))
  }

  const inputsDisabled = () => {
    if (timeString.length === 6) {
      return true
    }

    return false
  }

  const zerosAreDisabled = () => {
    if (inputsDisabled()) {
      return true
    }

    if (timeString.length === 0) {
      return true
    }

    return false
  }

  const clearButtonDisabled = () => {
    if (timeString.length === 0) {
      return true
    }

    return false
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box display="flex" flexGrow={1} justifyContent="center">
              <Box display="flex" fontSize="1.1rem">{renderHours()}</Box><Box display="flex" fontSize="0.9rem" mt={0.4}>h</Box>
              <Box display="flex" fontSize="1.1rem" ml={1}>{renderMinutes()}</Box><Box display="flex" fontSize="0.9rem" mt={0.4} mr={1}>m</Box>
              <Box display="flex" fontSize="1.1rem">{renderSeconds()}</Box><Box display="flex" fontSize="0.9rem" mt={0.4}>s</Box>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleChange('1')} disabled={inputsDisabled()}>1</Fab>
              <Fab color="primary" onClick={() => handleChange('2')} disabled={inputsDisabled()} sx={{ marginLeft: 1, marginRight: 1 }}>2</Fab>
              <Fab color="primary" onClick={() => handleChange('3')} disabled={inputsDisabled()}>3</Fab>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleChange('4')} disabled={inputsDisabled()}>4</Fab>
              <Fab color="primary" onClick={() => handleChange('5')} disabled={inputsDisabled()} sx={{ marginLeft: 1, marginRight: 1 }}>5</Fab>
              <Fab color="primary" onClick={() => handleChange('6')} disabled={inputsDisabled()}>6</Fab>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleChange('7')} disabled={inputsDisabled()}>7</Fab>
              <Fab color="primary" onClick={() => handleChange('8')} disabled={inputsDisabled()} sx={{ marginLeft: 1, marginRight: 1 }}>8</Fab>
              <Fab color="primary" onClick={() => handleChange('9')} disabled={inputsDisabled()}>9</Fab>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="center" mt={1}>
              <Fab color="primary" onClick={() => handleChange('00')} disabled={zerosAreDisabled()}>00</Fab>
              <Fab color="primary" onClick={() => handleChange('0')} disabled={zerosAreDisabled()} sx={{ marginLeft: 1, marginRight: 1 }}>0</Fab>
              <Fab color="primary" onClick={() => handleRemove()} disabled={clearButtonDisabled()}><ClearIcon /></Fab>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
