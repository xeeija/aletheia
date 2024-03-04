import { ThemeColor } from "@/types"
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  ListProps,
  Theme,
  useTheme,
} from "@mui/material"
import { SxProps } from "@mui/system"
import Link from "next/link"
import { FC, MouseEventHandler, ReactNode, forwardRef } from "react"

export interface LinkItem {
  name?: string
  icon?: JSX.Element
  divider?: boolean | JSX.Element
  onClick?: MouseEventHandler
  href?: string
  disabled?: boolean
  color?: ThemeColor
}

type LinkListProps = ListProps & {
  items: LinkItem[]
  children?: ((item: LinkItem, index: number) => ReactNode) | ReactNode
}

export const LinkList: FC<LinkListProps> = ({ children, items, ...listProps }) => {
  const childrenFn = typeof children === "function" || typeof children === "undefined"

  return (
    <List {...listProps}>
      <>
        {items.map((item, index) => {
          // When all of them are met, you may safely use the index as a key.
          // 1. the list and items are static
          // 2. the items in the list have no ids
          // 3. the list is never reordered or filtered

          return (
            <li key={item.name || index}>
              {(childrenFn ? children?.(item, index) : null) ?? <LinkListItem {...item} />}
            </li>
          )
        })}
        {!childrenFn && children}
      </>
    </List>
  )
}

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
