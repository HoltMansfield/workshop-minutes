import { createTheme } from "@mui/material"
import { orange, indigo, cyan } from "@mui/material/colors";

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
    // palette: {
    //   mode: 'light',
    //   primary: {
    //     main: indigo[500],
    //   },
    // }
    palette: {
      primary: indigo,
      secondary: cyan,
    }
  })
  
  return theme
}
