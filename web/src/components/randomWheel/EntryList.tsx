import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, SvgIcon, useTheme } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, useEffect, useRef, useState } from "react"
import { HiTrash } from "react-icons/hi"
import {
  RandomWheelEntryFragment,
  useDeleteRandomWheelEntryMutation,
  useUpdateRandomWheelEntryMutation,
} from "../../generated/graphql"
import { AlertPopup, InputField } from "../components"

interface Props {
  entries: RandomWheelEntryFragment[]
  editable?: boolean
  spinning?: boolean
  autoScroll?: boolean
  autoScrollThreshold?: number
}

export const EntryList: FC<Props> = ({ entries, editable, spinning, autoScroll, autoScrollThreshold = 50 }) => {
  const theme = useTheme()
  const maxHeight = 474 + (!editable ? 84 + 64 : 0)

  // const [deleteEnabled, setDeleteEnabled] = useState(false)

  // useEffect(() => {
  //   const keydownListener: (this: Window, ev: KeyboardEvent) => any =
  //     (ev) => {
  //       if (ev.key === "Shift" && !deleteEnabled) {
  //         setDeleteEnabled(true)
  //       }
  //     }

  //   const keyupListener: (this: Window, ev: KeyboardEvent) => any =
  //     (ev) => {
  //       if (ev.key === "Shift" && deleteEnabled) {
  //         setDeleteEnabled(false)
  //       }
  //     }

  //   window.addEventListener("keydown", keydownListener)
  //   window.addEventListener("keyup", keyupListener)

  //   return () => {
  //     window.removeEventListener("keydown", keydownListener)
  //     window.removeEventListener("keyup", keyupListener)
  //   }
  // })

  // const itemTransition = theme.transitions.create(["opacity", "visibility", "transform"], {
  //   duration: theme.transitions.duration.shortest,
  //   delay: 0,
  // })
  // const itemInTransition = theme.transitions.create(["opacity", "visibility", "transform"], {
  //   duration: theme.transitions.duration.shortest,
  //   delay: 1000,
  // })

  // map delays

  const itemTransition = [0, 0].map((delay) =>
    theme.transitions.create(["opacity", "visibility", "transform"], {
      duration: theme.transitions.duration.shortest,
      delay: delay,
    })
  )

  const [, deleteEntry] = useDeleteRandomWheelEntryMutation()
  const [, updateEntry] = useUpdateRandomWheelEntryMutation()
  const [showError, setShowError] = useState<JSX.Element | string | null>(null)

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

    setShowError(`Deleted entry '${entry.name}'`)
  }

  // auto scroll
  const listRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const list = listRef?.current

    // scrollHeight - clientHeight = scrollTopMax
    if (autoScroll && list && list.scrollHeight - list.clientHeight - list.scrollTop < autoScrollThreshold) {
      list?.scrollTo({ top: list.scrollHeight - list.clientHeight })
    }
  }, [entries, listRef, autoScroll, autoScrollThreshold])

  const totalWeight = entries.reduce((acc, entry) => acc + entry.weight, 0)

  return (
    <List role="list" ref={listRef} sx={{ py: 0, overflowY: "auto", maxHeight: maxHeight }}>
      {/* TODO: Provider and custom hook for alerts, maybe with possibility to stack them (see: notistack) */}
      <AlertPopup severity="success" messageState={[showError, setShowError]} />

      {entries.map((entry) => (
        <ListItem
          key={entry.id}
          role="listitem"
          dense
          button
          sx={{
            "&:hover + .hoverItem, &:hover .hoverItem, &:focus-within + .hoverItem, &:focus-within .hoverItem": {
              transition: itemTransition[1],
              visibility: "visible",
              opacity: 1,
              // visibility: deleteEnabled ? "visible" : "hidden",
              // transform: "scale(1) translateY(-50%)",
            },
          }}
        >
          {/* TODO: For transitions, maybe makes it easier? -> https://mui.com/material-ui/transitions/ */}
          <ListItemText
            primary={entry.name}
            primaryTypographyProps={{
              fontSize: "0.925rem",
              fontWeight: 500,
            }}
          />
          {editable && (
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
                <Formik
                  initialValues={{
                    weight: entry.weight ?? null,
                  }}
                  enableReinitialize
                  onSubmit={async ({ weight }, { resetForm }) => {
                    // TODO: Replace with proper number validation (pattern or so)
                    if (!Number.isInteger(weight)) {
                      resetForm()
                    }

                    await updateEntry({
                      id: entry.id,
                      entry: { weight },
                    })
                  }}
                >
                  {({ submitForm, dirty }) => (
                    <Form>
                      <InputField
                        name="weight"
                        type="number"
                        hiddenArrows
                        disabled={spinning}
                        tooltip={`${entry.weight}:${totalWeight} (${Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format((entry.weight / totalWeight) * 100)}%)`}
                        tooltipProps={{ placement: "left" }}
                        sx={{ width: 48 }}
                        inputProps={{
                          style: {
                            textAlign: "right",
                            padding: "0.25em 0.5em",
                          },
                          min: 1,
                          onKeyPress: (ev) => {
                            if (!"012345679".includes(ev.key)) {
                              ev.preventDefault()
                            }
                          },
                        }}
                        onBlur={() => {
                          if (dirty) {
                            void submitForm()
                          }
                        }}
                      />
                    </Form>
                  )}
                </Formik>

                <IconButton
                  onClick={() => void onDelete(entry)}
                  role="button"
                  disabled={spinning}
                  aria-label={`Delete entry '${entry.name}'`}
                >
                  <SvgIcon
                    component={HiTrash}
                    fontSize="small"
                    viewBox="0 0 20 20"
                    color={spinning ? "disabled" : "error"}
                  />
                  {/* <TiDelete fontSize="small" color="error" /> */}
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </List>
  )
}
