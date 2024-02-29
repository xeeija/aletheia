import { Avatar, Badge, IconButton, SvgIcon, useTheme } from "@mui/material"
import { FC, SetStateAction } from "react"
import { TiUser } from "react-icons/ti"
import { UserNameFragment } from "../../generated/graphql"

interface Props {
  user: UserNameFragment
  setDropdownAnchor: (value: SetStateAction<Element | null>) => void
}

export const UserAvatar: FC<Props> = ({ user, setDropdownAnchor }) => {
  const theme = useTheme()

  return (
    <Badge
      overlap="circular"
      variant="dot"
      color="success"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        // ml: 1,
        "& .MuiBadge-badge": {
          p: 0.5,
          mb: 0.6,
          mr: 0.6,
          borderRadius: "50%",
          border: `2px solid ${theme.palette.background.default}`,
        },
      }}
    >
      <IconButton color="primary" sx={{ p: 0.5 }} onClick={(e) => setDropdownAnchor(e.currentTarget)}>
        <Avatar
          alt={user.username}
          // TODO: License CC BY 4.0 attribution: https://creativecommons.org/licenses/by/4.0/
          // identicon
          src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${user.displayname ?? user.username}&flip=true`}
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
    </Badge>
  )
}
