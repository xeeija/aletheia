"use client"

import { FormDialog } from "@/components"
import { ChannelRewardValues, CreateChannelRewardForm, EditChannelRewardForm } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { FormikProps } from "formik"
import { FC, useRef } from "react"

interface Props {
  open: boolean
  onClose: () => void
  reward?: CustomRewardFragment
  type: "create" | "edit"
  readonly?: boolean
}

export const ChannelRewardDialog: FC<Props> = ({ open, onClose, reward, type, readonly }) => {
  const formRef = useRef<FormikProps<ChannelRewardValues>>(null)
  const actionsRef = useRef<Element>(null)

  const title = type === "create" ? "Create Channel Reward" : "Edit Channel Reward"

  const closeHandler = () => {
    onClose()
    setTimeout(() => {
      formRef.current?.resetForm()
    }, 350)
  }

  return (
    <FormDialog
      keepMounted
      maxWidth="sm"
      title={readonly ? "Channel Reward" : title}
      open={open}
      onClose={() => {
        closeHandler()

        if (formRef.current) {
          setTimeout(() => formRef.current?.resetForm(), 350)
        }
      }}
      cancelText={readonly ? "Close" : undefined}
      actionsRef={actionsRef}
    >
      {type === "edit" && reward && (
        <EditChannelRewardForm
          actionsRef={actionsRef}
          formRef={formRef}
          reward={reward}
          onClose={closeHandler}
          readonly={readonly}
        />
      )}
      {type === "create" && (
        <CreateChannelRewardForm actionsRef={actionsRef} formRef={formRef} onClose={closeHandler} />
      )}
    </FormDialog>
  )
}
