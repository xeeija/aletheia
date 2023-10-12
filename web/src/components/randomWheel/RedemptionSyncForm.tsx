import { Box, Button, CircularProgress, FormHelperText, Grid, IconButton, List, ListItem, ListItemSecondaryAction, Portal, SvgIcon, Typography } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject, useState } from "react"
import { HiAnnotation, HiTrash } from "react-icons/hi"
import { TiMediaPause, TiMediaPlay, TiPlus, TiRefresh, TiTimes, TiUser } from "react-icons/ti"
import { EventSubscriptionFragment } from "../../generated/graphql"
import { useChannelRewards, useEventSubscriptionsWheel, useRandomWheel } from "../../hooks"
import { CheckboxField, LoadingButton, NoData, SelectField } from "../components"
import { CustomRewardMenuItem } from "../input/CustomRewardMenuItem"

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<InitialValues>>
}

interface SubscriptionEntry extends EventSubscriptionFragment {
  delete?: boolean
}

interface InitialValues {
  subscriptions: SubscriptionEntry[]
  rewardId: string
  useInput: boolean
}

export const RedemptionSyncForm: FC<Props> = ({ slug, formRef, dialogActionsRef }) => {

  const [{ wheel }] = useRandomWheel(slug, { details: true, socket: false })

  const { channelRewards } = useChannelRewards()

  const {
    subscriptions,
    fetchingPause,
    syncEntries,
    pauseEntriesSync,
    deleteEntriesSync,
  } = useEventSubscriptionsWheel({
    randomWheelId: wheel?.id ?? "",
  })

  const [showNewSyncronization, setShowNewSyncronization] = useState(false)

  if (!wheel) {
    return null
  }

  const rewards = channelRewards?.filter(reward => !subscriptions?.some(s => s.rewardId === reward.id))

  // const [{ data: subscriptionData }] = useEventSubscriptionsForWheelQuery({
  //   variables: {
  //     randomWheelId: wheel.id
  //   }
  // })
  // console.log(subscriptionData?.eventSubscriptionsForWheel)

  // const [, syncEntries] = useSyncEntriesWithRedemptionMutation()

  const initialValues: InitialValues = {
    // subscriptions: subscriptionData?.eventSubscriptionsForWheel ?? []
    subscriptions: subscriptions ?? [],
    rewardId: "",
    useInput: false,
  }
  // const initialSubscriptions = subscriptions?.eventSubscriptionsForWheel.map(s => ({
  //   ...s,

  // } as SubscriptionEntry))

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        enableReinitialize
        validateOnChange={false}
        validate={(values) => {
          const entries = values as InitialValues
          if (showNewSyncronization && !entries.rewardId) {
            return { rewardId: "Required" }
          }

          return
        }}
        onSubmit={async (values, { setFieldValue }) => {

          // only create if new
          if (showNewSyncronization && values.rewardId) {
            await syncEntries({
              randomWheelId: wheel.id,
              rewardId: values.rewardId,
              useInput: values.useInput,
            })
            setShowNewSyncronization(false)
            setFieldValue("rewardId", "")
          }

          const deleteEntries = values.subscriptions.filter(s => s.delete)

          // console.log("deleteEntries", deleteEntries)

          if (deleteEntries.length > 0) {
            await deleteEntriesSync(deleteEntries.map(e => e.id))
          }

          // const result = await syncEntries({
          //   randomWheelId: wheel.id,
          //   rewardId: rewardId,
          // }, {
          //   additionalTypenames: ["EventSubscription"]
          // })

          // if (!result.data?.syncEntriesWithRedemption) {
          //   console.warn("error syncing entries")
          // }

        }}
      >
        {({ values, isSubmitting, dirty, setFieldValue, setFieldError }) => {
          // console.log(subscriptions)

          return (
            <Form id="redemptionSyncForm">

              <Grid container spacing={2}>

                <Grid item xs={12}>
                  {!!subscriptions?.length ? (
                    <List role="list" dense>
                      {values.subscriptions.map((subscription, i) => (
                        // subscription.reward &&
                        <ListItem key={subscription.id} role="listitem" sx={{ width: "100%" }}>
                          {subscription.reward && !subscription.delete && (
                            <Box sx={{
                              display: "flex",
                              gap: 0.25,
                              alignItems: "center"
                            }}>
                              <CustomRewardMenuItem reward={subscription.reward} noMenuItem />
                              <CheckboxField
                                name={`subscriptions[${i}].useInput`}
                                // size="small"
                                tooltip={subscription.useInput ? "Use input as entry" : "Use display name as entry"}
                                disabled
                                checkedIcon={<SvgIcon component={HiAnnotation} viewBox="0 -2 24 24" />}
                                icon={<SvgIcon component={TiUser} viewBox="0 -1 24 24" />}
                              />
                            </Box>
                          )}

                          {subscription.delete && (
                            <Typography color="textSecondary" sx={{ ml: 1, my: 1, }}>
                              Deleted
                            </Typography>
                          )}
                          {!subscription.rewardId && (
                            <NoData
                              direction="row"
                              iconSize="xs"
                              textProps={{ variant: "body1", mb: 0 }}
                              sx={{ mt: 0 }}
                            >
                              Failed to load reward
                            </NoData>
                            // <Typography color="textSecondary" sx={{ fontStyle: "italic" }}>
                            //   Failed to load reward
                            // </Typography>
                          )}

                          {!subscription.delete && (
                            <ListItemSecondaryAction sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                              <Typography variant="body2" color="textSecondary" sx={{ mr: -0.5 }}>
                                {subscription.pending ? "Pending" :
                                  (subscription.paused ? "Paused" : "Active")}
                              </Typography>

                              {/* {subscription.pending &&
                              <IconButton color="info" sx={{ mr: -1.5 }}>
                                <SvgIcon component={TiRefresh} viewBox="2 2 20 20"
                                  onClick={async () => {
                                    await syncEntries({ randomWheelId: wheel.id, rewardId: entries.rewardId })
                                    setFieldValue("rewardId", "")
                                    refetchSubscriptions({
                                      additionalTypenames: ["EventSubscription"]
                                    })
                                  }}
                                />
                              </IconButton>
                            } */}

                              {subscription.pending && !subscription.paused && (
                                <IconButton color="info" sx={{ mr: 0.25 }}>
                                  <SvgIcon component={TiRefresh} viewBox="2 2 20 20"
                                    // {/* <SvgIcon component={TiWarning} color="warning" */}
                                    onClick={async () => {
                                      // await syncEntries(entries.rewardId)
                                      await pauseEntriesSync(subscription.id, false)
                                    }}
                                  />
                                </IconButton>
                              )}

                              {(fetchingPause || subscription.pending) &&
                                <IconButton disabled sx={{ mr: 1, mt: "2px" }}>
                                  <CircularProgress size={18} color="inherit" />
                                </IconButton>
                              }
                              {!(fetchingPause || subscription.pending) &&
                                <CheckboxField
                                  name={`subscriptions[${i}].paused`}
                                  tooltip={subscription.paused ? "Activate" : "Pause"}
                                  value={subscription.paused}
                                  checked={subscription.paused}
                                  // indeterminate={subscription.pending || fetchingPause}
                                  // disabled={subscription.pending || fetchingPause}
                                  // indeterminateIcon={<CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />}
                                  icon={<SvgIcon component={TiMediaPause} color="success" viewBox="1 1 22 22" />}
                                  checkedIcon={<SvgIcon component={TiMediaPlay} color="success" />}
                                  onClick={async () => {
                                    console.log("pause", subscription.paused)
                                    await pauseEntriesSync(subscription.id, !subscription.paused)
                                  }}
                                />
                              }

                              {/* {!subscription.paused && !fetchingPause && !subscription.pending &&
                              <IconButton color="success"
                                onClick={async () => {
                                  console.log("pause", subscription.paused)
                                  await pauseEntriesSync(subscription.id, !subscription.paused)
                                }}>
                                <SvgIcon component={TiMediaPause} viewBox="1 1 22 22" />
                              </IconButton>
                            }

                            {subscription.paused && !fetchingPause && !subscription.pending &&
                              <IconButton color="success"
                                onClick={async () => {
                                  console.log("pause", subscription.paused)
                                  await pauseEntriesSync(subscription.id, !subscription.paused)
                                }}>
                                <SvgIcon component={TiMediaPlay}
                                // viewBox="2 2 20 20" 
                                />
                              </IconButton>
                            } */}

                              {subscription.pending && !fetchingPause &&
                                <IconButton color="info" sx={{ ml: 0 }}>
                                  <SvgIcon component={TiRefresh} viewBox="2 2 20 20"
                                    // {/* <SvgIcon component={TiWarning} color="warning" */}
                                    onClick={async () => {
                                      // await syncEntries(entries.rewardId)
                                      await pauseEntriesSync(subscription.id, false)
                                    }}
                                  />
                                </IconButton>
                              }

                              <IconButton
                                onClick={() => {
                                  setFieldValue(`subscriptions[${i}].delete`, true)
                                }}
                                role="button"
                              >
                                <SvgIcon component={HiTrash} fontSize="small" viewBox="0 0 20 20" color="error" />
                              </IconButton>

                            </ListItemSecondaryAction>
                          )}

                        </ListItem>
                      ))}
                      {/* {values.subscriptions.every((s: SubscriptionEntry) => s.delete) ? (
                        <Typography color="textSecondary" sx={{ ml: 1 }}>
                          All subscriptions will be deleted.
                        </Typography>
                      ) : null} */}
                    </List>
                  ) : null}

                  {subscriptions?.length || showNewSyncronization ? null : (
                    <NoData iconSize="sm" textProps={{ variant: "body1" }} >
                      No rewards are synchronized
                    </NoData>
                  )}

                </Grid>

                <Grid item xs={12}>
                  {showNewSyncronization && (
                    <>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                        New synchronization
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, alignItems: "start" }}>
                        <SelectField
                          name="rewardId"
                          options={rewards?.map((reward) => ({
                            value: reward.id,
                            label: <CustomRewardMenuItem reward={reward} noMenuItem />
                          }))}
                          required
                          fullWidth
                          label="New Reward"
                          helperText="This will override synchronization of other wheels with the same reward."
                          sx={{ mb: 1 }}
                        />
                        <Box sx={{ mt: 0.75 }}>
                          <IconButton
                            role="button"
                            onClick={() => {
                              setShowNewSyncronization(false)
                              setFieldValue("useInput", false)
                              setFieldValue("rewardId", "")
                              setFieldError("rewardId", undefined)
                            }}
                          >
                            <SvgIcon component={TiTimes} fontSize="small" viewBox="0 0 20 20" color="error" />
                          </IconButton>
                          <FormHelperText> </FormHelperText>
                        </Box>
                      </Box>
                      <CheckboxField name="useInput"
                        label="Use input as entry"
                        helperText="Use redemption input as entry. By default, the display name is used."
                      />
                    </>
                  )}
                  {!showNewSyncronization && (
                    <Box sx={{
                      display: "flex",
                      justifyContent: subscriptions?.length ? "start" : "center"
                    }}>
                      <Button
                        color="success"
                        variant="outlined"
                        sx={{ ml: 0.5, mt: 1.25 }}
                        endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
                        onClick={() => {
                          setShowNewSyncronization(true)
                        }}>
                        New
                      </Button>
                    </Box>
                  )}
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
          )
        }}
      </Formik>

    </>
  )
}
