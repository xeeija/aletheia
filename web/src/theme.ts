import { createTheme, ThemeOptions } from "@mui/material"

const baseTheme = createTheme({
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
    info: { main: "#76ccac" }, // #76cca4, #76ccac
    success: { main: "#7dbb80", dark: "#58975b" }, // #70c275, #5cbf63, #67c16c, #6bd571, #6fd074, #73d278, #73cc78, #7dbb80
    warning: { main: "#ccc776" },
    error: { main: "#e37568" }, // #d58077, #db776c, #ee7466, #e37568
  },
  shape: {
    borderRadius: 6
  },
  typography: () => ({
    fontFamily: [
      "Product Sans",
      // "Roboto",
      // System default fonts as backup
      "Segoe UI",
      "Helvetica Neue",
      "-apple-system",
      "sans-serif",
    ].join(", "),
    h1: {
      fontSize: "2.25rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      mb: 2 * 8
    },
    h4: {
      fontSize: "1.375rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    button: {
      fontWeight: 700,
    },
  }),
})

// Override style per component 
const componentOverrides: ThemeOptions = {
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
          fontSize: baseTheme.typography.htmlFontSize * 0.8125,
          backgroundColor: baseTheme.palette.background.paper,
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
        },
        arrow: {
          "::before": {
            backgroundColor: baseTheme.palette.background.paper,
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))"
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "::before, :hover:not(.Mui-disabled)::before": { borderWidth: 0 },
          "::after": {
            borderWidth: 3,
            borderRadius: `0 0 ${baseTheme.shape.borderRadius}px ${baseTheme.shape.borderRadius}px`,
            opacity: 0.6
          },
          borderRadius: baseTheme.shape.borderRadius,
        },
      },
      defaultProps: {
        // size: "small",
      },
    },
    MuiList: {
      styleOverrides: {
        dense: {
          "& .MuiListItemIcon-root": {
            minWidth: baseTheme.spacing(6),
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: baseTheme.shape.borderRadius,
          margin: baseTheme.spacing(1),
          padding: baseTheme.spacing(0.5, 1.5),
        },
        dense: {
          margin: baseTheme.spacing(0),
          marginTop: baseTheme.spacing(0.5),
          padding: baseTheme.spacing(0.5, 1.5),
          "& .MuiListItemIcon-root": {
            minWidth: baseTheme.spacing(6),
          },
          "& .MuiListItemText-primary": {
            fontSize: "0.925rem",
          },
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        rectangular: {
          borderRadius: baseTheme.shape.borderRadius,
        }
      }
    },
  },
}

// Merge base theme and style overrides
export const theme = createTheme(baseTheme, componentOverrides)
