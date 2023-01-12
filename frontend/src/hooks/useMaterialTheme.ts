import { createTheme } from "@mui/material"
import { orange, blue } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}


export const useMaterialTheme = () => {
  const theme = createTheme({
    status: {
      danger: orange[500],
    },
    palette: {
      mode: 'dark',
      primary: {
        main: blue[700],
      },
    }
  })
  
  return theme
}
