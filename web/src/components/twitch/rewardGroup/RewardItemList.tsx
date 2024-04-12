import { RewardGroupValues, RewardItemListItem } from "@/components/twitch"
import { CustomRewardFragment, RewardGroupItemInput } from "@/generated/graphql"
import { Button, FormHelperText, List, SvgIcon } from "@mui/material"
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
  const { values, setFieldError, setFieldValue, errors, getFieldMeta, dirty } = useFormikContext<RewardGroupValues>()

  const showNoItemsError = getFieldMeta("items").touched && typeof errors.items === "string"
  const showOneItemHint = values.items.length === 1 && dirty

  return (
    <List role="list">
      {values.items.map((item, index) => (
        <RewardItemListItem
          key={`${index}.${item.rewardId}`}
          channelRewards={channelRewards}
          index={index}
          hideDelete={values.items.length <= 1}
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
        variant={showNoItemsError ? "contained" : "outlined"}
        sx={{ mt: 1.25 }}
        endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
        onClick={() => {
          setFieldError("items", undefined)
          setFieldValue("items", [...values.items, defaultItem])
        }}
      >
        New
      </Button>

      {/* typeof check required for string type for compiler */}
      {showNoItemsError && typeof errors.items === "string" && <FormHelperText error>{errors.items}</FormHelperText>}

      {/* <SvgIcon component={HiInformationCircle} color="success" viewBox="-2 -8 26 26" /> */}
      {showOneItemHint && (
        <FormHelperText sx={{ fontSize: "0.875em", mt: 1 }}>
          A reward group with 1 item doesn&apos;t do anything, because there are no other rewards that are disabled
          while the cooldown is running.
        </FormHelperText>
      )}
    </List>
  )
}
