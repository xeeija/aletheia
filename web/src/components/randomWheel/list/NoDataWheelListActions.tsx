"use client"

import { CreateEditWheelDialog } from "@/components/randomWheel"
import { Button, SvgIcon } from "@mui/material"
import { FC, useState } from "react"
import { TiPlus } from "react-icons/ti"

interface Props {}

export const NoDataWheelListActions: FC<Props> = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="contained"
        color="success"
        endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
        onClick={() => setOpen(true)}
      >
        New Wheel
      </Button>

      <CreateEditWheelDialog type="create" open={open} onClose={() => setOpen(false)} />
    </>
  )
}
