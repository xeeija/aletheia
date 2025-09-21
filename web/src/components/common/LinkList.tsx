import { LinkItem, LinkListItem } from "@/components"
import { List, ListProps } from "@mui/material"
import { FC, ReactNode } from "react"

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
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            <li key={item.name?.toString() || index}>
              {(childrenFn ? children?.(item, index) : null) ?? <LinkListItem {...item} />}
            </li>
          )
        })}
        {!childrenFn && children}
      </>
    </List>
  )
}
