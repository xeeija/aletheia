import { Dropdown } from "@/components/common"
import { LinkInputField } from "@/components/input"
import { CustomRewardFragment } from "@/generated/graphql"
import { Paper, Typography } from "@mui/material"
import { Dispatch, FC, SetStateAction } from "react"

interface Props {
  reward: CustomRewardFragment
  anchor: Element | null
  setAnchor: Dispatch<SetStateAction<Element | null>>
}

export const RewardLinksDropdown: FC<Props> = ({ anchor, setAnchor }) => {
  const enableBaseUrl = "/api/twitch/reward/enable"
  const pauseBaseUrl = "/api/twitch/reward/pause"

  return (
    <Dropdown anchor={anchor} setAnchor={setAnchor}>
      <Paper sx={{ p: 1.5, width: "24rem", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>Do not show these links to anyone!</Typography>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Enable/Disable reward</Typography>

          <LinkInputField value={`${window.location.host}${enableBaseUrl}/`} />
        </div>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Pause reward</Typography>

          <LinkInputField value={`${window.location.host}${pauseBaseUrl}/`} />
        </div>
      </Paper>
    </Dropdown>
  )
}
