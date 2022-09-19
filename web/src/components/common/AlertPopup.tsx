import { Alert, AlertColor, Snackbar, SnackbarCloseReason, useTheme } from "@mui/material"
import { Dispatch, FC, SetStateAction, SyntheticEvent, useEffect, useState } from "react"
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi"
import { TiWarning } from "react-icons/ti"

interface Props {
  severity?: AlertColor
  hideDuration?: number | null
  messageState: [JSX.Element | string | null, Dispatch<SetStateAction<JSX.Element | string | null>>]
}

const alertIcons: { [key in AlertColor | "default"]: JSX.Element | null } = {
  success: <HiCheckCircle />,
  info: <HiInformationCircle />, // HiLightBulb //<SvgIcon component={HiExclamationCircle} viewBox="0 0 20 20" sx={{ height: 22, transform: "rotateX(180deg)" }} />,
  warning: <TiWarning />,
  error: <TiWarning />,
  default: null,
}

export const AlertPopup: FC<Props> = ({ severity, hideDuration = 6000, messageState }) => {
  const [message, setMessage] = messageState
  const [open, setOpen] = useState(false)

  const theme = useTheme()

  useEffect(() => {
    if (message !== null) {
      setOpen(true)
    }
  }, [message])

  const onClose: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void =
    (_ev, reason) => {
      if (reason === "clickaway") {
        return
      }

      setOpen(false)
      // delay until transition finished
      setTimeout(() => {
        setMessage(null)
      }, theme.transitions.duration.leavingScreen)
    }

  return (
    <Snackbar
      open={open}
      autoHideDuration={hideDuration}
      onClose={onClose}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom"
      }}
    >
      <Alert severity={severity} variant="filled" icon={alertIcons[severity ?? "default"]}
        onClose={() => setMessage(null)}
        sx={{ my: 1, }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}