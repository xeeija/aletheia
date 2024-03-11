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
}

export const ChannelRewardDialog: FC<Props> = ({ open, onClose, reward, type }) => {
  const formRef = useRef<FormikProps<ChannelRewardValues>>(null)
  const actionsRef = useRef(null)

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
      title={type === "create" ? "Create Channel Reward" : "Edit Channel Reward"}
      open={open}
      onClose={() => {
        closeHandler()

        if (formRef.current) {
          setTimeout(() => formRef.current?.resetForm(), 350)
        }
      }}
      actionsRef={actionsRef}
    >
      {type === "edit" && reward && <EditChannelRewardForm actionsRef={actionsRef} formRef={formRef} reward={reward} />}
      {type === "create" && <CreateChannelRewardForm actionsRef={actionsRef} formRef={formRef} />}
    </FormDialog>
  )
}
