import { AlertContent } from "@/components"
import { Grow } from "@mui/material"
import { SnackbarProvider } from "notistack"
import { FC, ReactNode } from "react"
import { HiOutlineCheckCircle, HiOutlineInformationCircle } from "react-icons/hi"
import { TiWarning, TiWarningOutline } from "react-icons/ti"

interface Props {
  children: ReactNode
}

export const AlertProvider: FC<Props> = ({ children }) => {
  return (
    <SnackbarProvider
      TransitionComponent={Grow}
      // disableWindowBlurListener
      Components={{
        default: AlertContent,
        success: AlertContent,
        info: AlertContent,
        warning: AlertContent,
        error: AlertContent,
      }}
      iconVariant={{
        // success: <HiCheck />,
        success: <HiOutlineCheckCircle />,
        info: <HiOutlineInformationCircle />, // HiLightBulb
        warning: <TiWarningOutline viewBox="1 0 22 22" />,
        error: <TiWarning viewBox="1 0 22 22" />,
      }}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
