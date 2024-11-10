import { ThemeColor } from "@/types"
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import Link from "next/link"
import { forwardRef, MouseEventHandler, ReactNode } from "react"

export interface LinkItem {
  name?: ReactNode
  subtitle?: ReactNode
  icon?: ReactNode
  divider?: ReactNode
  onClick?: MouseEventHandler
  href?: string
  disabled?: boolean
  color?: ThemeColor
}

type ItemProps = LinkItem & {
  sx?: SxProps<Theme>
  textProps?: ListItemTextProps
}

// Display name is shown in debugger instead of underlying element name
// eslint-disable-next-line react/display-name
export const LinkListItem = forwardRef<HTMLAnchorElement, ItemProps>(
  ({ name = "", subtitle, icon, divider, href, textProps, disabled, color, sx, ...props }, ref) => {
    const theme = useTheme()
    const themeColor = color ? theme.palette[color].main : undefined

    const subtitleText = (
      <Typography
        component="span"
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 0.75,
        }}
      >
        <Typography component="span" {...textProps?.primaryTypographyProps}>
          {name}
        </Typography>
        <Typography component="span" color="text.secondary">
          {subtitle}
        </Typography>
      </Typography>
    )

    const linkItem = (
      <ListItemButton
        ref={ref}
        component={href ? "a" : "button"}
        disabled={disabled}
        sx={{
          color: themeColor,
          width: "100%",
          "&:hover": {
            backgroundColor: color ? `${themeColor}14` : undefined,
          },
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
        <ListItemText primary={subtitle ? subtitleText : name} {...textProps} />
      </ListItemButton>
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
