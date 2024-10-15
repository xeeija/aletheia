"use client"

import { UpdateEntryForm } from "@/components/randomWheel"
import { RandomWheelEntryFragment, useDeleteRandomWheelEntryMutation } from "@/generated/graphql"
import { useAlert } from "@/hooks"
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, SvgIcon, Tooltip, useTheme } from "@mui/material"
import { FC, useMemo, useState } from "react"
import { HiTrash } from "react-icons/hi"

interface Props {
  entry: RandomWheelEntryFragment
  editable?: boolean
  disabled?: boolean
  scrolling?: boolean
  totalWeight?: number
}

export const EntryListItem: FC<Props> = ({ entry, editable, disabled, scrolling, totalWeight }) => {
  const theme = useTheme()
  const { showAlert } = useAlert()

  const itemTransition = useMemo(
    () =>
      [0, 20].map((delay) =>
        theme.transitions.create(["opacity", "visibility", "transform"], {
          duration: theme.transitions.duration.shortest,
          delay: delay,
        })
      ),
    [theme.transitions]
  )

  const [hovered, setHovered] = useState(false)

  const [, deleteEntry] = useDeleteRandomWheelEntryMutation()

  const onDelete = async (entry: RandomWheelEntryFragment) => {
    const { data } = await deleteEntry(
      { id: entry.id },
      {
        additionalTypenames: ["RandomWheelEntry"],
      }
    )

    if (data?.deleteRandomWheelEntry) {
      // setEntries(entries.filter(e => e.id !== entry.id))
    }

    showAlert(`Deleted entry '${entry.name}'`)
  }

  return (
    <ListItem
      key={entry.id}
      role="listitem"
      dense
      button
      sx={{
        mt: "3px",
        "&:hover + .hoverItem, &:hover .hoverItem, &:focus-within + .hoverItem, &:focus-within .hoverItem": {
          transition: itemTransition[1],
          visibility: "visible",
          opacity: 1,
          // visibility: deleteEnabled ? "visible" : "hidden",
          // transform: "scale(1) translateY(-50%)",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* TODO: For transitions, maybe makes it easier? -> https://mui.com/material-ui/transitions/ */}
      <ListItemText
        primary={entry.name}
        primaryTypographyProps={{
          fontSize: "0.925rem",
          fontWeight: 500,
        }}
      />
      {editable && (!scrolling || hovered) && !(scrolling && hovered) && (
        <>
          <ListItemSecondaryAction
            className="hoverItem"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              gap: 1,
              transition: itemTransition[0],
              opacity: 0,
              visibility: "hidden",
              // transform: "scale(0) translateY(-100%)",
              "&:hover, &:focus-within": {
                transition: itemTransition[1],
                opacity: 1,
                visibility: "visible",
                // visibility: deleteEnabled ? "visible" : "hidden",
                // transform: "scale(1) translateY(-50%)",
              },
            }}
          >
            <UpdateEntryForm entry={entry} disabled={disabled} totalWeight={totalWeight} />

            <Tooltip title="Delete" arrow enterDelay={1000} placement="top">
              <IconButton
                onClick={async () => await onDelete?.(entry)}
                // onClick={async () => await onDelete(entry)}
                role="button"
                disabled={disabled}
                aria-label={`Delete entry '${entry.name}'`}
              >
                <SvgIcon
                  component={HiTrash}
                  fontSize="small"
                  viewBox="0 0 20 20"
                  color={disabled ? "disabled" : "error"}
                />
                {/* <TiDelete fontSize="small" color="error" /> */}
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  )
}
