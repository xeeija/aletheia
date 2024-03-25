import { RewardGroupValues, RewardItemListItem } from "@/components/twitch"
import { CustomRewardFragment, RewardGroupItemInput } from "@/generated/graphql"
import { Button, List, SvgIcon } from "@mui/material"
import { useFormikContext } from "formik"
import { FC } from "react"
import { TiPlus } from "react-icons/ti"

const defaultItem: RewardGroupItemInput = {
  rewardId: "",
  triggerCooldown: true,
}

interface Props {
  channelRewards: CustomRewardFragment[] | undefined
}

export const RewardItemList: FC<Props> = ({ channelRewards }) => {
  const { values, setFieldError, setFieldValue } = useFormikContext<RewardGroupValues>()

  return (
    <List role="list">
      {values.items.map((item, index) => (
        <RewardItemListItem
          key={`${index}.${item.rewardId}`}
          channelRewards={channelRewards}
          index={index}
          onDelete={() => {
            setFieldError(`items[${index}].rewardId`, undefined)
            setFieldValue(
              "items",
              values.items.filter((_, i) => i !== index)
            )
          }}
          onValidate={(value) => {
            // Check for duplicates in previous items
            if (values.items.some((ri, i) => ri.rewardId === value && i < index)) {
              return "Rewards must be unique"
            }
          }}
        />
      ))}

      <Button
        color="success"
        variant="outlined"
        sx={{ mt: 1.25 }}
        endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
        onClick={() => {
          setFieldValue("items", [...values.items, defaultItem])
        }}
      >
        New
      </Button>
    </List>
  )
}
