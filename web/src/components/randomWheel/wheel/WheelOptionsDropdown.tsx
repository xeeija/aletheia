"use client"

import { Dropdown, LinkListItem } from "@/components"
import { CreateEditWheelDialog, DeleteWheelDialog, EditMembersDialog, WheelSyncDialog } from "@/components/randomWheel"
import { RandomWheelDetails, useAuth, useRandomWheel } from "@/hooks"
import { IconButton, List, Paper, SvgIcon, Tooltip } from "@mui/material"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi"
import { TiArrowRepeat, TiUserAdd } from "react-icons/ti"

interface Props {
  wheel: RandomWheelDetails
}

export const WheelOptionsDropdown: FC<Props> = ({ wheel }) => {
  const [optionsAnchor, setOptionsAnchor] = useState<Element | null>(null)

  const router = useRouter()
  const { user } = useAuth()

  const [, { deleteWheel }] = useRandomWheel(wheel.slug, { details: true })

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [membersDialogOpen, setMembersDialogOpen] = useState(false)
  const [redemptionDialogOpen, setRedemptionDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const onDeleteDialog = async () => {
    await deleteWheel()
    router.push("/randomwheel")
  }

  const wheelEditable = wheel.editable || wheel.editAnonymous

  return (
    <>
      <Tooltip arrow placement="bottom-end" title={wheelEditable ? "More options" : ""}>
        <span>
          <IconButton color="secondary" disabled={!wheelEditable} onClick={(ev) => setOptionsAnchor(ev.currentTarget)}>
            <HiDotsVertical />
          </IconButton>
        </span>
      </Tooltip>

      <Dropdown anchor={optionsAnchor} setAnchor={setOptionsAnchor}>
        <Paper sx={{ p: 1.5, width: 180 }}>
          <List dense sx={{ py: 0 }}>
            <LinkListItem
              name="Edit"
              icon={<SvgIcon component={HiPencil} viewBox="0 0 20 20" />}
              // href={`${window.location.href}/edit`}
              onClick={() => {
                // TODO: Make default option in Dropdown or LinkListItem or so to close on clicking a button
                setOptionsAnchor(null)
                setEditDialogOpen(true)
              }}
            />
            {wheelEditable && wheel.owner && (
              <LinkListItem
                name="Members"
                icon={<SvgIcon component={TiUserAdd} />}
                onClick={() => {
                  setOptionsAnchor(null)
                  setMembersDialogOpen(true)
                }}
              />
            )}
            {wheelEditable && (
              <LinkListItem
                name="Sync"
                icon={<SvgIcon component={TiArrowRepeat} viewBox="2 1 22 22" />}
                disabled={!user?.id}
                onClick={() => {
                  setOptionsAnchor(null)
                  setRedemptionDialogOpen(true)
                }}
              />
            )}
            {/* <LinkListItem name="Test spin" icon={<SvgIcon component={TiRefresh} viewBox="2 3 20 20" />} disabled /> */}
            {wheel.owner && user?.id === wheel.owner.id && (
              <>
                <LinkListItem divider />
                <LinkListItem
                  name="Delete"
                  color="error"
                  icon={<SvgIcon component={HiTrash} viewBox="-2 -2 24 24" />}
                  onClick={() => {
                    setOptionsAnchor(null)
                    setDeleteDialogOpen(true)
                  }}
                />
              </>
            )}
          </List>
        </Paper>
      </Dropdown>

      {wheelEditable && (
        <CreateEditWheelDialog
          type="edit"
          open={editDialogOpen}
          slug={wheel.slug}
          onClose={() => setEditDialogOpen(false)}
        />
      )}

      {wheelEditable && wheel.owner && (
        <EditMembersDialog
          open={membersDialogOpen}
          slug={wheel.slug}
          onClose={() => setMembersDialogOpen(false)}
          readonly={wheel.owner.id !== user?.id}
        />
      )}

      {wheelEditable && (
        <WheelSyncDialog
          open={redemptionDialogOpen}
          slug={wheel.slug}
          onClose={() => setRedemptionDialogOpen(false)}
          readonly={wheel.owner.id !== user?.id}
        />
      )}

      {wheel.owner && wheel.owner?.id === user?.id && (
        <DeleteWheelDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={async () => await onDeleteDialog()}
        />
      )}
    </>
  )
}
