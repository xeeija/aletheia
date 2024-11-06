import { AlertBaseProps, AlertVariant } from "@/types"
import { OptionsObject, useSnackbar } from "notistack"
import { ReactNode } from "react"

interface AlertOptions extends OptionsObject, AlertBaseProps {
  //
}

export const useAlert = (defaultOptions?: AlertOptions) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const showAlert = (variant?: AlertVariant) => (message: ReactNode, options?: AlertOptions) => {
    return enqueueSnackbar(message, {
      // action: (key) => (
      //   <IconButton onClick={() => closeSnackbar(key)}>
      //     <SvgIcon component={HiX} fontSize="small" />
      //   </IconButton>
      // ),
      // persist: true,
      closeable: true,
      ...defaultOptions,
      variant,
      ...options,
    })
  }

  return {
    showAlert: showAlert(),
    showSuccess: showAlert("success"),
    showInfo: showAlert("info"),
    showWarning: showAlert("warning"),
    showError: showAlert("error"),
    closeAlert: closeSnackbar,
  }
}
