import { ConfirmDialog } from "@/components"
import { Box } from "@mui/material"
import { FC } from "react"
import { HiInformationCircle } from "react-icons/hi"

interface Props {
  open: boolean
  onClose: () => void
}

export const AboutDialog: FC<Props> = ({ open, onClose }) => {
  const version = process.env.NEXT_PUBLIC_VERSION ?? "n/a"
  const commit = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "n/a"

  const dateParsed = new Date(process.env.NEXT_PUBLIC_COMMIT_TIME ?? "")
  const date = !isNaN(dateParsed.getTime()) ? dateParsed.toISOString() : "n/a"
  const buildDateParsed = new Date(process.env.NEXT_PUBLIC_BUILD_TIME ?? "")
  const buildDate = !isNaN(buildDateParsed.getTime()) ? buildDateParsed.toISOString() : "n/a"

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      id="about"
      type="secondary"
      title="Aletheia"
      confirmText="Close"
      confirmVariant="outlined"
      hideCancel
      icon={HiInformationCircle}
      iconViewBox="0 0 20 20"
    >
      <Box sx={{ fontSize: "0.925rem" }}>
        Version: {version}
        <br />
        Commit: {commit}
        <br />
        Date: {date}
        <br />
        Build date: {buildDate}
      </Box>
    </ConfirmDialog>
  )
}
