import React from "react"
import { List, ListProps, Divider, ListItem, ListItemIcon, ListItemText, Theme } from "@mui/material"
import Link from "next/link"
import { SxProps } from "@mui/system"

export interface LinkItem {
  name?: string
  icon?: JSX.Element
  divider?: boolean | JSX.Element
  onClick?: React.MouseEventHandler
  href?: string
}

type LinkListProps = ListProps & {
  items: LinkItem[]
  children: (item: LinkItem, index: number) => React.ReactNode
}

export const LinkList: React.FC<LinkListProps> = ({ children, items, ...listProps }) => {
  return (
    <List {...listProps}>
      {items.map((item, index) => {

        // When all of them are met, you may safely use the index as a key.
        // 1. the list and items are static
        // 2. the items in the list have no ids
        // 3. the list is never reordered or filtered

        return <li key={item.name || index}>
          {children(item, index)}
        </li>
      })}
    </List >
  )
}

type ItemProps = LinkItem & {
  sx?: SxProps<Theme>
}

// Display name is shown in debugger instead of underlying element name
// eslint-disable-next-line react/display-name
export const LinkListItem = React.forwardRef<HTMLAnchorElement, ItemProps>(({ name = "", icon, divider, onClick, href, ...props }, ref) => {
  return (
    divider ?
      divider === true ?
        <Divider variant="middle" sx={{ borderBottomWidth: 2 }} /> :
        divider :
      <Link href={href ?? ""} passHref={href !== undefined}>
        <ListItem ref={ref} button component="a" onClick={onClick} {...props}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </Link>
  )
})
