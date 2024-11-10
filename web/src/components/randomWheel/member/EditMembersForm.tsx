"use client"

import { InputField, LoadingButton, NoData, SelectField } from "@/components"
import { useRandomWheel } from "@/hooks"
import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Portal, SvgIcon } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject } from "react"
import { HiTrash } from "react-icons/hi"
import { TiPlus, TiTimes } from "react-icons/ti"

interface MemberFormEntry {
  id: string | null
  username: string
  role: string
  displayname?: string
  delete?: boolean
}

interface InitialValues {
  members: { [username: string]: MemberFormEntry }
  draft?: { username: string; role: string }
}

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<InitialValues>>
  readonly?: boolean
}

export const EditMembersForm: FC<Props> = ({ slug, formRef, dialogActionsRef, readonly }) => {
  const [{ members: defaultMembers, fetching }, { updateMembers, fetchMembers }] = useRandomWheel(slug, {
    members: true,
  })

  const initialMembers: Record<string, MemberFormEntry> = (defaultMembers ?? []).reduce(
    (acc, member) => ({
      ...acc,
      [member.user.username]: {
        id: member.id,
        username: member.user.username,
        displayname: member.user.displayname ?? undefined,
        role: member.roleName,
      },
    }),
    {}
  )

  const initialValues: InitialValues = {
    members: initialMembers,
  }

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validate={() => {
        // TODO: hiddenError in input
        // async validation if username exists or is already a member (duplicate)
      }}
      onSubmit={async (values) => {
        const mappedMembers = Object.values(values.members).map((member) => ({
          username: member.username,
          role: member.role,
          delete: member.delete,
        }))

        const members = values.draft ? [...mappedMembers, values.draft] : mappedMembers

        const response = await updateMembers(members)

        // FIX: Doesn't reload wheel (and members) when the members are empty and one is added
        // Any fix for this? Maybe normalized cache?
        if (response?.length ?? 0 <= 1) {
          fetchMembers({ requestPolicy: "cache-and-network" })
        }

        // // TODO: proper error handling/feedback
        // TODO: Additional checks (eg. username exists, username already a member)
      }}
    >
      {({ isSubmitting, values, initialValues, setFieldValue, isValid }) => {
        const members = Object.entries(values.members) //.filter(([, member]) => !member.delete)

        return (
          <Form id="editMembersForm" autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <List role="list">
                  {members.map(([key, member]) => (
                    <ListItem
                      key={member.id}
                      role="listitem"
                      dense
                      secondaryAction={
                        !member.delete && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <SelectField
                              name={`members.${key}.role`}
                              options={[
                                { value: "VIEW", label: "View" },
                                { value: "EDIT", label: "Edit" },
                              ]}
                              required
                              hiddenLabel
                              disabled={readonly}
                              sx={{ width: "7rem" }}
                            />
                            {!readonly && (
                              <IconButton
                                onClick={() => {
                                  // setDeletedMembers([...deletedMembers, member.id])
                                  setFieldValue(`members.${key}.delete`, true)
                                }}
                                role="button"
                                aria-label={`Delete member '${member.username}'`}
                              >
                                <SvgIcon component={HiTrash} fontSize="small" viewBox="0 0 20 20" color="error" />
                              </IconButton>
                            )}
                          </Box>
                        )
                      }
                    >
                      <ListItemText
                        primary={`${member.delete ? `Deleted ` : ""}${member.displayname ?? member.username}`}
                        secondary={!member.delete ? `@${member.username}` : undefined}
                        primaryTypographyProps={{
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: member.delete ? "textSecondary" : undefined,
                        }}
                        secondaryTypographyProps={{
                          fontSize: "0.925rem",
                        }}
                        sx={{ my: member.delete ? 0 : 1 }}
                      />
                    </ListItem>
                  ))}

                  {!readonly && values.draft && (
                    <ListItem
                      role="listitem"
                      dense
                      secondaryAction={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <SelectField
                            name="draft.role"
                            options={[
                              { value: "VIEW", label: "View" },
                              { value: "EDIT", label: "Edit" },
                            ]}
                            required
                            hiddenLabel
                            sx={{ width: "7rem" }}
                          />
                          <IconButton
                            role="button"
                            aria-label={`Delete draft member`}
                            onClick={() => {
                              setFieldValue("draft", initialValues.draft)
                            }}
                          >
                            <SvgIcon component={TiTimes} fontSize="small" viewBox="3 2 20 20" color="error" />
                          </IconButton>
                        </Box>
                      }
                    >
                      <InputField
                        name="draft.username"
                        required
                        hiddenLabel
                        placeholder="Username *"
                        sx={{ width: "13rem", ml: -1 }}
                      />
                    </ListItem>
                  )}
                </List>

                {members.length === 0 && !values.draft && (
                  <NoData iconSize={160} image="/img/teamwork.svg" sx={{ mt: 0 }} textProps={{ variant: "body1" }}>
                    There are no members yet.
                  </NoData>
                )}

                {!readonly && !values.draft && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: members.length === 0 ? "center" : "start",
                    }}
                  >
                    <Button
                      color="success"
                      variant={members.length === 0 ? "contained" : "outlined"}
                      sx={{ ml: 0.5, mt: 1.25 }}
                      endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
                      onClick={() => {
                        setFieldValue("draft", { username: "", role: "VIEW" })
                      }}
                    >
                      New
                    </Button>
                  </Box>
                )}
              </Grid>

              <Portal container={dialogActionsRef?.current}>
                {!readonly && (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting || fetching.members}
                    disabled={
                      !isValid ||
                      JSON.stringify(values) === JSON.stringify(initialValues) ||
                      values.draft?.username === ""
                    }
                    form="editMembersForm"
                  >
                    Update
                  </LoadingButton>
                )}
              </Portal>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}
