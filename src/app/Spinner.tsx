import { Box, CircularProgress } from "@mui/material"

export const Spinner = () => {
  return (
    <Box display="flex" flexGrow={1} justifyContent="center" mt={4}><CircularProgress /></Box>
  )
}
