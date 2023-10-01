import { Checkbox, Grid, IconButton, List, ListItem, ListItemSecondaryAction, Portal, SvgIcon } from "@mui/material"
import { Form, Formik, FormikProps, FormikValues } from "formik"
import { FC, RefObject } from "react"
import { HiTrash } from "react-icons/hi"
import { useChannelRewardsQuery, useEventSubscriptionsForWheelQuery, useSyncEntriesWithRedemptionMutation } from "../../generated/graphql"
import { useRandomWheel } from "../../hooks"
import { LoadingButton, SelectField } from "../components"
import { CustomRewardMenuItem } from "../input/CustomRewardMenuItem"

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<FormikValues>>
}

export const RedemptionSyncForm: FC<Props> = ({ slug, formRef, dialogActionsRef }) => {

  const [{ wheel }] = useRandomWheel(slug, { details: true })

  if (!wheel) {
    return null
  }

  const [{ data }] = useChannelRewardsQuery({
    variables: {

    }
  })

  const [{ data: subscriptions }] = useEventSubscriptionsForWheelQuery({
    variables: {
      randomWheelId: wheel.id
    }
  })
  console.log(subscriptions?.eventSubscriptionsForWheel)

  const [, syncEntries] = useSyncEntriesWithRedemptionMutation()


  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          rewardId: ""
        }}
        enableReinitialize
        onSubmit={async ({ rewardId }) => {
          const result = await syncEntries({
            randomWheelId: wheel.id,
            rewardId: rewardId,
          }, {
            additionalTypenames: ["EventSubscription"]
          })

          if (!result.data?.syncEntriesWithRedemption) {
            console.warn("error syncing entries")
          }

        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form id="redemptionSyncForm">

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <List role="list" dense>
                  {subscriptions?.eventSubscriptionsForWheel.map((subscription) => (
                    // {members.map(([key, member]) => (
                    subscription.reward &&
                    <ListItem key={subscription.id} role="listitem" sx={{ width: "100%" }}>
                      <CustomRewardMenuItem reward={subscription.reward} noMenuItem />


                      <ListItemSecondaryAction sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}>

                        {/* {!readonly && ( */}
                        {/* <CheckboxField name="active" tooltip="Active" checked={!subscription.paused} /> */}

                        <Checkbox checked={!subscription.paused} />

                        <IconButton
                          onClick={() => {
                            // setDeletedMembers([...deletedMembers, member.id])
                            // setFieldValue(`members.${key}.delete`, true)
                          }}
                          role="button"
                        >
                          <SvgIcon component={HiTrash} fontSize="small" viewBox="0 0 20 20" color="error" />
                        </IconButton>

                      </ListItemSecondaryAction>

                    </ListItem>
                  ))}
                </List>

              </Grid>

              <Grid item xs={12}>
                <SelectField
                  name={`reward`}
                  options={data?.channelRewards.map((reward) => ({
                    value: reward.id,
                    label: <CustomRewardMenuItem reward={reward} noMenuItem />
                  }))}
                  value=""
                  required
                  fullWidth
                  label="Reward"
                // disabled={readonly}
                />
              </Grid>
            </Grid>

            <Portal container={dialogActionsRef?.current}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!dirty}
                form="redemptionSyncForm"
              >
                Update
              </LoadingButton>
            </Portal>

          </Form>
        )}
      </Formik>

    </>
  )
}
