import { CircularProgress, Grid, IconButton, List, ListItem, ListItemSecondaryAction, Portal, SvgIcon, Typography } from "@mui/material"
import { Form, Formik, FormikProps, FormikValues } from "formik"
import { FC, RefObject } from "react"
import { HiTrash } from "react-icons/hi"
import { TiMediaPause, TiMediaPlay, TiRefresh } from "react-icons/ti"
import { EventSubscriptionFragment, useChannelRewardsQuery } from "../../generated/graphql"
import { useEventSubscriptionsWheel, useRandomWheel } from "../../hooks"
import { LoadingButton, NoData, SelectField } from "../components"
import { CustomRewardMenuItem } from "../input/CustomRewardMenuItem"

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<FormikValues>>
}

interface SubscriptionEntry extends EventSubscriptionFragment {
  delete?: boolean
}

interface InitialValues {
  subscriptions: SubscriptionEntry[]
  rewardId: string
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

  const {
    subscriptions,
    fetchingPause,
    syncEntries,
    pauseEntriesSync,
    deleteEntriesSync,
  } = useEventSubscriptionsWheel({
    randomWheelId: wheel.id,
  })

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
    rewardId: ""
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
        onSubmit={async (values, { setFieldValue }) => {
          const entries = values as InitialValues

          // console.log("entries", entries)

          if (entries.rewardId) {
            await syncEntries(entries.rewardId)
            setFieldValue("rewardId", "")
          }

          const deleteEntries = entries.subscriptions.filter(s => s.delete)

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
        {({ values, isSubmitting, dirty, setFieldValue }) => {
          const entries = values as InitialValues
          // console.log(subscriptions)

          return (
            <Form id="redemptionSyncForm">

              <Grid container spacing={2}>

                <Grid item xs={12}>
                  {!!subscriptions?.length ? (
                    <List role="list" dense>
                      {entries.subscriptions.filter((v) => !v.delete).map((subscription, i) => (
                        // subscription.reward &&
                        <ListItem key={subscription.id} role="listitem" sx={{ width: "100%" }}>
                          {subscription.reward ? (
                            <CustomRewardMenuItem reward={subscription.reward} noMenuItem />
                          ) : (
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

                            {(fetchingPause) &&
                              <IconButton disabled sx={{ mr: 0.75, mt: "2px" }}>
                                <CircularProgress size={18} color="inherit" />
                              </IconButton>
                            }
                            {/* {!(fetchingPause || subscription.pending) &&
                              <CheckboxField
                                // noForm
                                // name={`subscriptions[${i}].paused`}
                                name="paused"
                                tooltip={subscription.paused ? "Activate" : "Pause"}
                                // value={subscription.paused}
                                checked={subscription.paused}
                                icon={<SvgIcon component={TiMediaPause} color="success" viewBox="1 1 22 22" />}
                                checkedIcon={<SvgIcon component={TiMediaPlay} color="success" />}
                                onClick={async () => {
                                  console.log("pause", subscription.paused)
                                  await pauseEntriesSync(subscription.id, !subscription.paused)
                                }}
                              // labelPlacement="start"
                              // noClickLabel
                              // label={subscription.paused ? "Paused" : "Active"}
                              // labelProps={{
                              //   componentsProps: {
                              //     typography: {
                              //       variant: "body2",
                              //       color: "textSecondary",
                              //       // color: values.subscriptions[i].paused ? "textPrimary" : "textSecondary"
                              //     }
                              //   }
                              // }}
                              />
                            } */}

                            {!subscription.paused && !fetchingPause && !subscription.pending &&
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
                                <SvgIcon component={TiMediaPlay} />
                                {/* // viewBox="2 2 20 20" */}
                              </IconButton>
                            }

                            {subscription.pending && !fetchingPause &&
                              <IconButton color="info" sx={{ ml: -0.00002 }}>
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

                        </ListItem>
                      ))}
                    </List>
                  ) : null}

                  {subscriptions?.length ? null : (
                    <NoData iconSize="sm" textProps={{ variant: "body1" }} >
                      No rewards are synchronized
                    </NoData>
                  )}

                </Grid>

                <Grid item xs={12}>
                  <SelectField
                    name="rewardId"
                    options={data?.channelRewards.map((reward) => ({
                      value: reward.id,
                      label: <CustomRewardMenuItem reward={reward} noMenuItem />
                    }))}
                    required
                    fullWidth
                    label="New Reward"
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
          )
        }}
      </Formik>

    </>
  )
}
