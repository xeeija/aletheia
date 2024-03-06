import { LinkListItem } from "@/components"
import { ThemeColor } from "@/types"
import { List, ListProps } from "@mui/material"
import { FC, MouseEventHandler, ReactNode } from "react"

export interface LinkItem {
  name?: string
  icon?: ReactNode
  divider?: ReactNode
  onClick?: MouseEventHandler
  href?: string
  disabled?: boolean
  color?: ThemeColor
}

type LinkListProps = Omit<ListProps, "children"> & {
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
