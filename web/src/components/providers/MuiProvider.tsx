import { theme } from "@/style"
import { ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const MuiProvider: FC<Props> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      {/* <MuiThemeProvider>{children}</MuiThemeProvider> */}
    </AppRouterCacheProvider>
  )
}

// export const MuiThemeProvider: FC<Props> = ({ children }) => {
//   "use client"
//   return <ThemeProvider theme={theme}>{children}</ThemeProvider>
// }
