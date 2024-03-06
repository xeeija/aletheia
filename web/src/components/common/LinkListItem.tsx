import { LinkItem } from "@/components"
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material"
import Link from "next/link"
import { forwardRef } from "react"

type ItemProps = LinkItem & {
  sx?: SxProps<Theme>
  textProps?: ListItemTextProps
}

// Display name is shown in debugger instead of underlying element name
// eslint-disable-next-line react/display-name
export const LinkListItem = forwardRef<HTMLAnchorElement, ItemProps>(
  ({ name = "", icon, divider, href, textProps, disabled, color, sx, ...props }, ref) => {
    const theme = useTheme()
    const themeColor = color ? theme.palette[color].main : undefined

    const linkItem = (
      <ListItem
        button
        ref={ref}
        component={href ? "a" : "button"}
        disabled={disabled}
        sx={{
          color: themeColor,
          "&:hover": { backgroundColor: color ? `${themeColor}14` : undefined },
          ...sx,
        }}
        {...props}
      >
        <ListItemIcon
          sx={{
            minWidth: 48,
            color: "inherit",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} {...textProps} />
      </ListItem>
    )

    const defaultDivider = <Divider variant="middle" sx={{ borderBottomWidth: 2, m: 1 }} />

    if (divider) {
      return divider === true ? defaultDivider : divider
    }

    return !href ? (
      linkItem
    ) : (
      <Link href={href} passHref legacyBehavior>
        {linkItem}
      </Link>
    )
  }
)
