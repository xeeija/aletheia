import { ClearEntriesDialog } from "@/components/randomWheel"
import { useRandomWheel } from "@/hooks"
import { Button, Paper, SvgIcon } from "@mui/material"
import { FC, useState } from "react"
import { HiRefresh, HiTrash } from "react-icons/hi"

interface Props {
  slug: string
  disabled?: boolean
  spinDisabled?: boolean
  clearDisabled?: boolean
  // onSpin?: MouseEventHandler<HTMLButtonElement>
  // onClear?: () => Promise<void>
}

export const WheelControls: FC<Props> = ({ slug, disabled, spinDisabled, clearDisabled }) => {
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [, { spin, clear }] = useRandomWheel(slug, { details: true })

  return (
    <Paper sx={{ p: 2, display: "flex", gap: 2 }}>
      {/* <Badge badgeContent={entries?.length} max={9999} color="success"> */}
      <Button
        color="primary"
        variant="contained"
        disabled={disabled || spinDisabled}
        endIcon={<SvgIcon component={HiRefresh} viewBox="0 0 20 20" />}
        onClick={async () => await spin()}
      >
        Spin
      </Button>
      {/* </Badge> */}

      <Button
        color="error"
        variant="outlined"
        disabled={disabled || clearDisabled}
        endIcon={<HiTrash />}
        onClick={() => setClearDialogOpen(true)}
      >
        Clear
      </Button>

      <ClearEntriesDialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        onClear={async () => await clear()}
      />
    </Paper>
  )
}
