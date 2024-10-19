"use client"

import { FormDialog } from "@/components"
import { CreateRewardGroupForm, EditRewardGroupForm, RewardGroupValues } from "@/components/twitch"
import { RewardGroupFragment } from "@/generated/graphql"
import { FormikProps } from "formik"
import { FC, useRef } from "react"

interface Props {
  open: boolean
  onClose: () => void
  rewardGroup?: RewardGroupFragment
  type: "create" | "edit"
  readonly?: boolean
}

export const RewardGroupDialog: FC<Props> = ({ open, onClose, rewardGroup, type, readonly }) => {
  const formRef = useRef<FormikProps<RewardGroupValues>>(null)
  const actionsRef = useRef(null)

  const title = type === "create" ? "Create Reward Group" : "Edit Reward Group"

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
      {type === "edit" && rewardGroup && (
        <EditRewardGroupForm
          actionsRef={actionsRef}
          formRef={formRef}
          rewardGroup={rewardGroup}
          onClose={closeHandler}
          readonly={readonly}
        />
      )}
      {type === "create" && <CreateRewardGroupForm actionsRef={actionsRef} formRef={formRef} onClose={closeHandler} />}
    </FormDialog>
  )
}
