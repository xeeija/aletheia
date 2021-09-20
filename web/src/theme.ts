import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "hsl(210, 18%, 13%)",
      paper: "hsl(210, 18%, 16%)"
    },
    text: {
      primary: "hsl(210, 18%, 92%)",
      secondary: "hsla(210, 18%, 92%, 0.7)",
      disabled: "hsla(210, 18%, 92%, 0.5)",
    },
    // "hsl(200, 90%, 75%)",
    // "hsl(150, 50%, 60%)",

    primary: { main: "#a48de3" }, // #8d9ae3
    secondary: { main: "#7cc1d6" },
    info: { main: "#76cca4" },
    success: { main: "#70c275" },
    warning: { main: "#ccc776" },
    error: { main: "#d58077" },
  },
  typography: {
    // root font size 17?
    fontFamily: "'Product Sans', Roboto",
    button: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 6
  },
  // Override style per component 
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderWidth: 0,
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12
        }
      }
    },
  },
})
