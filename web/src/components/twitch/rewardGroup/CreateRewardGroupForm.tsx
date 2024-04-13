import { AlertPopup, LoadingButton } from "@/components"
import { RewardGroupFormFields, RewardItemList } from "@/components/twitch"
import { RewardGroupItemInput } from "@/generated/graphql"
import { useChannelRewards, useRewardGroups } from "@/hooks"
import { FormDialogProps } from "@/types"
import { Box, Portal, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, ReactNode, useState } from "react"
import { array, boolean, object, string } from "yup"

export interface RewardGroupValues {
  name: string
  active: boolean
  items: RewardGroupItemInput[]
}

const defaultItem: RewardGroupItemInput = {
  rewardId: "",
  triggerCooldown: true,
}

type Props = FormDialogProps<RewardGroupValues>

export const CreateRewardGroupForm: FC<Props> = ({ formRef, actionsRef, onClose }) => {
  const { createGroup, fetchingCreate } = useRewardGroups()
  const { channelRewards } = useChannelRewards()

  const [showError, setShowError] = useState<ReactNode>(null)
  const [showSuccess, setShowSuccess] = useState<ReactNode>(null)

  const initialValues: RewardGroupValues = {
    name: "",
    active: true,
    items: [defaultItem],
  }

  const validationSchema = object().shape({
    name: string(), //.required("Required"),
    active: boolean(),
    items: array()
      .of(
        object().shape({
          rewardId: string().required("Required"),
          triggerCooldown: boolean(),
        })
      )
      .min(1, "At least one reward is required"),
  })

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      // validateOnChange={false}
      onSubmit={async (values) => {
        const response = await createGroup(
          {
            name: values.name || null,
            active: values.active,
          },
          values.items
        )

        if (response.rewardGroup) {
          setShowSuccess(`'${response.rewardGroup.name}' created successfully`)
          onClose?.()
        } else {
          // if (!handleTwitchApiError(response.error, setShowError)) {
          setShowError(response.error?.message || "An error occurred")
          // }
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form id="createRewardGroupForm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <RewardGroupFormFields />

            <Typography sx={{ mt: 1, fontWeight: 500, fontSize: "1.1em" }}>Rewards in this group</Typography>

            <RewardItemList channelRewards={channelRewards} />

            <AlertPopup severity="success" messageState={[showSuccess, setShowSuccess]} />
            <AlertPopup severity="warning" messageState={[showError, setShowError]} />

            <Portal container={actionsRef?.current}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="success"
                loading={isSubmitting}
                disabled={!dirty || fetchingCreate}
                form="createRewardGroupForm"
              >
                Create
              </LoadingButton>
            </Portal>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
