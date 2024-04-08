import { FilterSelect } from "@/components"
import { ChannelRewardDialog } from "@/components/twitch"
import { Box, Button, IconButton, SvgIcon, Tooltip } from "@mui/material"
import { ChangeEvent, FC, useState } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { TiPlus } from "react-icons/ti"

interface Props {
  onFilter?: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void | Promise<void>
}

export const ChannelRewardsToolbar: FC<Props> = ({ onFilter }) => {
  const [createRewardOpen, setCreateRewardOpen] = useState(false)

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <FilterSelect
        options={[
          { value: "all", label: "All rewards" },
          { value: "manageable", label: "Manageable rewards" },
        ]}
        onChange={(ev) => {
          onFilter?.(ev)
        }}
      />

      <Button
        variant="outlined"
        color="success"
        endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
        onClick={() => setCreateRewardOpen(true)}
      >
        New Reward
      </Button>

      <ChannelRewardDialog onClose={() => setCreateRewardOpen(false)} open={createRewardOpen} type="create" />

      <Tooltip placement="bottom-end" title="More options">
        <IconButton color="secondary" disabled>
          <HiDotsVertical />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
