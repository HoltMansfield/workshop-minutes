import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { UseGetStringDialogProps } from './useGetStringDialog'

export interface GetStringDialogProps extends UseGetStringDialogProps {
  open: boolean
  setOpen: (newState: boolean) => void
}

export const GetStringDialog = ({ title, fieldTitle, okButtonTitle, text, value, open, setOpen, onOkClicked }: GetStringDialogProps) => {
  const [fieldValue, setFieldValue] = useState(value || '')

  const handleCancel = () => {
    setOpen(false)
  }

  const handleOk = () => {
    onOkClicked(fieldValue)
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={fieldTitle}
            type="email"
            fullWidth
            variant="standard"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk}>{okButtonTitle}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
