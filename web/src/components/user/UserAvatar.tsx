import { UserStatusDot } from "@/components"
import { UserNameFragment } from "@/generated/graphql"
import { Avatar, IconButton, SvgIcon } from "@mui/material"
import { FC, SetStateAction } from "react"
import { TiUser } from "react-icons/ti"

interface Props {
  user: UserNameFragment
  setDropdownAnchor: (value: SetStateAction<Element | null>) => void
}

export const UserAvatar: FC<Props> = ({ user, setDropdownAnchor }) => {
  return (
    <UserStatusDot>
      <IconButton color="primary" sx={{ p: 0.5 }} onClick={(e) => setDropdownAnchor(e.currentTarget)}>
        <Avatar
          alt={user.username}
          // TODO: License CC BY 4.0 attribution: https://creativecommons.org/licenses/by/4.0/
          // identicon
          src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${user.displayname ?? user.username}&flip=true`}
          sx={{
            width: 36,
            height: 36,
            backgroundColor: "transparent",
            "& .MuiAvatar-img": {
              // pointerEvents: "none", // make avatar img unselectable
            },
          }}
        >
          <SvgIcon
            color="primary"
            component={TiUser}
            sx={{
              height: 36,
              width: 36,
              borderRadius: "50%",
              // border: `2px solid ${theme.palette.primary.main}a0`,
            }}
          />
        </Avatar>
      </IconButton>
    </UserStatusDot>
  )
}
