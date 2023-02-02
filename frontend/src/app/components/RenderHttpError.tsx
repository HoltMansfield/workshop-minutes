import { Box, Button, Typography } from "@mui/material"

interface RenderHttpErrorProps {
  message: string
  reset?: () => void
}

export const RenderHttpError = ({ message, reset }: RenderHttpErrorProps) => {
  return (
    <Box display="flex" flexDirection="column" mt={1}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h6" color="error">
          {message}
        </Typography>
      </Box>
      {reset && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="outlined" onClick={reset}>Click Here to Try Again</Button>
        </Box>
      )}
    </Box>
  )
}
