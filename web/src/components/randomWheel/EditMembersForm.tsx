import { FC, RefObject } from "react"
import { Button, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Portal, SvgIcon } from "@mui/material"
import { Formik, Form, FormikProps } from "formik"
import { useRandomWheelBySlugMembersQuery, useUpdateRandomWheelMembersMutation } from "../../generated/graphql"
import { HiTrash } from "react-icons/hi"
import { SelectField } from "../input/SelectField"
import { TiPlus, TiTimes } from "react-icons/ti"
import { InputField, LoadingButton } from "../components"

interface MemberFormEntry {
  id: string | null
  username: string
  role: string
  displayname?: string
  delete?: boolean
}

interface InitialValues {
  members: { [username: string]: MemberFormEntry }
  draft?: { username: string, role: string }
}

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<InitialValues>>
}

export const EditMembersForm: FC<Props> = ({ slug, formRef, dialogActionsRef }) => {

  const [{ data, fetching: fetchingWheel }, refetchWheel] = useRandomWheelBySlugMembersQuery({
    variables: { slug: slug },
  })
  const [, updateMembers] = useUpdateRandomWheelMembersMutation()

  const wheel = data?.randomWheelBySlug

  if (!wheel) {
    return null
  }

  const initialMembers = wheel.members.reduce((acc, member) => ({
    ...acc,
    [member.user.username]: {
      id: member.id,
      username: member.user.username,
      displayname: member.user.displayname ?? undefined,
      role: member.roleName,
    },
  }), {})

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
        const mappedMembers = Object.values(values.members).map(({ id, displayname, ...member }) => member)
        const members = values.draft ? [...mappedMembers, values.draft] : mappedMembers

        console.log(members)

        const { error } = await updateMembers({
          randomWheelId: wheel.id,
          members: members,
        })

        if (error) {
          console.warn(error)
        }

        // FIX: Doesn't reload wheel (and members) when the members are empty and one is added
        // Any fix for this? Maybe normalized cache?
        if (members.length === 1) {
          refetchWheel({ requestPolicy: "network-only" })
        }

        // // TODO: proper error handling/feedback
        // TODO: Additional checks (eg. username exists, username already a member)

      }}
    >
      {({ isSubmitting, values, initialValues, setFieldValue, isValid }) => (
        <Form id="editMembersForm">

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <List role="list">
                {Object.entries(values.members)
                  .filter(([, member]) => !member.delete)
                  .map(([key, member]) => (
                    <ListItem key={member.id} role="listitem" dense>
                      <ListItemText
                        primary={member.displayname}
                        secondary={`@${member.username}`}
                        primaryTypographyProps={{
                          fontSize: "1rem",
                          fontWeight: 500,
                        }}
                        secondaryTypographyProps={{
                          fontSize: "0.925rem",
                        }}
                        sx={{ my: 0 }}
                      />
                      <ListItemSecondaryAction sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}>

                        <SelectField
                          name={`members.${key}.role`}
                          options={[
                            { value: "VIEW", label: "View" },
                            { value: "EDIT", label: "Edit" },
                          ]}
                          required
                          hiddenLabel
                          sx={{ width: "7rem" }}
                        />
                        <IconButton
                          onClick={() => {
                            // setDeletedMembers([...deletedMembers, member.id])
                            setFieldValue(`members.${key}.delete`, true)
                            console.log("delete", key)
                          }}
                          role="button"
                          aria-label={`Delete member '${member.username}'`}
                        >
                          <SvgIcon component={HiTrash} fontSize="small" viewBox="0 0 20 20" color="error" />
                        </IconButton>

                      </ListItemSecondaryAction>

                    </ListItem>
                  ))}

                {values.draft ? (
                  <ListItem role="listitem" dense>
                    <InputField name="draft.username" required hiddenLabel placeholder="Username *" sx={{ width: "13rem", ml: -1 }} />

                    <ListItemSecondaryAction sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}>

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

                    </ListItemSecondaryAction>

                  </ListItem>
                ) : (
                  <Button
                    color="success"
                    variant="outlined"
                    sx={{ ml: 0.5, mt: 1.25 }}
                    endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
                    onClick={() => {
                      setFieldValue("draft", { username: "", role: "VIEW" })
                    }}>
                    Add
                  </Button>
                )}

              </List>
            </Grid>

            <Portal container={dialogActionsRef?.current}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || fetchingWheel}
                disabled={
                  !isValid || JSON.stringify(values) === JSON.stringify(initialValues)
                  || values.draft?.username === ""
                }
                form="editMembersForm"
              >
                Update
              </LoadingButton>
            </Portal>

          </Grid>

        </Form>
      )}
    </Formik>
  )
}
