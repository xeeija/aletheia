import { BooleanField, SelectField } from "@/components"
import { ChannelRewardMenuItem } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { Box, IconButton, ListItem, SvgIcon, Tooltip } from "@mui/material"
import { FC } from "react"
import { HiTrash } from "react-icons/hi"

interface Props {
  index: number
  channelRewards: CustomRewardFragment[] | undefined
  draft?: boolean
  rewardId?: string
  onDelete?: (index: number) => void
  onValidate?: (rewardId: string, index: number) => string | void
  hideDelete?: boolean
}

export const RewardItemListItem: FC<Props> = ({ index, channelRewards, onDelete, onValidate, hideDelete }) => {
  return (
    <ListItem role="listitem" dense sx={{ display: "flex", gap: 2, px: 0 }}>
      <SelectField
        name={`items[${index}].rewardId`}
        options={channelRewards?.map((reward) => ({
          value: reward.id,
          label: <ChannelRewardMenuItem reward={reward} noMenuItem />,
        }))}
        validate={(value: string) => {
          return onValidate?.(value, index)
        }}
        required
        fullWidth
        label="Reward"
        // sx={{ height: 54 }} // fixedHeight prop
      />

      <BooleanField
        name={`items[${index}].triggerCooldown`}
        tooltip="Activate the group cooldown when this reward is redeemed"
        size="medium"
        toggle
        // label="Trigger"
        // labelPlacement="start"
      />

      {!hideDelete && (
        <Box>
          <Tooltip title="Delete" arrow enterDelay={1000}>
            <IconButton role="button" aria-label="Delete item" onClick={() => onDelete?.(index)} disabled={hideDelete}>
              <SvgIcon component={HiTrash} viewBox="0 0 20 20" color={hideDelete ? "disabled" : "error"} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </ListItem>
  )
}
